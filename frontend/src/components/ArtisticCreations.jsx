import React, { useState, useEffect } from 'react';
import { Palette, Hammer, Leaf, Users, ArrowRight, Play } from 'lucide-react';

const ArtisticCreations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('completed');

  // Authentic sculpture collections from Forest Vision Alliance workshop
  const sculptureData = {
    completed: [
      {
        id: 1,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/gcvrf119_image.png",
        title: "Deer Collection Masterpieces",
        description: "Exquisite collection of spotted deer sculptures featuring lifelike proportions, detailed antler work, and authentic spotted patterns crafted by master artisans",
        material: "Eco-friendly composite materials with hand-painted natural patterns",
        location: "Multiple Wildlife Park & Reserve Projects"
      },
      {
        id: 2, 
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/yie8zapg_image-3.png",
        title: "Big Cats Collection",
        description: "Stunning leopard, tiger, and lion sculptures showcasing incredible attention to detail, realistic poses, and authentic color patterns of India's magnificent big cats",
        material: "Weather-resistant composite with hand-painted spots, stripes & natural coloring",
        location: "Tiger Reserves & Wildlife Conservation Centers"
      },
      {
        id: 3,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/y377d3k5_image-2.png",
        title: "Diverse Wildlife Collection", 
        description: "Impressive range including vibrant butterfly sculptures, majestic elephant and rhino figures, and detailed crocodile sculptures representing India's rich biodiversity",
        material: "Mixed sustainable materials with vibrant eco-friendly paints & finishes",
        location: "Zoos, Botanical Gardens & Educational Centers"
      },
      {
        id: 4,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/5cbho7n8_image-6.png",
        title: "Indian Water Birds Collection",
        description: "Beautiful collection of native water birds including cranes, ducks, herons, and flamingos showcasing the elegant forms and graceful poses of India's aquatic wildlife",
        material: "Durable materials with authentic feather textures & natural bird coloring",
        location: "Wetland Parks, Lake Projects & Bird Sanctuaries"
      },
      {
        id: 5,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/j230gqtw_Screenshot%202025-10-01%20at%208.37.26%E2%80%AFPM.png",
        title: "Tiger Workshop Excellence",
        description: "Close-up view of master craftsmen creating incredibly detailed tiger sculptures with meticulous attention to stripe patterns and realistic proportions",
        material: "Premium composite materials with authentic tiger markings",
        location: "Tiger Conservation Project Installations"
      },
      {
        id: 6,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/3gxix2vo_Screenshot%202025-10-01%20at%208.37.19%E2%80%AFPM.png",
        title: "Predator Collection",
        description: "Professional leopard and big cat sculptures arranged to showcase the power and grace of India's apex predators with lifelike expressions",
        material: "Advanced composite materials with realistic fur texturing",
        location: "Wildlife Interpretation Centers"
      },
      {
        id: 7,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/vhqp4nzw_Screenshot%202025-10-01%20at%208.36.58%E2%80%AFPM.png",
        title: "Majestic Lion & Wildlife Art",
        description: "Powerful lion sculptures and butterfly installations demonstrating the artistic range from large mammals to delicate insects",
        material: "Natural stone carving combined with colorful butterfly art",
        location: "Heritage Gateways & Garden Projects"
      },
      {
        id: 8,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/6j7nchrj_gtL6CpmrTGiF9U_shG5w1g.png",
        title: "Workshop Gallery Display",
        description: "Professional exhibition showcasing the breadth of Forest Vision Alliance's sculptural capabilities in a sophisticated gallery setting",
        material: "Mixed media sculptures with premium finishing",
        location: "Forest Vision Alliance Design Studio"
      }
    ],
    inProgress: [
      {
        id: 9,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/yp8molb3_lJzx3TpTSrat8xEySfZXcg.jpeg",
        title: "Master Craftsman at Work",
        description: "Expert artisan carefully working on intricate deer sculpture details, showcasing the traditional hand-crafting techniques that bring each piece to life",
        stage: "Fine Detail & Texture Work",
        completion: "85%"
      },
      {
        id: 10,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/gcvrf119_image.png",
        title: "Deer Collection Workshop",
        description: "Behind-the-scenes view of the workshop where multiple deer sculptures are being crafted simultaneously, showing the scale of production capability",
        stage: "Multiple Species Development",
        completion: "Various Stages"
      },
      {
        id: 11,
        image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/y377d3k5_image-2.png",
        title: "Multi-Species Wildlife Workshop",
        description: "Active workshop scene showing elephant, butterfly, and other wildlife sculptures in development, demonstrating the diversity of ongoing projects",
        stage: "Simultaneous Multi-Project Development",
        completion: "70-90%"
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
            <button className="cta-button">
              <span>Discuss Custom Sculptures</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

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
      `}</style>
    </section>
  );
};

export default ArtisticCreations;