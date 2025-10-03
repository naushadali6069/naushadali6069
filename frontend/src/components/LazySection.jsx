import React, { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

const LazySection = ({ 
  children, 
  fallback = null, 
  threshold = 0.1, 
  rootMargin = '100px',
  className = '',
  style = {}
}) => {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  // Default loading skeleton
  const defaultFallback = (
    <div className={`animate-pulse ${className}`} style={style}>
      <div className="bg-gray-200 rounded-lg" style={{ minHeight: '300px' }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={ref} className={className} style={style}>
      {inView ? (
        <Suspense fallback={fallback || defaultFallback}>
          {children}
        </Suspense>
      ) : (
        fallback || defaultFallback
      )}
    </div>
  );
};

export default LazySection;