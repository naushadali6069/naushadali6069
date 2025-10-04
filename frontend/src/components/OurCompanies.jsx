import React, { useEffect, useState } from 'react';
import { Building2, Users, Wrench, Palette } from 'lucide-react';
import { companies } from '../mock';

const OurCompanies = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('companies');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const getIcon = (index) => {
    const icons = [Building2, Users, Palette, Wrench];
    const IconComponent = icons[index % icons.length];
    return <IconComponent size={40} color="var(--brand-primary)" />;
  };

  return (
    <section id="companies" className="section-padding" style={{ background: 'var(--bg-section)' }}>
      <div className="container">
        <div className={`companies-header fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="heading-1" style={{ marginBottom: 'var(--spacing-medium)', textAlign: 'center' }}>
            Our <span style={{ color: 'var(--brand-accent)' }}>Partner Companies</span>
          </h2>
          <p className="body-large" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--spacing-giant)' }}>
            Forest Vision Alliance brings together four specialized companies, each contributing unique expertise 
            to create comprehensive eco-tourism solutions across India.
          </p>
        </div>
        
        <div className="companies-grid">
          {companies.map((company, index) => (
            <div 
              key={company.id} 
              className={`forest-card hover-lift fade-in ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="company-header">
                <div className="company-icon" style={{ marginBottom: 'var(--spacing-medium)' }}>
                  {getIcon(index)}
                </div>
                <h3 className="heading-3" style={{ marginBottom: 'var(--spacing-xs)' }}>
                  {company.name}
                </h3>
                <p className="body-medium" style={{ 
                  color: 'var(--brand-primary)', 
                  fontWeight: '600', 
                  marginBottom: 'var(--spacing-medium)' 
                }}>
                  {company.specialization}
                </p>
              </div>
              
              <p className="body-medium" style={{ marginBottom: 'var(--spacing-large)', color: 'var(--text-light)' }}>
                {company.description}
              </p>
              
              <div className="expertise-section">
                <h4 className="body-medium" style={{ fontWeight: '600', marginBottom: 'var(--spacing-small)' }}>
                  Core Expertise:
                </h4>
                <div className="expertise-tags">
                  {company.expertise.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="expertise-tag body-small"
                      style={{
                        background: 'var(--bg-subtle)',
                        color: 'var(--brand-primary)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        fontWeight: '500',
                        display: 'inline-block',
                        margin: '4px'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`collaboration-message fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '800ms' }}>
          <div className="forest-card" style={{ textAlign: 'center', background: 'var(--bg-card)' }}>
            <h3 className="heading-2" style={{ marginBottom: 'var(--spacing-medium)' }}>
              Strength Through Collaboration
            </h3>
            <p className="body-large" style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
              By combining the unique strengths of our partner companies, we deliver comprehensive solutions 
              that exceed expectations and create lasting impact in eco-tourism development.
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .companies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--spacing-large);
          margin-bottom: var(--spacing-giant);
        }
        
        .company-header {
          text-align: center;
          margin-bottom: var(--spacing-medium);
        }
        
        .company-icon {
          display: flex;
          justify-content: center;
          padding: var(--spacing-medium);
          background: var(--bg-subtle);
          border-radius: 50%;
          width: 80px;
          height: 80px;
          margin: 0 auto;
          align-items: center;
        }
        
        .expertise-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
          justify-content: center;
        }
        
        .collaboration-message {
          margin-top: var(--spacing-giant);
        }
        
        @media (max-width: 781px) {
          .companies-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-medium);
          }
          
          .expertise-tags {
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  );
};

export default OurCompanies;