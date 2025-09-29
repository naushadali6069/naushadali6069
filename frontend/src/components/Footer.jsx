import React from 'react';
import { Mail, Phone, Heart } from 'lucide-react';
import { contactInfo, companies } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--brand-primary)', color: 'var(--text-white)' }}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3 className="heading-2" style={{ marginBottom: 'var(--spacing-medium)', color: 'var(--text-white)' }}>
                Forest Vision Alliance
              </h3>
              <p className="body-medium" style={{ marginBottom: 'var(--spacing-medium)', color: 'rgba(255, 255, 255, 0.9)' }}>
                Where Nature Meets Innovation
              </p>
              <p className="body-medium" style={{ marginBottom: 'var(--spacing-large)', color: 'rgba(255, 255, 255, 0.8)' }}>
                Creating extraordinary eco-tourism experiences across India through sustainable design, 
                artistic excellence, and conservation awareness.
              </p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4 className="heading-3" style={{ marginBottom: 'var(--spacing-medium)', color: 'var(--text-white)' }}>
                  Quick Links
                </h4>
                <ul className="footer-list">
                  <li><a href="#about" className="footer-link">About Us</a></li>
                  <li><a href="#services" className="footer-link">Services</a></li>
                  <li><a href="#portfolio" className="footer-link">Portfolio</a></li>
                  <li><a href="#sustainability" className="footer-link">Sustainability</a></li>
                  <li><a href="#companies" className="footer-link">Our Companies</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4 className="heading-3" style={{ marginBottom: 'var(--spacing-medium)', color: 'var(--text-white)' }}>
                  Services
                </h4>
                <ul className="footer-list">
                  <li><a href="#services" className="footer-link">Nature Interpretation Centres</a></li>
                  <li><a href="#services" className="footer-link">Selfie Points & Photo Zones</a></li>
                  <li><a href="#services" className="footer-link">Eco-Tourism Infrastructure</a></li>
                  <li><a href="#services" className="footer-link">Gates & Sculptures</a></li>
                  <li><a href="#services" className="footer-link">Artistic Installations</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4 className="heading-3" style={{ marginBottom: 'var(--spacing-medium)', color: 'var(--text-white)' }}>
                  Contact Info
                </h4>
                <div className="contact-item">
                  <Mail size={18} />
                  <a href={`mailto:${contactInfo.email}`} className="footer-link">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <div>
                    {contactInfo.phones.map((phone, index) => (
                      <div key={index}>
                        <a href={`tel:${phone}`} className="footer-link">
                          {phone}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-companies">
            <h4 className="heading-3" style={{ marginBottom: 'var(--spacing-medium)', color: 'var(--text-white)', textAlign: 'center' }}>
              Our Partner Companies
            </h4>
            <div className="companies-grid">
              {companies.map((company) => (
                <div key={company.id} className="company-item">
                  <h5 className="body-medium" style={{ fontWeight: '600', marginBottom: 'var(--spacing-xs)', color: 'var(--text-white)' }}>
                    {company.name}
                  </h5>
                  <p className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {company.specialization}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                © {currentYear} Forest Vision Alliance. All rights reserved.
              </p>
              <p className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                Made with <Heart size={16} color="#ff6b6b" /> for nature conservation
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .footer-content {
          padding: var(--spacing-giant) 0 var(--spacing-large);
        }
        
        .footer-main {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--spacing-giant);
          margin-bottom: var(--spacing-giant);
        }
        
        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-large);
        }
        
        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-list li {
          margin-bottom: var(--spacing-small);
        }
        
        .footer-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .footer-link:hover {
          color: var(--text-white);
        }
        
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-small);
          margin-bottom: var(--spacing-small);
        }
        
        .footer-companies {
          margin-bottom: var(--spacing-giant);
          padding: var(--spacing-large);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 24px;
        }
        
        .companies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-large);
        }
        
        .company-item {
          text-align: center;
          padding: var(--spacing-medium);
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
        }
        
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: var(--spacing-large);
        }
        
        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        @media (max-width: 1024px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: var(--spacing-large);
          }
          
          .footer-links {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .companies-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 781px) {
          .footer-links {
            grid-template-columns: 1fr;
            gap: var(--spacing-medium);
          }
          
          .companies-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-medium);
          }
          
          .footer-bottom-content {
            flex-direction: column;
            gap: var(--spacing-small);
            text-align: center;
          }
          
          .footer-companies {
            padding: var(--spacing-medium);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;