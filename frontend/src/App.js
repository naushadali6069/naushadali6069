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

// Simple performance-enhanced section wrapper - always shows content
const PerformanceOptimizedSection = ({ children, className = "" }) => {
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '50px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Fallback to ensure content is always visible
    const fallbackTimer = setTimeout(() => {
      setHasAnimated(true);
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [hasAnimated]);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out ${className} ${
        hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-4'
      }`}
    >
      {children}
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