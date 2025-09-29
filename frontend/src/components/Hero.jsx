import React, { useEffect, useState } from 'react';
import { ArrowRight, Trees, Award, Users } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
              <h1 className="display-large">
                Where Nature Meets <span style={{ color: 'var(--brand-accent)' }}>Innovation</span>
              </h1>
            </div>
            
            <div className={`fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
              <p className="body-large" style={{ marginBottom: 'var(--spacing-large)', maxWidth: '600px' }}>
                Forest Vision Alliance is a collaborative group of companies specializing in eco-tourism development, 
                sustainability, and creative design across India. We create unforgettable experiences that blend 
                nature with artistic excellence.
              </p>
            </div>
            
            <div className={`fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
              <div className="hero-buttons">
                <a href="#portfolio" className="btn-primary">
                  Explore Our Work <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                </a>
                <a href="#contact" className="btn-secondary">
                  Partner With Us
                </a>
              </div>
            </div>
          </div>
          
          <div className="hero-stats">
            <div className={`fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-icon">
                    <Trees size={32} color="var(--brand-primary)" />
                  </div>
                  <div className="stat-number heading-2">50+</div>
                  <div className="stat-label body-medium">Projects Completed</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon">
                    <Award size={32} color="var(--brand-primary)" />
                  </div>
                  <div className="stat-number heading-2">15+</div>
                  <div className="stat-label body-medium">Forest Divisions</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-icon">
                    <Users size={32} color="var(--brand-primary)" />
                  </div>
                  <div className="stat-number heading-2">4</div>
                  <div className="stat-label body-medium">Partner Companies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-giant);
          align-items: center;
          min-height: 70vh;
        }
        
        .hero-text {
          padding-right: var(--spacing-large);
        }
        
        .hero-buttons {
          display: flex;
          gap: var(--spacing-medium);
          margin-top: var(--spacing-large);
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--spacing-large);
          background: var(--bg-card);
          padding: var(--spacing-large);
          border-radius: 32px;
          box-shadow: 0 4px 16px rgba(27, 67, 50, 0.15);
        }
        
        .stat-item {
          text-align: center;
          padding: var(--spacing-medium);
        }
        
        .stat-icon {
          margin-bottom: var(--spacing-small);
          display: flex;
          justify-content: center;
        }
        
        .stat-number {
          margin-bottom: var(--spacing-xs);
          color: var(--brand-primary);
        }
        
        .stat-label {
          color: var(--text-light);
        }
        
        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-large);
            text-align: center;
          }
          
          .hero-text {
            padding-right: 0;
          }
          
          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: var(--spacing-medium);
          }
        }
        
        @media (max-width: 781px) {
          .hero-buttons {
            flex-direction: column;
            align-items: stretch;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-medium);
          }
          
          .stat-item {
            padding: var(--spacing-small);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;