import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, CheckCircle } from 'lucide-react';
import { portfolioProjects } from '../mock';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('portfolio');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" className="section-padding" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container">
        <div className={`portfolio-header fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="heading-1" style={{ marginBottom: 'var(--spacing-medium)', textAlign: 'center' }}>
            Our <span style={{ color: 'var(--brand-accent)' }}>Portfolio</span>
          </h2>
          <p className="body-large" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--spacing-giant)' }}>
            Discover our flagship projects across India, where we've transformed natural spaces into inspiring 
            destinations that educate, engage, and promote conservation.
          </p>
        </div>
        
        <div className="portfolio-grid">
          {portfolioProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`forest-card hover-lift fade-in ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-header">
                <div className="project-status">
                  <CheckCircle size={16} color="var(--brand-primary)" />
                  <span className="body-small" style={{ color: 'var(--brand-primary)', fontWeight: '600' }}>
                    {project.status}
                  </span>
                </div>
                <div className="project-category">
                  <span className="body-small" style={{ 
                    background: 'var(--brand-accent)', 
                    color: 'white', 
                    padding: '4px 12px', 
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}>
                    {project.category}
                  </span>
                </div>
              </div>
              
              <h3 className="heading-3" style={{ marginBottom: 'var(--spacing-small)' }}>
                {project.title}
              </h3>
              
              <div className="project-meta">
                <div className="meta-item">
                  <MapPin size={16} color="var(--text-light)" />
                  <span className="body-small" style={{ color: 'var(--text-light)' }}>
                    {project.location}
                  </span>
                </div>
                <div className="meta-item">
                  <Calendar size={16} color="var(--text-light)" />
                  <span className="body-small" style={{ color: 'var(--text-light)' }}>
                    {project.year}
                  </span>
                </div>
              </div>
              
              <p className="body-medium" style={{ marginBottom: 'var(--spacing-medium)', color: 'var(--text-light)' }}>
                {project.description}
              </p>
              
              <div className="project-highlights">
                <h4 className="body-medium" style={{ fontWeight: '600', marginBottom: 'var(--spacing-xs)' }}>
                  Key Highlights:
                </h4>
                <ul className="highlights-list">
                  {project.highlights.slice(0, 2).map((highlight, idx) => (
                    <li key={idx} className="body-small" style={{ color: 'var(--text-light)' }}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="view-more-btn">
                View Details
              </button>
            </div>
          ))}
        </div>
        
        <div className={`portfolio-cta fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '800ms' }}>
          <h3 className="heading-2" style={{ marginBottom: 'var(--spacing-medium)', textAlign: 'center' }}>
            Ready to Create Your Legacy Project?
          </h3>
          <p className="body-large" style={{ textAlign: 'center', marginBottom: 'var(--spacing-large)' }}>
            Join us in building something extraordinary that will inspire generations to come.
          </p>
          <div className="cta-buttons">
            <a href="#contact" className="btn-primary">
              Start Your Project
            </a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--spacing-large);
          margin-bottom: var(--spacing-giant);
        }
        
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-medium);
        }
        
        .project-status {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }
        
        .project-meta {
          display: flex;
          gap: var(--spacing-medium);
          margin-bottom: var(--spacing-medium);
        }
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }
        
        .highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .highlights-list li {
          padding: 2px 0;
          position: relative;
          padding-left: var(--spacing-small);
        }
        
        .highlights-list li:before {
          content: '•';
          color: var(--brand-primary);
          font-weight: bold;
          position: absolute;
          left: 0;
        }
        
        .view-more-btn {
          background: transparent;
          border: 1px solid var(--border-medium);
          border-radius: 20px;
          padding: 8px 16px;
          color: var(--brand-primary);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: var(--spacing-medium);
        }
        
        .view-more-btn:hover {
          background: var(--brand-primary);
          color: white;
          transform: translateY(-1px);
        }
        
        .portfolio-cta {
          background: var(--bg-card);
          padding: var(--spacing-giant);
          border-radius: 32px;
          text-align: center;
        }
        
        .cta-buttons {
          display: flex;
          justify-content: center;
        }
        
        @media (max-width: 781px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-medium);
          }
          
          .project-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-xs);
          }
          
          .project-meta {
            flex-direction: column;
            gap: var(--spacing-xs);
          }
          
          .portfolio-cta {
            padding: var(--spacing-large);
          }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;