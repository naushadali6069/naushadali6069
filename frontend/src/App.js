import React, { Suspense, lazy, startTransition } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { usePerformanceMetrics, useConnectionSpeed } from "./hooks/usePerformance";

// Import components directly - React 19 Suspense issues with complex lazy loading
import ProjectShowcase from "./components/ProjectShowcase";
import About from "./components/About";
import Services from "./components/Services";
import ArtisticCreations from "./components/ArtisticCreations";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Sustainability from "./components/Sustainability";
import OurCompanies from "./components/OurCompanies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Simple visibility-based performance optimization
const PerformanceOptimizedSection = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          startTransition(() => {
            setIsVisible(true);
            setHasLoaded(true);
          });
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '100px' // Load before coming into view
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasLoaded]);

  return (
    <div 
      ref={ref} 
      className={`transition-opacity duration-500 ${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ minHeight: isVisible ? 'auto' : '300px' }}
    >
      {isVisible ? children : (
        <div className="flex items-center justify-center" style={{ minHeight: '300px' }}>
          <div className="text-center">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4"></div>
              <div className="w-32 h-4 bg-gray-200 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  const { isSlowConnection } = useConnectionSpeed();
  
  // Reduce animations on slow connections
  React.useEffect(() => {
    if (isSlowConnection) {
      document.body.classList.add('reduce-motion');
    }
  }, [isSlowConnection]);

  return (
    <div className="App smooth-scroll">
      {/* Critical above-the-fold content loads immediately */}
      <Header />
      <Hero />
      
      {/* Performance optimized sections with intersection observer */}
      <PerformanceOptimizedSection>
        <ProjectShowcase />
      </PerformanceOptimizedSection>

      <PerformanceOptimizedSection>
        <About />
      </PerformanceOptimizedSection>

      <PerformanceOptimizedSection>
        <Services />
      </PerformanceOptimizedSection>

      <PerformanceOptimizedSection>
        <ArtisticCreations />
      </PerformanceOptimizedSection>

      <PerformanceOptimizedSection>
        <Portfolio />
      </PerformanceOptimizedSection>

      <PerformanceOptimizedSection>
        <Testimonials />
      </PerformanceOptimizedSection>

      <PerformanceOptimizedSection>
        <Sustainability />
      </PerformanceOptimizedSection>

      <PerformanceOptimizedSection>
        <OurCompanies />
      </PerformanceOptimizedSection>

      <PerformanceOptimizedSection>
        <Contact />
      </PerformanceOptimizedSection>

      <PerformanceOptimizedSection>
        <Footer />
      </PerformanceOptimizedSection>
    </div>
  );
}

export default App;