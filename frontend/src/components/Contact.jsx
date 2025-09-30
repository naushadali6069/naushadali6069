import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { contactInfo } from '../mock';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    project: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      organization: '',
      project: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className={`contact-header fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="heading-1" style={{ marginBottom: 'var(--spacing-medium)', textAlign: 'center' }}>
            Let's Create Something <span style={{ color: 'var(--brand-accent)' }}>Extraordinary</span>
          </h2>
          <p className="body-large" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto var(--spacing-giant)' }}>
            Ready to transform your vision into reality? Get in touch with us to discuss your eco-tourism project.
          </p>
        </div>
        
        <div className="contact-content">
          <div className={`contact-info fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            <div className="forest-card">
              <h3 className="heading-3" style={{ marginBottom: 'var(--spacing-large)' }}>
                Get In Touch
              </h3>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={24} color="var(--brand-primary)" />
                </div>
                <div>
                  <h4 className="body-medium" style={{ fontWeight: '600', marginBottom: 'var(--spacing-xs)' }}>
                    Email
                  </h4>
                  <a href={`mailto:${contactInfo.email}`} className="body-medium" style={{ color: 'var(--brand-primary)' }}>
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={24} color="var(--brand-primary)" />
                </div>
                <div>
                  <h4 className="body-medium" style={{ fontWeight: '600', marginBottom: 'var(--spacing-xs)' }}>
                    Phone
                  </h4>
                  {contactInfo.phones.map((phone, index) => (
                    <div key={index}>
                      <a href={`tel:${phone}`} className="body-medium" style={{ color: 'var(--brand-primary)' }}>
                        {phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={24} color="var(--brand-primary)" />
                </div>
                <div>
                  <h4 className="body-medium" style={{ fontWeight: '600', marginBottom: 'var(--spacing-xs)' }}>
                    Location
                  </h4>
                  <p className="body-medium" style={{ color: 'var(--text-light)' }}>
                    Serving projects across India
                  </p>
                </div>
              </div>
              
              <div className="tagline" style={{ marginTop: 'var(--spacing-large)', padding: 'var(--spacing-medium)', background: 'var(--bg-section)', borderRadius: '16px' }}>
                <p className="body-medium" style={{ fontStyle: 'italic', textAlign: 'center', color: 'var(--brand-primary)', fontWeight: '600' }}>
                  "{contactInfo.tagline}"
                </p>
              </div>
            </div>
          </div>
          
          <div className={`contact-form fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            <form onSubmit={handleSubmit} className="forest-card">
              <h3 className="heading-3" style={{ marginBottom: 'var(--spacing-large)' }}>
                Start Your Project
              </h3>
              
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Your full name"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Organization</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Your organization/department"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Project Type</label>
                <select
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select project type</option>
                  <option value="nature-center">Nature Interpretation Centre</option>
                  <option value="selfie-points">Selfie Points & Photo Zones</option>
                  <option value="eco-infrastructure">Eco-Tourism Infrastructure</option>
                  <option value="gates-sculptures">Gates & Sculptures</option>
                  <option value="landscaping">Landscaping & Parks</option>
                  <option value="murals">Murals & Artistic Installations</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="form-textarea"
                  placeholder="Tell us about your project vision, location, timeline, and any specific requirements..."
                  rows="4"
                />
              </div>
              
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                Send Message <ArrowRight size={20} style={{ marginLeft: '8px' }} />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-giant);
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .contact-item {
          display: flex;
          gap: var(--spacing-medium);
          margin-bottom: var(--spacing-large);
        }
        
        .contact-icon {
          flex-shrink: 0;
          padding: var(--spacing-small);
          background: var(--bg-subtle);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .form-group {
          margin-bottom: var(--spacing-medium);
        }
        
        .form-label {
          display: block;
          font-weight: 600;
          margin-bottom: var(--spacing-xs);
          color: var(--text-primary);
        }
        
        .form-input,
        .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid var(--border-light);
          border-radius: 16px;
          font-size: 16px;
          transition: all 0.2s ease;
          background: white;
        }
        
        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 3px rgba(45, 90, 45, 0.1);
        }
        
        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        @media (max-width: 1024px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-large);
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;