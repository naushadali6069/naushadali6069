#!/usr/bin/env python3
"""
Backend API Testing for Contact Form Integration
Tests the FastAPI contact form endpoints with MongoDB integration
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("ERROR: Could not get REACT_APP_BACKEND_URL from frontend/.env")
    sys.exit(1)

API_URL = f"{BASE_URL}/api"
print(f"Testing backend API at: {API_URL}")

class ContactFormTester:
    def __init__(self):
        self.test_results = []
        self.failed_tests = []
        
    def log_result(self, test_name, success, message="", response_data=None):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        result = {
            'test': test_name,
            'status': status,
            'message': message,
            'response_data': response_data
        }
        self.test_results.append(result)
        if not success:
            self.failed_tests.append(result)
        print(f"{status}: {test_name}")
        if message:
            print(f"    {message}")
        if response_data and not success:
            print(f"    Response: {response_data}")
        print()

    def test_api_health(self):
        """Test basic API connectivity"""
        try:
            response = requests.get(f"{API_URL}/", timeout=10)
            if response.status_code == 200:
                self.log_result("API Health Check", True, "API is accessible")
                return True
            else:
                self.log_result("API Health Check", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("API Health Check", False, f"Connection error: {str(e)}")
            return False

    def test_post_contact_valid_data(self):
        """Test POST /api/contact with valid data - includes email notification testing"""
        test_data = {
            "name": "Test Client",
            "email": "testclient@example.com",
            "organization": "Forest Department Test",
            "project": "nature-center",
            "message": "This is a test message to verify the email notification system is working properly for Forest Vision Alliance contact form."
        }
        
        try:
            response = requests.post(f"{API_URL}/contact", json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                # Verify response structure
                required_fields = ['id', 'name', 'email', 'message', 'timestamp', 'status']
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_result("POST /api/contact - Valid Data", False, 
                                  f"Missing fields in response: {missing_fields}", data)
                else:
                    # Verify data integrity
                    if (data['name'] == test_data['name'] and 
                        data['email'] == test_data['email'] and
                        data['message'] == test_data['message']):
                        self.log_result("POST /api/contact - Valid Data", True, 
                                      f"Contact submission created with ID: {data['id']} - Email notification should be sent")
                        return data['id']
                    else:
                        self.log_result("POST /api/contact - Valid Data", False, 
                                      "Response data doesn't match input", data)
            else:
                self.log_result("POST /api/contact - Valid Data", False, 
                              f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("POST /api/contact - Valid Data", False, f"Request error: {str(e)}")
        
        return None

    def test_post_contact_minimal_data(self):
        """Test POST /api/contact with minimal required data"""
        test_data = {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "message": "Simple inquiry about your services."
        }
        
        try:
            response = requests.post(f"{API_URL}/contact", json=test_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data['name'] == test_data['name'] and data['email'] == test_data['email']:
                    self.log_result("POST /api/contact - Minimal Data", True, 
                                  "Minimal contact submission successful")
                else:
                    self.log_result("POST /api/contact - Minimal Data", False, 
                                  "Response data mismatch", data)
            else:
                self.log_result("POST /api/contact - Minimal Data", False, 
                              f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("POST /api/contact - Minimal Data", False, f"Request error: {str(e)}")

    def test_post_contact_missing_name(self):
        """Test POST /api/contact with missing name field"""
        test_data = {
            "email": "test@example.com",
            "message": "Test message without name"
        }
        
        try:
            response = requests.post(f"{API_URL}/contact", json=test_data, timeout=10)
            
            if response.status_code == 422:  # Validation error expected
                self.log_result("POST /api/contact - Missing Name", True, 
                              "Correctly rejected missing name field")
            else:
                self.log_result("POST /api/contact - Missing Name", False, 
                              f"Expected 422, got {response.status_code}", response.text)
        except Exception as e:
            self.log_result("POST /api/contact - Missing Name", False, f"Request error: {str(e)}")

    def test_post_contact_missing_email(self):
        """Test POST /api/contact with missing email field"""
        test_data = {
            "name": "Test User",
            "message": "Test message without email"
        }
        
        try:
            response = requests.post(f"{API_URL}/contact", json=test_data, timeout=10)
            
            if response.status_code == 422:  # Validation error expected
                self.log_result("POST /api/contact - Missing Email", True, 
                              "Correctly rejected missing email field")
            else:
                self.log_result("POST /api/contact - Missing Email", False, 
                              f"Expected 422, got {response.status_code}", response.text)
        except Exception as e:
            self.log_result("POST /api/contact - Missing Email", False, f"Request error: {str(e)}")

    def test_post_contact_missing_message(self):
        """Test POST /api/contact with missing message field"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com"
        }
        
        try:
            response = requests.post(f"{API_URL}/contact", json=test_data, timeout=10)
            
            if response.status_code == 422:  # Validation error expected
                self.log_result("POST /api/contact - Missing Message", True, 
                              "Correctly rejected missing message field")
            else:
                self.log_result("POST /api/contact - Missing Message", False, 
                              f"Expected 422, got {response.status_code}", response.text)
        except Exception as e:
            self.log_result("POST /api/contact - Missing Message", False, f"Request error: {str(e)}")

    def test_post_contact_invalid_email(self):
        """Test POST /api/contact with invalid email format"""
        test_data = {
            "name": "Test User",
            "email": "invalid-email-format",
            "message": "Test message with invalid email"
        }
        
        try:
            response = requests.post(f"{API_URL}/contact", json=test_data, timeout=10)
            
            # Note: FastAPI with Pydantic doesn't validate email format by default
            # This test checks if email validation is implemented
            if response.status_code == 422:
                self.log_result("POST /api/contact - Invalid Email", True, 
                              "Email validation working correctly")
            elif response.status_code == 200:
                self.log_result("POST /api/contact - Invalid Email", False, 
                              "Email validation not implemented - accepts invalid emails")
            else:
                self.log_result("POST /api/contact - Invalid Email", False, 
                              f"Unexpected status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("POST /api/contact - Invalid Email", False, f"Request error: {str(e)}")

    def test_get_contact_submissions(self):
        """Test GET /api/contact to retrieve submissions"""
        try:
            response = requests.get(f"{API_URL}/contact", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_result("GET /api/contact", True, 
                                  f"Retrieved {len(data)} contact submissions")
                    
                    # Verify structure of submissions if any exist
                    if data:
                        first_submission = data[0]
                        required_fields = ['id', 'name', 'email', 'message', 'timestamp']
                        missing_fields = [field for field in required_fields if field not in first_submission]
                        
                        if missing_fields:
                            self.log_result("GET /api/contact - Data Structure", False, 
                                          f"Missing fields in submission: {missing_fields}")
                        else:
                            self.log_result("GET /api/contact - Data Structure", True, 
                                          "Submission structure is correct")
                else:
                    self.log_result("GET /api/contact", False, 
                                  "Response is not a list", data)
            else:
                self.log_result("GET /api/contact", False, 
                              f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("GET /api/contact", False, f"Request error: {str(e)}")

    def test_empty_post_data(self):
        """Test POST /api/contact with empty data"""
        try:
            response = requests.post(f"{API_URL}/contact", json={}, timeout=10)
            
            if response.status_code == 422:
                self.log_result("POST /api/contact - Empty Data", True, 
                              "Correctly rejected empty data")
            else:
                self.log_result("POST /api/contact - Empty Data", False, 
                              f"Expected 422, got {response.status_code}", response.text)
        except Exception as e:
            self.log_result("POST /api/contact - Empty Data", False, f"Request error: {str(e)}")

    def test_email_notification_comprehensive(self):
        """Test comprehensive email notification with all fields"""
        test_data = {
            "name": "Forest Vision Test User",
            "email": "testemail@forestdept.gov.in",
            "organization": "Ministry of Environment and Forests",
            "project": "wildlife-sanctuary",
            "message": "We need assistance with creating an interactive nature center for our new wildlife sanctuary. This project will serve educational purposes for visitors and local communities. Please provide details about your services and timeline for implementation."
        }
        
        try:
            response = requests.post(f"{API_URL}/contact", json=test_data, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                # Verify all fields are present in response
                expected_fields = ['id', 'name', 'email', 'organization', 'project', 'message', 'timestamp', 'status']
                missing_fields = [field for field in expected_fields if field not in data]
                
                if missing_fields:
                    self.log_result("Email Notification - Comprehensive Test", False, 
                                  f"Missing fields in response: {missing_fields}", data)
                else:
                    # Verify all data matches
                    data_matches = all([
                        data['name'] == test_data['name'],
                        data['email'] == test_data['email'],
                        data['organization'] == test_data['organization'],
                        data['project'] == test_data['project'],
                        data['message'] == test_data['message']
                    ])
                    
                    if data_matches:
                        self.log_result("Email Notification - Comprehensive Test", True, 
                                      f"Complete contact form with all fields submitted successfully. ID: {data['id']}. Email notification with all details should be sent to forestvisionalliance@gmail.com")
                    else:
                        self.log_result("Email Notification - Comprehensive Test", False, 
                                      "Response data doesn't match input data", data)
            else:
                self.log_result("Email Notification - Comprehensive Test", False, 
                              f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Email Notification - Comprehensive Test", False, f"Request error: {str(e)}")

    def check_backend_logs_for_email(self):
        """Check backend logs for email-related messages"""
        import subprocess
        try:
            # Check supervisor backend logs for email-related entries
            result = subprocess.run(['tail', '-n', '50', '/var/log/supervisor/backend.out.log'], 
                                  capture_output=True, text=True, timeout=10)
            
            if result.returncode == 0:
                log_content = result.stdout
                email_indicators = [
                    'Email notification sent successfully',
                    'Failed to send email notification',
                    'Email configuration missing',
                    'SMTP',
                    'gmail'
                ]
                
                found_indicators = []
                for indicator in email_indicators:
                    if indicator.lower() in log_content.lower():
                        found_indicators.append(indicator)
                
                if found_indicators:
                    self.log_result("Backend Logs - Email Activity", True, 
                                  f"Found email-related log entries: {', '.join(found_indicators)}")
                else:
                    self.log_result("Backend Logs - Email Activity", False, 
                                  "No email-related log entries found in recent logs")
                
                # Print recent logs for debugging
                print("Recent backend logs (last 20 lines):")
                print("-" * 40)
                recent_logs = log_content.split('\n')[-20:]
                for log_line in recent_logs:
                    if log_line.strip():
                        print(f"  {log_line}")
                print()
                
            else:
                self.log_result("Backend Logs - Email Activity", False, 
                              f"Could not read backend logs: {result.stderr}")
        except Exception as e:
            self.log_result("Backend Logs - Email Activity", False, f"Error checking logs: {str(e)}")

    def run_all_tests(self):
        """Run all contact form tests"""
        print("=" * 60)
        print("CONTACT FORM BACKEND API TESTING")
        print("=" * 60)
        print()
        
        # Test API connectivity first
        if not self.test_api_health():
            print("❌ API is not accessible. Stopping tests.")
            return False
        
        # Run all contact form tests
        print("Testing Contact Form Endpoints...")
        print("-" * 40)
        
        self.test_post_contact_valid_data()
        self.test_post_contact_minimal_data()
        self.test_get_contact_submissions()
        
        print("Testing Email Notification System...")
        print("-" * 40)
        
        self.test_email_notification_comprehensive()
        self.check_backend_logs_for_email()
        
        print("Testing Validation and Error Handling...")
        print("-" * 40)
        
        self.test_post_contact_missing_name()
        self.test_post_contact_missing_email()
        self.test_post_contact_missing_message()
        self.test_post_contact_invalid_email()
        self.test_empty_post_data()
        
        # Summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = total_tests - len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {len(self.failed_tests)}")
        print()
        
        if self.failed_tests:
            print("FAILED TESTS:")
            print("-" * 20)
            for test in self.failed_tests:
                print(f"❌ {test['test']}: {test['message']}")
            print()
            return False
        else:
            print("🎉 All tests passed!")
            return True

if __name__ == "__main__":
    tester = ContactFormTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)