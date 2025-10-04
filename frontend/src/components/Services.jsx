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
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredService, setHoveredService] = useState(null);

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
            const isHovered = hoveredService === service.id;
            return (
              <div 
                key={service.id} 
                className={`service-card hover-lift fade-in ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="service-icon-container">
                  <div className="service-icon">
                    {IconComponent && <IconComponent size={48} color="var(--brand-primary)" />}
                  </div>
                  <div className="icon-ripple"></div>
                </div>
                <h3 className="heading-3" style={{ marginBottom: 'var(--spacing-small)' }}>
                  {service.title}
                </h3>
                <p className="body-medium" style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
                  {service.description}
                </p>
                
                <div className="service-features">
                  <div className="feature-dot active"></div>
                  <div className="feature-dot"></div>
                  <div className="feature-dot"></div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className={`services-cta fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '1000ms' }}>
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
        
        .service-card {
          background: var(--bg-card);
          border-radius: 32px;
          padding: var(--spacing-large);
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid transparent;
        }
        
        .service-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 20px 60px rgba(27, 67, 50, 0.2);
          border-color: var(--brand-accent);
        }
        
        .service-card:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(107, 142, 35, 0.02) 0%, rgba(45, 90, 45, 0.02) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .service-card.hovered:before {
          opacity: 1;
        }
        
        .service-icon-container {
          position: relative;
          display: inline-block;
          margin-bottom: var(--spacing-medium);
        }
        
        .service-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, var(--bg-subtle) 0%, rgba(107, 142, 35, 0.1) 100%);
          border-radius: 50%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 2;
        }
        
        .service-card:hover .service-icon {
          background: linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%);
          transform: scale(1.1) rotate(10deg);
        }
        
        .service-card:hover .service-icon svg {
          color: white !important;
        }
        
        .icon-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(107, 142, 35, 0.2) 0%, transparent 70%);
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.6s ease;
        }
        
        .service-card:hover .icon-ripple {
          transform: translate(-50%, -50%) scale(1.5);
        }
        
        .service-features {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: var(--spacing-large);
        }
        
        .feature-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border-medium);
          transition: all 0.3s ease;
        }
        
        .feature-dot.active {
          background: var(--brand-accent);
          transform: scale(1.2);
        }
        
        .service-card:hover .feature-dot {
          background: var(--brand-primary);
          transform: scale(1.1);
        }
        
        .services-cta {
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-section) 100%);
          padding: var(--spacing-giant);
          border-radius: 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .services-cta:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4E4D4' fill-opacity='0.1'%3E%3Cpath d='M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0zm0 4c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16S28.837 4 20 4z'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }
        
        .cta-content {
          position: relative;
          z-index: 1;
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
        
        @media (max-width: 1024px) {
          .service-icon {
            width: 80px;
            height: 80px;
          }
          
          .service-icon svg {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;