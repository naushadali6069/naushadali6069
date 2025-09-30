import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, MapPin, Calendar } from 'lucide-react';

const ProjectShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Featured project slides with stunning images
  const featuredSlides = [
    {
      id: 1,
      title: "Major Dhyan Chand Nagar Van",
      location: "Jhansi, Uttar Pradesh", 
      year: "2023-24",
      image: "https://customer-assets.emergentagent.com/job_forest-vision-3/artifacts/rm903abq_IMG_5564.jpg",
      description: "A harmonious blend of Jhansi's heritage and wildlife, featuring iconic gates with architectural grandeur.",
      category: "Urban Forest Development",
      videoPlaceholder: true
    },
    {
      id: 2,
      title: "Pilibhit Tiger Reserve Projects",
      location: "Pilibhit, Uttar Pradesh",
      year: "2023-24", 
      image: "https://customer-assets.emergentagent.com/job_forest-vision-3/artifacts/rtxqtt0u_IMG_7030.png",
      description: "Multiple eco-tourism projects including famous selfie points and Nature Interpretation Centers.",
      category: "Wildlife Conservation",
      videoPlaceholder: true
    },
    {
      id: 3,
      title: "Lucknow Zoo Butterfly Park",
      location: "Lucknow, Uttar Pradesh",
      year: "2016-18",
      image: "https://customer-assets.emergentagent.com/job_forest-vision-3/artifacts/9mnbtpes_IMG_0670.png",
      description: "Uttar Pradesh's first Butterfly Park with artistic installations and comprehensive interpretation center.",
      category: "Urban Wildlife",
      videoPlaceholder: true
    },
    {
      id: 4,
      title: "Rapdi Eco-Tourism Centre",
      location: "Firozabad, Uttar Pradesh",
      year: "2023-24",
      image: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/uav55gh4_DJI_0233.JPG",
      description: "Sustainable retreat center along scenic riverbank with eco-friendly huts and nature-centric design.",
      category: "Riverside Eco-Tourism",
      videoPlaceholder: true
    },
    {
      id: 5,
      title: "Ranipur Tiger Reserve Gate",
      location: "Chitrakoot, Uttar Pradesh",
      year: "2023-24",
      image: "https://customer-assets.emergentagent.com/job_forest-vision-3/artifacts/j37sig7w_Ranipur%20Gate.png",
      description: "Grand stone entrance gate with traditional craftsmanship and tiger sculptures.",
      category: "Tiger Conservation",
      videoPlaceholder: true
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [isAutoplay, featuredSlides.length]);

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

    const section = document.getElementById('project-showcase');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
    setIsAutoplay(false); // Pause autoplay when user manually navigates
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredSlides.length) % featuredSlides.length);
    setIsAutoplay(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
  };

  return (
    <section id="project-showcase" className="showcase-section">
      <div className="showcase-container">
        {/* Section Header */}
        <div className={`showcase-header fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="heading-1" style={{ textAlign: 'center', marginBottom: 'var(--spacing-small)' }}>
            Featured <span style={{ color: 'var(--brand-accent)' }}>Project Showcase</span>
          </h2>
          <p className="body-large" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--spacing-large)' }}>
            Explore our most impactful eco-tourism projects across India, transforming natural spaces into inspiring destinations
          </p>
        </div>

        {/* Slideshow Container */}
        <div className={`slideshow-container fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <div className="slideshow-wrapper">
            
            {/* Main Slide Display */}
            <div className="slide-display">
              <div 
                className="slide-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredSlides.map((slide, index) => (
                  <div key={slide.id} className="slide">
                    <div className="slide-image">
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                      <div className="slide-overlay">
                        <div className="slide-content">
                          <div className="slide-category">
                            <span>{slide.category}</span>
                          </div>
                          <h3 className="slide-title heading-2">{slide.title}</h3>
                          <div className="slide-meta">
                            <div className="meta-item">
                              <MapPin size={16} />
                              <span>{slide.location}</span>
                            </div>
                            <div className="meta-item">
                              <Calendar size={16} />
                              <span>{slide.year}</span>
                            </div>
                          </div>
                          <p className="slide-description body-medium">{slide.description}</p>
                          
                          {/* Video Placeholder Button */}
                          {slide.videoPlaceholder && (
                            <button className="video-placeholder-btn">
                              <Play size={20} />
                              <span>Project Video Coming Soon</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button className="slide-nav slide-nav-prev" onClick={prevSlide}>
                <ChevronLeft size={32} />
              </button>
              <button className="slide-nav slide-nav-next" onClick={nextSlide}>
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="slide-indicators">
              {featuredSlides.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                >
                  <span className="indicator-progress"></span>
                </button>
              ))}
            </div>

            {/* Autoplay Control */}
            <div className="autoplay-control">
              <button 
                className={`autoplay-btn ${isAutoplay ? 'active' : ''}`}
                onClick={() => setIsAutoplay(!isAutoplay)}
              >
                {isAutoplay ? 'Pause' : 'Play'} Slideshow
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .showcase-section {
          padding: var(--spacing-giant) 0;
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-subtle) 100%);
          position: relative;
          overflow: hidden;
        }

        .showcase-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.3;
        }

        .showcase-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--spacing-medium);
          position: relative;
          z-index: 1;
        }

        .slideshow-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .slideshow-wrapper {
          position: relative;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 25px 80px rgba(27, 67, 50, 0.3);
          background: white;
        }

        .slide-display {
          position: relative;
          height: 650px;
          overflow: hidden;
          border-radius: 24px;
          background: white;
        }

        .slide-track {
          display: flex;
          transition: transform 1s cubic-bezier(0.25, 0.1, 0.25, 1);
          height: 100%;
        }

        .slide {
          min-width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .slide-image {
          width: 100%;
          height: 480px;
          position: relative;
          overflow: hidden;
          border-radius: 24px 24px 0 0;
        }

        .slide-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1);
          filter: brightness(1.1) contrast(1.15) saturate(1.2);
        }

        .slide:hover .slide-image img {
          transform: scale(1.08);
        }

        .slide-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.05) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
          pointer-events: none;
        }

        .slide-content {
          background: linear-gradient(135deg, rgba(248, 250, 252, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%);
          padding: var(--spacing-large);
          height: 170px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 0 0 24px 24px;
          border-top: 1px solid rgba(27, 67, 50, 0.1);
          backdrop-filter: blur(10px);
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
        }

        .slide-info {
          flex: 1;
          max-width: 70%;
        }

        .slide-category {
          margin-bottom: var(--spacing-xs);
        }

        .slide-category span {
          background: var(--brand-accent);
          color: white;
          padding: 4px var(--spacing-small);
          border-radius: 12px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .slide-title {
          color: var(--brand-primary);
          margin-bottom: var(--spacing-small);
          font-size: 1.8rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .slide-meta {
          display: flex;
          gap: var(--spacing-medium);
          margin-bottom: var(--spacing-small);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-light);
          font-size: 13px;
          font-weight: 500;
        }

        .slide-description {
          color: var(--text-secondary);
          line-height: 1.5;
          font-size: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .slide-actions {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          margin-left: var(--spacing-large);
        }

        .video-placeholder-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--brand-primary);
          border: none;
          color: white;
          padding: var(--spacing-medium) var(--spacing-large);
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          font-weight: 600;
          font-size: 14px;
          box-shadow: 0 4px 15px rgba(45, 90, 45, 0.3);
        }

        .video-placeholder-btn:hover {
          background: var(--brand-accent);
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 25px rgba(45, 90, 45, 0.4);
        }

        .slide-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.95);
          border: none;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--brand-primary);
          transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          z-index: 15;
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .slide-nav:hover {
          background: var(--brand-primary);
          color: white;
          transform: translateY(-50%) scale(1.15);
          box-shadow: 0 12px 40px rgba(45, 90, 45, 0.4);
          border-color: var(--brand-primary);
        }

        .slide-nav:active {
          transform: translateY(-50%) scale(1.05);
        }

        .slide-nav-prev {
          left: var(--spacing-large);
          animation: slideInLeft 0.6s ease-out 0.5s both;
        }

        .slide-nav-next {
          right: var(--spacing-large);
          animation: slideInRight 0.6s ease-out 0.5s both;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }

        .slide-indicators {
          display: flex;
          justify-content: center;
          gap: 12px;
          padding: var(--spacing-large);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%);
          backdrop-filter: blur(10px);
        }

        .indicator {
          width: 50px;
          height: 4px;
          background: rgba(27, 67, 50, 0.2);
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          position: relative;
          overflow: hidden;
        }

        .indicator::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, var(--brand-primary), var(--brand-accent));
          border-radius: 2px;
          transition: width 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .indicator:hover {
          background: rgba(27, 67, 50, 0.3);
          transform: scaleY(1.5);
        }

        .indicator.active {
          background: rgba(27, 67, 50, 0.3);
          transform: scaleY(1.5);
        }

        .indicator.active::before {
          width: 100%;
          animation: progressFill 5s linear;
        }

        @keyframes progressFill {
          from { width: 0; }
          to { width: 100%; }
        }

        .indicator-progress {
          display: none;
        }

        .autoplay-control {
          position: absolute;
          top: var(--spacing-medium);
          right: var(--spacing-medium);
          z-index: 20;
        }

        .autoplay-btn {
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 8px var(--spacing-medium);
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(15px);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .autoplay-btn:hover {
          background: rgba(0, 0, 0, 0.9);
          border-color: rgba(255, 255, 255, 0.4);
          transform: scale(1.05);
        }

        .autoplay-btn.active {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
          box-shadow: 0 4px 15px rgba(45, 90, 45, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .slide-display {
            height: 500px;
          }

          .slide-overlay {
            padding: 0;
          }

          .slide-content {
            max-width: none;
            margin: var(--spacing-medium);
            padding: var(--spacing-medium);
          }

          .slide-title {
            font-size: 1.5rem;
          }

          .slide-meta {
            flex-direction: column;
            gap: var(--spacing-xs);
          }

          .slide-description {
            font-size: 13px;
            -webkit-line-clamp: 3;
          }

          .slide-nav {
            width: 45px;
            height: 45px;
          }

          .slide-nav-prev {
            left: var(--spacing-small);
          }

          .slide-nav-next {
            right: var(--spacing-small);
          }

          .indicator {
            width: 35px;
            height: 3px;
          }

          .video-placeholder-btn {
            padding: 8px var(--spacing-small);
            font-size: 12px;
          }

          .autoplay-control {
            top: var(--spacing-small);
            right: var(--spacing-small);
          }
        }

        @media (max-width: 480px) {
          .slide-display {
            height: 400px;
            border-radius: 16px;
          }

          .slide-content {
            margin: var(--spacing-small);
            padding: var(--spacing-small);
            border-radius: 12px;
          }

          .slide-title {
            font-size: 1.3rem;
            margin-bottom: 8px;
          }

          .slide-description {
            margin-bottom: var(--spacing-small);
          }

          .video-placeholder-btn {
            padding: 6px var(--spacing-small);
            font-size: 11px;
            gap: 6px;
          }
        }

        /* Enhanced Animations */
        .slideshow-container {
          animation: containerFadeIn 1s ease-out;
        }

        @keyframes containerFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slide-image {
          position: relative;
        }

        .slide-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%,
            rgba(255, 255, 255, 0.1) 100%
          );
          transform: translateX(-100%) skewX(-20deg);
          transition: transform 0.8s ease;
          pointer-events: none;
        }

        .slide:hover .slide-image::before {
          transform: translateX(100%) skewX(-20deg);
        }

        /* Smooth entrance for indicators */
        .indicator {
          animation: indicatorFadeIn 0.6s ease-out both;
        }

        .indicator:nth-child(1) { animation-delay: 0.8s; }
        .indicator:nth-child(2) { animation-delay: 0.9s; }
        .indicator:nth-child(3) { animation-delay: 1.0s; }
        .indicator:nth-child(4) { animation-delay: 1.1s; }
        .indicator:nth-child(5) { animation-delay: 1.2s; }

        @keyframes indicatorFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectShowcase;