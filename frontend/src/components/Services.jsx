import React, { useEffect, useState } from 'react';
import { BookOpen, Mountain, TreePine, Camera, Leaf, Palette } from 'lucide-react';
import { services } from '../mock';

const iconMap = {
  BookOpen: BookOpen,
  Mountain: Mountain,
  TreePine: TreePine,
  Camera: Camera,
  Leaf: Leaf,
  Palette: Palette
};

const Services = () => {
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

    const section = document.getElementById('services');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="section-padding">
      <div className="container">
        <div className={`services-header fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="heading-1" style={{ marginBottom: 'var(--spacing-medium)', textAlign: 'center' }}>
            Our <span style={{ color: 'var(--brand-accent)' }}>Services</span>
          </h2>
          <p className="body-large" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto var(--spacing-giant)' }}>
            We offer comprehensive eco-tourism solutions that blend nature with artistic excellence, 
            creating unforgettable experiences for visitors while promoting conservation awareness.
          </p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div 
                key={service.id} 
                className={`forest-card hover-lift fade-in ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="service-icon" style={{ marginBottom: 'var(--spacing-medium)' }}>
                  {IconComponent && <IconComponent size={48} color="var(--brand-primary)" />}
                </div>
                <h3 className="heading-3" style={{ marginBottom: 'var(--spacing-small)' }}>
                  {service.title}
                </h3>
                <p className="body-medium" style={{ color: 'var(--text-light)' }}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className={`services-cta fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '800ms' }}>
          <div className="cta-content">
            <h3 className="heading-2" style={{ marginBottom: 'var(--spacing-medium)', textAlign: 'center' }}>
              Ready to Transform Your Vision?
            </h3>
            <p className="body-large" style={{ textAlign: 'center', marginBottom: 'var(--spacing-large)' }}>
              Let's collaborate to create something extraordinary that celebrates nature and inspires conservation.
            </p>
            <div className="cta-buttons">
              <a href="#contact" className="btn-primary">
                Start Your Project
              </a>
              <a href="#portfolio" className="btn-secondary">
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--spacing-large);
          margin-bottom: var(--spacing-giant);
        }
        
        .service-icon {
          display: flex;
          justify-content: center;
          padding: var(--spacing-medium);
          background: var(--bg-subtle);
          border-radius: 50%;
          width: 80px;
          height: 80px;
          margin: 0 auto var(--spacing-medium);
          align-items: center;
        }
        
        .services-cta {
          background: var(--bg-section);
          padding: var(--spacing-giant);
          border-radius: 32px;
          text-align: center;
        }
        
        .cta-buttons {
          display: flex;
          gap: var(--spacing-medium);
          justify-content: center;
        }
        
        @media (max-width: 781px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-medium);
          }
          
          .services-cta {
            padding: var(--spacing-large);
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;