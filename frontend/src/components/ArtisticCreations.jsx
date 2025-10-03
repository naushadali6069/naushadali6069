import React, { useState, useEffect } from 'react';
import { Palette, Hammer, Leaf, Users, ArrowRight, Play, MessageCircle, Phone, X } from 'lucide-react';

const ArtisticCreations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('completed');
  const [showContactModal, setShowContactModal] = useState(false);

  // Authentic sculpture collections - 4 main categories only
  const sculptureData = {
    completed: [
      {
        id: 1,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/gcvrf119_image.png",
        title: "Deer Collection",
        description: "Exquisite collection of spotted deer sculptures featuring lifelike proportions, detailed antler work, and authentic spotted patterns crafted by master artisans",
        material: "Eco-friendly composite materials with hand-painted natural patterns",
        location: "Multiple Wildlife Park & Reserve Projects"
      },
      {
        id: 2,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/5cbho7n8_image-6.png",
        title: "Indian Bird Collection",
        description: "Beautiful collection of native birds including cranes, ducks, herons, and flamingos showcasing the elegant forms and graceful poses of India's diverse avian wildlife",
        material: "Durable materials with authentic feather textures & natural bird coloring",
        location: "Wetland Parks, Lake Projects & Bird Sanctuaries"
      },
      {
        id: 3, 
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/yie8zapg_image-3.png",
        title: "Big Cats Collection",
        description: "Stunning leopard, tiger, and lion sculptures showcasing incredible attention to detail, realistic poses, and authentic color patterns of India's magnificent big cats",
        material: "Weather-resistant composite with hand-painted spots, stripes & natural coloring",
        location: "Tiger Reserves & Wildlife Conservation Centers"
      },
      {
        id: 4,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/y377d3k5_image-2.png",
        title: "Mix Wildlife Collection", 
        description: "Impressive range including vibrant butterfly sculptures, majestic elephant and rhino figures, and detailed crocodile sculptures representing India's rich biodiversity",
        material: "Mixed sustainable materials with vibrant eco-friendly paints & finishes",
        location: "Zoos, Botanical Gardens & Educational Centers"
      }
    ],
    inProgress: [
      {
        id: 5,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/yp8molb3_lJzx3TpTSrat8xEySfZXcg.jpeg",
        title: "Master Craftsman at Work",
        description: "Expert artisan carefully working on intricate sculpture details, showcasing the traditional hand-crafting techniques that bring each piece to life",
        stage: "Fine Detail & Texture Work",
        completion: "85%"
      },
      {
        id: 6,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/gcvrf119_image.png",
        title: "Wildlife Workshop Production",
        description: "Behind-the-scenes view of the workshop where multiple wildlife sculptures are being crafted simultaneously, showing the scale of production capability",
        stage: "Multiple Species Development",
        completion: "Various Stages"
      }
    ]
  };

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('artistic-creations');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Contact functions
  const handleWhatsAppContact = () => {
    const phoneNumber = "+917838754906";
    const message = "Hi! I'm interested in discussing custom wildlife sculptures for my eco-tourism project. Could we please schedule a consultation?";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowContactModal(false);
  };

  const handlePhoneContact = () => {
    const phoneNumber = "+917838754906";
    window.open(`tel:${phoneNumber}`, '_self');
    setShowContactModal(false);
  };

  return (
    <section id="artistic-creations" className="sculptures-section">
      <div className="sculptures-container">
        
        {/* Section Header */}
        <div className={`sculptures-header fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="heading-1" style={{ textAlign: 'center', marginBottom: 'var(--spacing-small)' }}>
            Our Sculpture <span style={{ color: 'var(--brand-accent)' }}>Creations</span>
          </h2>
          <h3 className="heading-3" style={{ textAlign: 'center', color: 'var(--brand-primary)', marginBottom: 'var(--spacing-medium)' }}>
            Masterpieces in Nature-Inspired Art
          </h3>
          <p className="body-large" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto var(--spacing-large)' }}>
            Our sculptures blend artistic excellence with eco-awareness, capturing the beauty of nature while inspiring conservation efforts. Each sculpture is carefully crafted using eco-friendly materials and techniques, ensuring minimal environmental impact while maximizing artistic impact.
          </p>
        </div>

        {/* Key Highlights */}
        <div className={`highlights-grid fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <div className="highlight-card">
            <div className="highlight-icon">
              <Leaf size={32} color="var(--brand-primary)" />
            </div>
            <h4>Eco-Friendly Craftsmanship</h4>
            <p>Use of sustainable materials and environmentally conscious methods</p>
          </div>
          
          <div className="highlight-card">
            <div className="highlight-icon">
              <Palette size={32} color="var(--brand-primary)" />
            </div>
            <h4>Wildlife Representation</h4>
            <p>Sculptures showcasing key species like tigers, deer, and peacocks</p>
          </div>
          
          <div className="highlight-card">
            <div className="highlight-icon">
              <Hammer size={32} color="var(--brand-primary)" />
            </div>
            <h4>Cultural Integration</h4>
            <p>Designs that blend local heritage with nature-inspired creativity</p>
          </div>
          
          <div className="highlight-card">
            <div className="highlight-icon">
              <Users size={32} color="var(--brand-primary)" />
            </div>
            <h4>Artistic Collaboration</h4>
            <p>Designers, sculptors, and eco-experts working together for impactful results</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`tab-navigation fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
          <button 
            className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            <Palette size={20} />
            Completed Masterpieces
          </button>
          <button 
            className={`tab-button ${activeTab === 'inProgress' ? 'active' : ''}`}
            onClick={() => setActiveTab('inProgress')}
          >
            <Hammer size={20} />
            Sculptures in Progress
          </button>
        </div>

        {/* Sculpture Gallery */}
        <div className={`sculptures-gallery fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
          
          {/* Completed Sculptures */}
          {activeTab === 'completed' && (
            <div className="sculptures-grid">
              {sculptureData.completed.map((sculpture, index) => (
                <div 
                  key={sculpture.id} 
                  className="sculpture-card"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="sculpture-image">
                    <img 
                      src={sculpture.image} 
                      alt={sculpture.title}
                      loading="lazy"
                    />
                    <div className="sculpture-overlay">
                      <div className="sculpture-badge">
                        <span>Completed</span>
                      </div>
                    </div>
                  </div>
                  <div className="sculpture-content">
                    <h4 className="sculpture-title">{sculpture.title}</h4>
                    <p className="sculpture-description">{sculpture.description}</p>
                    <div className="sculpture-details">
                      <div className="detail-item">
                        <strong>Material:</strong> {sculpture.material}
                      </div>
                      <div className="detail-item">
                        <strong>Project:</strong> {sculpture.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* In Progress Sculptures */}
          {activeTab === 'inProgress' && (
            <div className="progress-section">
              <div className="progress-gallery">
                {sculptureData.inProgress.map((sculpture, index) => (
                  <div 
                    key={sculpture.id} 
                    className="progress-card"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="progress-image">
                      <img 
                        src={sculpture.image} 
                        alt={sculpture.title}
                        loading="lazy"
                      />
                      <div className="progress-overlay">
                        <div className="progress-badge">
                          <span>{sculpture.completion} Complete</span>
                        </div>
                      </div>
                    </div>
                    <div className="progress-content">
                      <h4 className="progress-title">{sculpture.title}</h4>
                      <p className="progress-description">{sculpture.description}</p>
                      <div className="progress-details">
                        <div className="progress-stage">
                          <strong>Current Stage:</strong> {sculpture.stage}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="workshop-description">
                <h3>Our Artistic Process</h3>
                <p>
                  Each sculpture begins with careful study of the animal's anatomy and behavior. Our master craftsmen 
                  use traditional techniques combined with modern materials to create lifelike representations that 
                  inspire conservation awareness and connect visitors with nature's beauty.
                </p>
                
                <div className="process-steps">
                  <div className="step">
                    <h5>1. Concept & Design</h5>
                    <p>Research and sketching phase</p>
                  </div>
                  <div className="step">
                    <h5>2. Clay Modeling</h5>
                    <p>Creating initial form and proportions</p>
                  </div>
                  <div className="step">
                    <h5>3. Detail Work</h5>
                    <p>Adding texture, features, and expressions</p>
                  </div>
                  <div className="step">
                    <h5>4. Final Finishing</h5>
                    <p>Painting, sealing, and quality checks</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className={`sculptures-cta fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '800ms' }}>
          <div className="cta-content">
            <h4>Bring Art to Your Eco-Tourism Project</h4>
            <p>Commission custom wildlife sculptures that inspire conservation and enhance visitor experience</p>
            <button className="cta-button" onClick={() => setShowContactModal(true)}>
              <span>Discuss Custom Sculptures</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="contact-modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal-header">
              <h3>Let's Discuss Your Custom Sculpture Project</h3>
              <button className="close-button" onClick={() => setShowContactModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="contact-modal-content">
              <p>Ready to bring your vision to life? Choose your preferred way to connect:</p>
              <div className="contact-options">
                <button className="contact-option whatsapp" onClick={handleWhatsAppContact}>
                  <MessageCircle size={24} />
                  <div>
                    <span className="option-title">WhatsApp Chat</span>
                    <span className="option-subtitle">Quick response via message</span>
                  </div>
                  <ArrowRight size={16} />
                </button>
                <button className="contact-option phone" onClick={handlePhoneContact}>
                  <Phone size={24} />
                  <div>
                    <span className="option-title">Direct Call</span>
                    <span className="option-subtitle">Immediate consultation</span>
                  </div>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .sculptures-section {
          padding: var(--spacing-giant) 0;
          background: linear-gradient(135deg, var(--bg-primary) 0%, rgba(248, 250, 252, 0.8) 50%, var(--bg-primary) 100%);
          position: relative;
        }

        .sculptures-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h40v40H40V0zM0 40h40v40H0V40z'/%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
        }

        .sculptures-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--spacing-medium);
          position: relative;
          z-index: 1;
        }

        .highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-large);
          margin-bottom: var(--spacing-giant);
        }

        .highlight-card {
          background: white;
          padding: var(--spacing-large);
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 8px 30px rgba(27, 67, 50, 0.1);
          transition: all 0.3s ease;
        }

        .highlight-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 50px rgba(27, 67, 50, 0.15);
        }

        .highlight-icon {
          margin-bottom: var(--spacing-medium);
          display: flex;
          justify-content: center;
        }

        .highlight-card h4 {
          color: var(--brand-primary);
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: var(--spacing-small);
        }

        .highlight-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .tab-navigation {
          display: flex;
          justify-content: center;
          gap: var(--spacing-medium);
          margin-bottom: var(--spacing-giant);
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: var(--spacing-small);
          background: white;
          border: 2px solid rgba(27, 67, 50, 0.2);
          padding: var(--spacing-medium) var(--spacing-large);
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .tab-button:hover {
          border-color: var(--brand-accent);
          background: rgba(70, 130, 60, 0.05);
        }

        .tab-button.active {
          background: var(--brand-primary);
          color: white;
          border-color: var(--brand-primary);
        }

        .sculptures-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--spacing-large);
        }

        .sculpture-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 15px 60px rgba(27, 67, 50, 0.1);
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease-out both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .sculpture-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 80px rgba(27, 67, 50, 0.15);
        }

        .sculpture-image {
          position: relative;
          height: 280px;
          overflow: hidden;
        }

        .sculpture-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .sculpture-card:hover .sculpture-image img {
          transform: scale(1.1);
        }

        .sculpture-overlay {
          position: absolute;
          top: var(--spacing-medium);
          right: var(--spacing-medium);
        }

        .sculpture-badge span {
          background: var(--brand-primary);
          color: white;
          padding: var(--spacing-xs) var(--spacing-small);
          border-radius: 15px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .sculpture-content {
          padding: var(--spacing-large);
        }

        .sculpture-title {
          color: var(--brand-primary);
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: var(--spacing-small);
        }

        .sculpture-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--spacing-medium);
        }

        .sculpture-details {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .detail-item {
          color: var(--text-light);
          font-size: 14px;
        }

        .detail-item strong {
          color: var(--brand-primary);
        }

        .progress-section {
          max-width: 1200px;
          margin: 0 auto;
        }

        .progress-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--spacing-large);
          margin-bottom: var(--spacing-giant);
        }

        .progress-card {
          background: white;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 15px 60px rgba(27, 67, 50, 0.1);
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease-out both;
        }

        .progress-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 80px rgba(27, 67, 50, 0.15);
        }

        .progress-image {
          position: relative;
          height: 280px;
          overflow: hidden;
        }

        .progress-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .progress-card:hover .progress-image img {
          transform: scale(1.1);
        }

        .progress-overlay {
          position: absolute;
          top: var(--spacing-medium);
          right: var(--spacing-medium);
        }

        .progress-badge span {
          background: rgba(255, 165, 0, 0.9);
          color: white;
          padding: var(--spacing-xs) var(--spacing-small);
          border-radius: 15px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
        }

        .progress-content {
          padding: var(--spacing-large);
        }

        .progress-title {
          color: var(--brand-primary);
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: var(--spacing-small);
        }

        .progress-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--spacing-medium);
        }

        .progress-details {
          border-top: 2px solid var(--bg-subtle);
          padding-top: var(--spacing-small);
        }

        .progress-stage {
          color: var(--text-light);
          font-size: 14px;
        }

        .progress-stage strong {
          color: var(--brand-primary);
        }

        .workshop-description {
          background: white;
          padding: var(--spacing-giant);
          border-radius: 24px;
          box-shadow: 0 15px 60px rgba(27, 67, 50, 0.1);
        }

        .workshop-description h3 {
          color: var(--brand-primary);
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: var(--spacing-medium);
        }

        .workshop-description > p {
          color: var(--text-secondary);
          line-height: 1.7;
          text-align: center;
          max-width: 800px;
          margin: 0 auto var(--spacing-large);
          font-size: 1.1rem;
        }

        .process-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-large);
        }

        .step {
          text-align: center;
          padding: var(--spacing-large);
          background: var(--bg-subtle);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .step:hover {
          background: rgba(70, 130, 60, 0.05);
          transform: translateY(-4px);
        }

        .step h5 {
          color: var(--brand-primary);
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: var(--spacing-small);
        }

        .step p {
          color: var(--text-light);
          font-size: 14px;
        }

        .sculptures-cta {
          text-align: center;
          margin-top: var(--spacing-giant);
          padding: var(--spacing-giant);
          background: white;
          border-radius: 32px;
          box-shadow: 0 20px 60px rgba(27, 67, 50, 0.1);
        }

        .cta-content h4 {
          color: var(--brand-primary);
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: var(--spacing-small);
        }

        .cta-content p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-bottom: var(--spacing-large);
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-small);
          background: var(--brand-primary);
          color: white;
          border: none;
          padding: var(--spacing-medium) var(--spacing-giant);
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          background: var(--brand-accent);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(70, 130, 60, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .highlights-grid {
            grid-template-columns: 1fr;
          }

          .tab-navigation {
            flex-direction: column;
            align-items: center;
          }

          .sculptures-grid {
            grid-template-columns: 1fr;
          }

          .progress-content {
            grid-template-columns: 1fr;
          }

          .progress-text h3 {
            font-size: 1.6rem;
          }

          .progress-image {
            order: -1;
          }

          .progress-image img {
            height: 300px;
          }
        }

        /* Contact Modal Styles */
        .contact-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          animation: fadeIn 0.3s ease;
        }

        .contact-modal {
          background: white;
          border-radius: 20px;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
        }

        .contact-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-large);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .contact-modal-header h3 {
          margin: 0;
          color: var(--brand-primary);
          font-size: 1.3rem;
          font-weight: 600;
        }

        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease;
        }

        .close-button:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .contact-modal-content {
          padding: var(--spacing-large);
        }

        .contact-modal-content p {
          margin-bottom: var(--spacing-large);
          color: var(--text-secondary);
          text-align: center;
        }

        .contact-options {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-medium);
        }

        .contact-option {
          display: flex;
          align-items: center;
          gap: var(--spacing-medium);
          padding: var(--spacing-large);
          border: 2px solid rgba(70, 130, 60, 0.2);
          border-radius: 12px;
          background: rgba(70, 130, 60, 0.05);
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .contact-option:hover {
          border-color: var(--brand-primary);
          background: rgba(70, 130, 60, 0.1);
          transform: translateY(-2px);
        }

        .contact-option.whatsapp {
          border-color: rgba(37, 211, 102, 0.3);
          background: rgba(37, 211, 102, 0.05);
        }

        .contact-option.whatsapp:hover {
          border-color: #25d366;
          background: rgba(37, 211, 102, 0.1);
        }

        .contact-option.phone {
          border-color: rgba(59, 130, 246, 0.3);
          background: rgba(59, 130, 246, 0.05);
        }

        .contact-option.phone:hover {
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
        }

        .contact-option div {
          flex: 1;
        }

        .option-title {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .option-subtitle {
          display: block;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .contact-modal {
            width: 95%;
            margin: 20px;
          }

          .contact-modal-header h3 {
            font-size: 1.1rem;
          }

          .contact-option {
            padding: var(--spacing-medium);
          }
        }
      `}</style>
    </section>
  );
};

export default ArtisticCreations;