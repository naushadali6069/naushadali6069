import React, { Suspense, lazy } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LazySection from "./components/LazySection";
import { usePerformanceMetrics } from "./hooks/usePerformance";

// Lazy load components that are below the fold
const ProjectShowcase = lazy(() => import("./components/ProjectShowcase"));
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const ArtisticCreations = lazy(() => import("./components/ArtisticCreations"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Sustainability = lazy(() => import("./components/Sustainability"));
const OurCompanies = lazy(() => import("./components/OurCompanies"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// Loading fallback component
const SectionLoader = ({ height = "400px" }) => (
  <div 
    className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
    style={{ minHeight: height }}
  >
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  const metrics = usePerformanceMetrics();

  // Preload critical components after initial load
  React.useEffect(() => {
    if (metrics.firstContentfulPaint > 0) {
      // Preload components that are likely to be viewed soon
      const timer = setTimeout(() => {
        import("./components/About");
        import("./components/Services");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [metrics.firstContentfulPaint]);

  return (
    <div className="App">
      {/* Critical above-the-fold content loads immediately */}
      <Header />
      <Hero />
      
      {/* Below-the-fold content loads lazily */}
      <LazySection fallback={<SectionLoader height="300px" />}>
        <Suspense fallback={<SectionLoader height="300px" />}>
          <ProjectShowcase />
        </Suspense>
      </LazySection>

      <LazySection fallback={<SectionLoader height="400px" />}>
        <Suspense fallback={<SectionLoader height="400px" />}>
          <About />
        </Suspense>
      </LazySection>

      <LazySection fallback={<SectionLoader height="500px" />}>
        <Suspense fallback={<SectionLoader height="500px" />}>
          <Services />
        </Suspense>
      </LazySection>

      <LazySection fallback={<SectionLoader height="600px" />}>
        <Suspense fallback={<SectionLoader height="600px" />}>
          <ArtisticCreations />
        </Suspense>
      </LazySection>

      <LazySection fallback={<SectionLoader height="700px" />}>
        <Suspense fallback={<SectionLoader height="700px" />}>
          <Portfolio />
        </Suspense>
      </LazySection>

      <LazySection fallback={<SectionLoader height="400px" />}>
        <Suspense fallback={<SectionLoader height="400px" />}>
          <Testimonials />
        </Suspense>
      </LazySection>

      <LazySection fallback={<SectionLoader height="500px" />}>
        <Suspense fallback={<SectionLoader height="500px" />}>
          <Sustainability />
        </Suspense>
      </LazySection>

      <LazySection fallback={<SectionLoader height="400px" />}>
        <Suspense fallback={<SectionLoader height="400px" />}>
          <OurCompanies />
        </Suspense>
      </LazySection>

      <LazySection fallback={<SectionLoader height="500px" />}>
        <Suspense fallback={<SectionLoader height="500px" />}>
          <Contact />
        </Suspense>
      </LazySection>

      <LazySection fallback={<SectionLoader height="200px" />}>
        <Suspense fallback={<SectionLoader height="200px" />}>
          <Footer />
        </Suspense>
      </LazySection>
    </div>
  );
}

export default App;