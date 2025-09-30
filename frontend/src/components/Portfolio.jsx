import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, CheckCircle, Eye, ExternalLink, Camera, FileText } from 'lucide-react';
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

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
    
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="heading-2">{project.title}</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          
          <div className="modal-image">
            <img 
              src={project.image} 
              alt={`${project.title} - Placeholder for authentic project photos`}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '16px'
              }}
            />
            <div className="image-note">
              <Camera size={16} />
              <span>Placeholder - Authentic project photos available from PDF portfolio</span>
            </div>
          </div>
          
          <div className="modal-body">
            <div className="project-meta">
              <div className="meta-item">
                <MapPin size={16} color="var(--text-light)" />
                <span className="body-small">{project.location}</span>
              </div>
              <div className="meta-item">
                <Calendar size={16} color="var(--text-light)" />
                <span className="body-small">{project.year}</span>
              </div>
            </div>
            
            <p className="body-medium" style={{ marginBottom: 'var(--spacing-medium)' }}>
              {project.detailedDescription || project.description}
            </p>
            
            {project.actualImages && (
              <div className="actual-images-section">
                <h4 className="heading-3" style={{ marginBottom: 'var(--spacing-small)' }}>
                  <FileText size={20} style={{ marginRight: '8px', display: 'inline' }} />
                  Authentic Project Features from PDF
                </h4>
                <div className="actual-images-list">
                  {project.actualImages.map((imageDesc, idx) => (
                    <div key={idx} className="image-description">
                      <Camera size={14} color="var(--brand-primary)" />
                      <span className="body-small" style={{ color: 'var(--text-secondary)' }}>
                        {imageDesc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="highlights-section">
              <h4 className="heading-3" style={{ marginBottom: 'var(--spacing-small)' }}>
                Project Highlights
              </h4>
              <ul className="highlights-list">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="body-medium">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="client-info">
              <h4 className="body-medium" style={{ fontWeight: '600', marginBottom: 'var(--spacing-xs)' }}>
                Client: {project.client}
              </h4>
              <span className="status-badge">
                <CheckCircle size={14} />
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="portfolio" className="section-padding" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container">
        <div className={`portfolio-header fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="heading-1" style={{ marginBottom: 'var(--spacing-medium)', textAlign: 'center' }}>
            Our <span style={{ color: 'var(--brand-accent)' }}>Portfolio</span>
          </h2>
          <p className="body-large" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--spacing-medium)' }}>
            Discover our flagship projects across India, where we've transformed natural spaces into inspiring 
            destinations that educate, engage, and promote conservation.
          </p>
          
          {/* Portfolio Hero Image */}
          <div className="portfolio-hero-image" style={{ 
            textAlign: 'center', 
            marginBottom: 'var(--spacing-giant)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(27, 67, 50, 0.2)'
          }}>
            <img 
              src="https://customer-assets.emergentagent.com/job_forest-vision-3/artifacts/275ipr1m_White%20and%20Black%20Minimalist%20Graduation%20Video.png"
              alt="Forest Vision Alliance Portfolio Showcase - Butterfly sculptures, eco-tourism huts, interpretation centers, and wildlife installations"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: '24px'
              }}
              loading="lazy"
            />
          </div>
          
          <div className="pdf-note" style={{ 
            textAlign: 'center', 
            background: 'var(--bg-card)', 
            padding: 'var(--spacing-medium)', 
            borderRadius: '16px',
            marginBottom: 'var(--spacing-giant)',
            border: '2px dashed var(--brand-primary)'
          }}>
            <FileText size={24} color="var(--brand-primary)" style={{ marginBottom: 'var(--spacing-small)' }} />
            <p className="body-medium" style={{ color: 'var(--brand-primary)', fontWeight: '600' }}>
              📸 Authentic Project Photos Available
            </p>
            <p className="body-small" style={{ color: 'var(--text-light)' }}>
              Current images are placeholders. Click "View Details" to see descriptions of actual project photos from your PDF portfolio, including gates, sculptures, interpretation centers, and eco-tourism facilities.
            </p>
          </div>
        </div>
        
        <div className="portfolio-grid">
          {portfolioProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`portfolio-card fade-in ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="project-image">
                <img 
                  src={project.image} 
                  alt={`${project.title} - Placeholder for authentic project photos`}
                  loading="lazy"
                />
                <div className="image-overlay">
                  <button 
                    className="view-project-btn"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Eye size={20} />
                    View Authentic Details
                  </button>
                </div>
                <div className="placeholder-badge">
                  <Camera size={12} />
                  <span>From PDF</span>
                </div>
              </div>
              
              <div className="project-content">
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
                    Key Features:
                  </h4>
                  <ul className="highlights-preview">
                    {project.highlights.slice(0, 2).map((highlight, idx) => (
                      <li key={idx} className="body-small" style={{ color: 'var(--text-light)' }}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  className="view-more-btn"
                  onClick={() => setSelectedProject(project)}
                >
                  View Authentic Details
                  <ExternalLink size={16} style={{ marginLeft: '8px' }} />
                </button>
              </div>
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
      
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      
      <style jsx>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--spacing-large);
          margin-bottom: var(--spacing-giant);
        }
        
        .portfolio-card {
          background: var(--bg-card);
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(27, 67, 50, 0.1);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
        }
        
        .portfolio-card:hover {
          transform: translateY(-12px) rotateX(5deg);
          box-shadow: 0 20px 60px rgba(27, 67, 50, 0.25);
        }
        
        .project-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }
        
        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .portfolio-card:hover .project-image img {
          transform: scale(1.15) rotate(2deg);
          filter: brightness(1.1) contrast(1.05);
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(27, 67, 50, 0.85) 0%, rgba(45, 90, 45, 0.9) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(2px);
        }
        
        .portfolio-card:hover .image-overlay {
          opacity: 1;
        }
        
        .view-project-btn {
          background: rgba(255, 255, 255, 0.95);
          color: var(--brand-primary);
          border: none;
          padding: 16px 28px;
          border-radius: 30px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
          transform: translateY(20px);
        }
        
        .portfolio-card:hover .view-project-btn {
          transform: translateY(0) scale(1.05);
        }
        
        .view-project-btn:hover {
          background: var(--brand-primary);
          color: white;
          transform: translateY(0) scale(1.1) rotate(-2deg);
          box-shadow: 0 12px 35px rgba(45, 90, 45, 0.4);
        }
        
        .placeholder-badge {
          position: absolute;
          top: var(--spacing-small);
          right: var(--spacing-small);
          background: rgba(255, 255, 255, 0.95);
          color: var(--brand-primary);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(45, 90, 45, 0.2);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .project-content {
          padding: var(--spacing-large);
          position: relative;
        }
        
        .project-content:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--brand-primary), var(--brand-accent));
          transition: width 0.5s ease;
        }
        
        .portfolio-card:hover .project-content:before {
          width: 100%;
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
          animation: fadeInUp 0.6s ease-out;
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
          transition: transform 0.3s ease;
        }
        
        .meta-item:hover {
          transform: scale(1.1);
        }
        
        .highlights-preview {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .highlights-preview li {
          padding: 4px 0;
          position: relative;
          padding-left: var(--spacing-small);
          transition: all 0.3s ease;
          opacity: 0.8;
        }
        
        .highlights-preview li:hover {
          opacity: 1;
          transform: translateX(5px);
        }
        
        .highlights-preview li:before {
          content: '✦';
          color: var(--brand-accent);
          font-weight: bold;
          position: absolute;
          left: 0;
          animation: sparkle 1.5s ease-in-out infinite;
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .view-more-btn {
          background: linear-gradient(135deg, transparent, var(--brand-primary));
          border: 2px solid var(--brand-primary);
          border-radius: 25px;
          padding: 12px 24px;
          color: var(--brand-primary);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          margin-top: var(--spacing-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        
        .view-more-btn:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }
        
        .view-more-btn:hover {
          background: var(--brand-primary);
          color: white;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 25px rgba(45, 90, 45, 0.3);
        }
        
        .view-more-btn:hover:before {
          left: 100%;
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
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: var(--spacing-medium);
        }
        
        .modal-content {
          background: white;
          border-radius: 24px;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-large);
          border-bottom: 1px solid var(--border-light);
        }
        
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: background 0.2s ease;
        }
        
        .close-btn:hover {
          background: var(--bg-subtle);
        }
        
        .modal-image {
          padding: 0 var(--spacing-large);
          margin-bottom: var(--spacing-medium);
          position: relative;
        }
        
        .image-note {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(255, 255, 255, 0.95);
          color: var(--text-light);
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .modal-body {
          padding: 0 var(--spacing-large) var(--spacing-large);
        }
        
        .actual-images-section {
          background: var(--bg-section);
          padding: var(--spacing-medium);
          border-radius: 16px;
          margin-bottom: var(--spacing-large);
        }
        
        .actual-images-list {
          display: grid;
          gap: var(--spacing-small);
        }
        
        .image-description {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-small);
          padding: var(--spacing-small);
          background: white;
          border-radius: 8px;
        }
        
        .highlights-section {
          margin-bottom: var(--spacing-large);
        }
        
        .highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .highlights-list li {
          padding: var(--spacing-xs) 0;
          position: relative;
          padding-left: var(--spacing-medium);
          border-bottom: 1px solid var(--bg-subtle);
        }
        
        .highlights-list li:before {
          content: '✓';
          color: var(--brand-primary);
          font-weight: bold;
          position: absolute;
          left: 0;
        }
        
        .client-info {
          background: var(--bg-section);
          padding: var(--spacing-medium);
          border-radius: 16px;
        }
        
        .status-badge {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--brand-primary);
          font-weight: 600;
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
          
          .modal-content {
            margin: var(--spacing-small);
            max-height: 95vh;
          }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;