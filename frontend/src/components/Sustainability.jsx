import React, { useEffect, useState } from 'react';
import { Leaf, Users, Target, Zap } from 'lucide-react';
import { sustainabilityFeatures } from '../mock';

const iconMap = {
  Leaf: Leaf,
  Users: Users,
  Target: Target,
  Zap: Zap
};

const Sustainability = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('sustainability');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const getIcon = (index) => {
    const icons = [Leaf, Users, Target, Zap];
    const IconComponent = icons[index % icons.length];
    return <IconComponent size={32} color="var(--brand-primary)" />;
  };

  return (
    <section id="sustainability" className="section-padding" style={{ background: 'var(--bg-page)' }}>
      <div className="container">
        <div className={`sustainability-header fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="heading-1" style={{ marginBottom: 'var(--spacing-medium)', textAlign: 'center' }}>
            Our Commitment to <span style={{ color: 'var(--brand-accent)' }}>Sustainability</span>
          </h2>
          <p className="body-large" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--spacing-giant)' }}>
            Every project we undertake is guided by our deep commitment to environmental stewardship, 
            community engagement, and sustainable development practices.
          </p>
        </div>
        
        <div className="sustainability-grid">
          {sustainabilityFeatures.map((feature, index) => (
            <div 
              key={feature.id} 
              className={`forest-card hover-lift fade-in ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="sustainability-icon" style={{ marginBottom: 'var(--spacing-medium)' }}>
                {getIcon(index)}
              </div>
              <h3 className="heading-3" style={{ marginBottom: 'var(--spacing-small)' }}>
                {feature.title}
              </h3>
              <p className="body-medium" style={{ marginBottom: 'var(--spacing-medium)', color: 'var(--text-light)' }}>
                {feature.description}
              </p>
              <div className="impact-badge">
                <span className="body-small" style={{ 
                  background: 'var(--brand-accent)', 
                  color: 'white', 
                  padding: '6px 16px', 
                  borderRadius: '20px',
                  fontWeight: '600'
                }}>
                  Impact: {feature.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`sustainability-commitment fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '800ms' }}>
          <div className="forest-card" style={{ background: 'var(--brand-primary)', color: 'white', textAlign: 'center' }}>
            <h3 className="heading-2" style={{ marginBottom: 'var(--spacing-medium)', color: 'white' }}>
              Our Sustainability Promise
            </h3>
            <p className="body-large" style={{ marginBottom: 'var(--spacing-large)', color: 'rgba(255, 255, 255, 0.9)' }}>
              We pledge to create a positive environmental and social impact through every project, 
              fostering conservation awareness and supporting local communities across India.
            </p>
            <div className="commitment-stats">
              <div className="stat">
                <div className="heading-2" style={{ color: 'var(--brand-light)' }}>50+</div>
                <div className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Projects Completed</div>
              </div>
              <div className="stat">
                <div className="heading-2" style={{ color: 'var(--brand-light)' }}>15+</div>
                <div className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>States Covered</div>
              </div>
              <div className="stat">
                <div className="heading-2" style={{ color: 'var(--brand-light)' }}>100%</div>
                <div className="body-medium" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Eco-Friendly</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .sustainability-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-large);
          margin-bottom: var(--spacing-giant);
        }
        
        .sustainability-icon {
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
        
        .impact-badge {
          display: flex;
          justify-content: center;
        }
        
        .commitment-stats {
          display: flex;
          justify-content: center;
          gap: var(--spacing-giant);
        }
        
        .stat {
          text-align: center;
        }
        
        @media (max-width: 781px) {
          .sustainability-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-medium);
          }
          
          .commitment-stats {
            flex-direction: column;
            gap: var(--spacing-large);
          }
        }
      `}</style>
    </section>
  );
};

export default Sustainability;