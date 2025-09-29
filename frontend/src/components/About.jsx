import React, { useEffect, useState } from 'react';
import { Target, Users, Leaf, Heart } from 'lucide-react';

const About = () => {
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

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: <Users size={32} color="var(--brand-primary)" />,
      title: "Collaboration",
      description: "Working together with government agencies, local communities, and conservation experts to create meaningful impact."
    },
    {
      icon: <Leaf size={32} color="var(--brand-primary)" />,
      title: "Sustainability",
      description: "Every project is designed with environmental consciousness, using eco-friendly materials and sustainable practices."
    },
    {
      icon: <Target size={32} color="var(--brand-primary)" />,
      title: "Innovation",
      description: "Blending cutting-edge design with traditional craftsmanship to create unique and inspiring installations."
    },
    {
      icon: <Heart size={32} color="var(--brand-primary)" />,
      title: "Conservation",
      description: "Promoting wildlife conservation and environmental awareness through educational and artistic experiences."
    }
  ];

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--bg-section)' }}>
      <div className="container">
        <div className="about-content">
          <div className={`about-text fade-in ${isVisible ? 'visible' : ''}`}>
            <h2 className="heading-1" style={{ marginBottom: 'var(--spacing-large)' }}>
              Building Bridges Between <span style={{ color: 'var(--brand-accent)' }}>Nature and Innovation</span>
            </h2>
            
            <div className="body-large" style={{ marginBottom: 'var(--spacing-large)' }}>
              <p style={{ marginBottom: 'var(--spacing-medium)' }}>
                Forest Vision Alliance is a collaborative network of four specialized companies united by a shared vision: 
                to create extraordinary eco-tourism experiences that celebrate India's natural heritage while promoting 
                conservation and sustainable development.
              </p>
              
              <p style={{ marginBottom: 'var(--spacing-medium)' }}>
                From the iconic gates of Pilibhit Tiger Reserve to the educational wonders of Lucknow Zoo's Butterfly Park, 
                our work spans across multiple states, touching lives and inspiring conservation awareness through the power 
                of art, design, and thoughtful infrastructure.
              </p>
              
              <p>
                We specialize in creating selfie points, signature gates, murals, 3D sculptures, nature interpretation 
                centers, and complete eco-tourism infrastructure that harmoniously blends with natural environments.
              </p>
            </div>
          </div>
          
          <div className={`values-grid fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            <h3 className="heading-2" style={{ marginBottom: 'var(--spacing-large)', textAlign: 'center', gridColumn: '1/-1' }}>
              Our Core Values
            </h3>
            
            {values.map((value, index) => (
              <div 
                key={value.title} 
                className={`forest-card fade-in ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="value-icon" style={{ marginBottom: 'var(--spacing-medium)' }}>
                  {value.icon}
                </div>
                <h4 className="heading-3" style={{ marginBottom: 'var(--spacing-small)' }}>
                  {value.title}
                </h4>
                <p className="body-medium">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .about-content {
          display: grid;
          gap: var(--spacing-giant);
        }
        
        .about-text {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-large);
          margin-top: var(--spacing-large);
        }
        
        .value-icon {
          display: flex;
          justify-content: center;
        }
        
        @media (max-width: 781px) {
          .values-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-medium);
          }
        }
      `}</style>
    </section>
  );
};

export default About;