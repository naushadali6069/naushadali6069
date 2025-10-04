import React, { useState, useEffect } from 'react';
import { Star, Quote, MapPin, Calendar, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Testimonials data - you can replace these with your actual reviews
  const testimonials = [
    {
      id: 1,
      projectName: "Kumbh Mela Wildlife Exhibition",
      location: "Allahabad (Prayagraj), Uttar Pradesh",
      year: "2019",
      projectImage: "https://customer-assets.emergentagent.com/job_nature-projects/artifacts/s5g3ogbv_PHOTO-2019-01-26-14-57-56.jpg",
      testimonial: "The exhibition organized by the U.P. Forest Department on the occasion of Kumbh was very impressive. The displays related to forest and wildlife conservation were highly informative. Through educational boards, children and visitors gained useful knowledge about the importance of forests and wildlife. Such exhibitions are extremely beneficial in spreading awareness among students and society. I sincerely congratulate the organisers for this meaningful initiative and extend my best wishes for their future success.",
      clientName: "Dara Singh Chauhan",
      clientTitle: "Minister of Forest, Environment and Zoological Garden",
      organization: "Government of Uttar Pradesh",
      rating: 5,
      category: "Wildlife Conservation Exhibition"
    },
    {
      id: 2,
      projectName: "Major Dhyan Chand Nagar Van",
      location: "Jhansi, Uttar Pradesh",
      year: "2023-24",
      projectImage: "https://customer-assets.emergentagent.com/job_forest-vision-3/artifacts/rm903abq_IMG_5564.jpg",
      testimonial: "The architectural design of the gateway is absolutely magnificent! Forest Vision Alliance has created something that perfectly blends Jhansi's heritage with modern eco-tourism needs. The stone work and overall execution exceeded our expectations.",
      clientName: "Dr. Rajesh Kumar",
      clientTitle: "District Forest Officer",
      organization: "Jhansi Forest Department",
      rating: 5,
      category: "Urban Forest Development"
    },
    {
      id: 3,
      projectName: "Lucknow Zoo Butterfly Park", 
      location: "Lucknow, Uttar Pradesh",
      year: "2016-18",
      projectImage: "https://customer-assets.emergentagent.com/job_forest-vision-3/artifacts/9mnbtpes_IMG_0670.png",
      testimonial: "This is Uttar Pradesh's first butterfly park and it's absolutely wonderful! The artistic installations and interpretation center have made it a favorite destination for families and nature lovers. Children are learning so much about butterflies and conservation.",
      clientName: "Mrs. Priya Sharma",
      clientTitle: "Education Coordinator",
      organization: "Lucknow Zoo Authority",
      rating: 5,
      category: "Urban Wildlife"
    }
    // You can add more testimonials here as you collect them
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000); // Change every 8 seconds
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

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

    const section = document.getElementById('testimonials');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={18}
        className={i < rating ? 'filled-star' : 'empty-star'}
        fill={i < rating ? '#FFD700' : 'none'}
        color={i < rating ? '#FFD700' : '#e5e5e5'}
      />
    ));
  };

  const currentReview = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        {/* Section Header */}
        <div className={`testimonials-header fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="heading-1" style={{ textAlign: 'center', marginBottom: 'var(--spacing-small)' }}>
            What Our <span style={{ color: 'var(--brand-accent)' }}>Clients Say</span>
          </h2>
          <p className="body-large" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--spacing-large)' }}>
            Read what forest departments, zoo authorities, and conservation organizations say about our eco-tourism projects
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className={`testimonial-showcase fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <div className="testimonial-card">
            
            {/* Project Image */}
            <div className="testimonial-image">
              <img 
                src={currentReview.projectImage} 
                alt={`${currentReview.projectName} - Client testimonial`}
                loading="lazy"
              />
              <div className="project-overlay">
                <div className="project-badge">
                  <Award size={16} />
                  <span>{currentReview.category}</span>
                </div>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="testimonial-content">
              
              {/* Quote Icon */}
              <div className="quote-icon">
                <Quote size={48} color="var(--brand-primary)" />
              </div>

              {/* Star Rating */}
              <div className="star-rating">
                {renderStars(currentReview.rating)}
              </div>

              {/* Testimonial Text */}
              <blockquote className="testimonial-text">
                "{currentReview.testimonial}"
              </blockquote>

              {/* Client Information */}
              <div className="client-info">
                <div className="client-details">
                  <h4 className="client-name">{currentReview.clientName}</h4>
                  <p className="client-title">{currentReview.clientTitle}</p>
                  <p className="client-organization">{currentReview.organization}</p>
                </div>
              </div>

              {/* Project Information */}
              <div className="project-info">
                <h5 className="project-name">{currentReview.projectName}</h5>
                <div className="project-meta">
                  <div className="meta-item">
                    <MapPin size={14} />
                    <span>{currentReview.location}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{currentReview.year}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="testimonial-navigation">
            <button className="testimonial-nav testimonial-prev" onClick={prevTestimonial}>
              <ChevronLeft size={24} />
            </button>
            <button className="testimonial-nav testimonial-next" onClick={nextTestimonial}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className={`testimonial-indicators fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-indicator ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => goToTestimonial(index)}
            >
              <span>{index + 1}</span>
            </button>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`testimonials-cta fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
          <p className="body-medium" style={{ textAlign: 'center', color: 'var(--text-light)' }}>
            Ready to create your own success story? <br />
            <strong>Let's discuss your next eco-tourism project.</strong>
          </p>
        </div>
      </div>

      <style jsx>{`
        .testimonials-section {
          padding: var(--spacing-giant) 0;
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-subtle) 50%, var(--bg-primary) 100%);
          position: relative;
          overflow: hidden;
        }

        .testimonials-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.4;
        }

        .testimonials-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--spacing-medium);
          position: relative;
          z-index: 1;
        }

        .testimonial-showcase {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .testimonial-card {
          background: white;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 25px 80px rgba(27, 67, 50, 0.15);
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 500px;
          transition: transform 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 35px 100px rgba(27, 67, 50, 0.2);
        }

        .testimonial-image {
          position: relative;
          overflow: hidden;
        }

        .testimonial-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .testimonial-card:hover .testimonial-image img {
          transform: scale(1.05);
        }

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(27, 67, 50, 0.1) 0%, rgba(45, 90, 45, 0.3) 100%);
          display: flex;
          align-items: flex-start;
          padding: var(--spacing-large);
        }

        .project-badge {
          background: rgba(255, 255, 255, 0.95);
          padding: var(--spacing-small) var(--spacing-medium);
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          backdrop-filter: blur(10px);
          font-size: 14px;
          font-weight: 600;
          color: var(--brand-primary);
        }

        .testimonial-content {
          padding: var(--spacing-giant);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }

        .quote-icon {
          position: absolute;
          top: var(--spacing-large);
          right: var(--spacing-large);
          opacity: 0.1;
        }

        .star-rating {
          display: flex;
          gap: 4px;
          margin-bottom: var(--spacing-medium);
        }

        .testimonial-text {
          font-size: 1.25rem;
          line-height: 1.6;
          color: var(--text-primary);
          margin: 0 0 var(--spacing-large) 0;
          font-style: italic;
          position: relative;
        }

        .client-info {
          margin-bottom: var(--spacing-large);
          padding-bottom: var(--spacing-large);
          border-bottom: 2px solid var(--bg-subtle);
        }

        .client-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--brand-primary);
          margin-bottom: 4px;
        }

        .client-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 2px;
        }

        .client-organization {
          font-size: 13px;
          color: var(--text-light);
        }

        .project-info {
          background: var(--bg-subtle);
          padding: var(--spacing-medium);
          border-radius: 16px;
        }

        .project-name {
          font-size: 16px;
          font-weight: 700;
          color: var(--brand-primary);
          margin-bottom: var(--spacing-small);
        }

        .project-meta {
          display: flex;
          gap: var(--spacing-medium);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-light);
          font-size: 12px;
          font-weight: 500;
        }

        .testimonial-navigation {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          pointer-events: none;
          z-index: 10;
        }

        .testimonial-nav {
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
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          pointer-events: auto;
          backdrop-filter: blur(10px);
        }

        .testimonial-nav:hover {
          background: var(--brand-primary);
          color: white;
          transform: scale(1.1);
          box-shadow: 0 12px 35px rgba(45, 90, 45, 0.3);
        }

        .testimonial-prev {
          margin-left: -28px;
        }

        .testimonial-next {
          margin-right: -28px;
        }

        .testimonial-indicators {
          display: flex;
          justify-content: center;
          gap: var(--spacing-medium);
          margin-top: var(--spacing-large);
        }

        .testimonial-indicator {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid rgba(27, 67, 50, 0.2);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: var(--text-light);
        }

        .testimonial-indicator:hover {
          border-color: var(--brand-accent);
          background: rgba(70, 130, 60, 0.1);
          transform: scale(1.1);
        }

        .testimonial-indicator.active {
          background: var(--brand-primary);
          color: white;
          border-color: var(--brand-primary);
          transform: scale(1.2);
        }

        .testimonials-cta {
          text-align: center;
          margin-top: var(--spacing-giant);
          padding: var(--spacing-large);
          background: rgba(255, 255, 255, 0.7);
          border-radius: 24px;
          backdrop-filter: blur(10px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .testimonial-card {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .testimonial-image {
            height: 300px;
          }

          .testimonial-content {
            padding: var(--spacing-large);
          }

          .testimonial-text {
            font-size: 1.1rem;
          }

          .project-meta {
            flex-direction: column;
            gap: var(--spacing-small);
          }

          .testimonial-nav {
            width: 48px;
            height: 48px;
          }

          .testimonial-prev {
            margin-left: -24px;
          }

          .testimonial-next {
            margin-right: -24px;
          }

          .testimonial-indicator {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .testimonial-content {
            padding: var(--spacing-medium);
          }

          .testimonial-text {
            font-size: 1rem;
          }

          .project-overlay {
            padding: var(--spacing-medium);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;