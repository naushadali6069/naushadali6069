from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging first
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Email sending function
async def send_email_notification(contact_data):
    """Send email notification when contact form is submitted"""
    try:
        # Get email configuration from environment
        smtp_server = os.environ.get('GMAIL_SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('GMAIL_SMTP_PORT', 587))
        gmail_user = os.environ.get('GMAIL_USER')
        gmail_password = os.environ.get('GMAIL_APP_PASSWORD')
        notification_email = os.environ.get('NOTIFICATION_EMAIL')
        
        if not all([gmail_user, gmail_password, notification_email]):
            logger.error("Email configuration missing in environment variables")
            return False
        
        # Create email message
        message = MIMEMultipart()
        message["From"] = gmail_user
        message["To"] = notification_email
        message["Subject"] = "New Contact Form Submission - Forest Vision Alliance"
        
        # Email body with professional formatting
        body = f"""
New contact form submission received on Forest Vision Alliance website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: {contact_data.name}
📧 Email: {contact_data.email}
🏢 Organization: {contact_data.organization or 'Not specified'}
🎯 Project Type: {contact_data.project or 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{contact_data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ SUBMISSION DETAILS  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🕐 Submitted: {contact_data.timestamp.strftime('%B %d, %Y at %I:%M %p')}
🆔 Submission ID: {contact_data.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is an automated notification from your Forest Vision Alliance website.
Please respond to the client directly at: {contact_data.email}
        """
        
        message.attach(MIMEText(body, "plain"))
        
        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()  # Enable encryption
            server.login(gmail_user, gmail_password)
            server.send_message(message)
        
        logger.info(f"Email notification sent successfully for contact from {contact_data.email}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")
        return False

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    organization: str = ""
    project: str = ""
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # new, read, replied

class ContactSubmissionCreate(BaseModel):
    name: str
    email: str
    organization: str = ""
    project: str = ""
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact_form(input: ContactSubmissionCreate):
    """Submit a new contact form"""
    try:
        contact_dict = input.dict()
        contact_obj = ContactSubmission(**contact_dict)
        
        # Prepare data for MongoDB (convert datetime to ISO string)
        contact_data = contact_obj.dict()
        contact_data['timestamp'] = contact_data['timestamp'].isoformat()
        
        # Insert into database
        await db.contact_submissions.insert_one(contact_data)
        
        # Send email notification
        email_sent = await send_email_notification(contact_obj)
        if email_sent:
            logger.info(f"Email notification sent for contact from {contact_obj.name} <{contact_obj.email}>")
        else:
            logger.warning(f"Failed to send email notification for contact from {contact_obj.name} <{contact_obj.email}>")
        
        logger.info(f"New contact submission from {contact_obj.name} <{contact_obj.email}>")
        return contact_obj
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Get all contact form submissions"""
    try:
        submissions = await db.contact_submissions.find().sort("timestamp", -1).to_list(1000)
        
        # Parse timestamp from ISO string back to datetime
        for submission in submissions:
            if isinstance(submission.get('timestamp'), str):
                submission['timestamp'] = datetime.fromisoformat(submission['timestamp'])
        
        return [ContactSubmission(**submission) for submission in submissions]
    except Exception as e:
        logger.error(f"Error retrieving contact submissions: {str(e)}")
        raise

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
