import { useState, useEffect, useCallback } from 'react';

// Connection speed detection
export const useConnectionSpeed = () => {
  const [connectionSpeed, setConnectionSpeed] = useState('unknown');
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    // Check if navigator.connection is available
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
      const updateConnectionInfo = () => {
        const effectiveType = connection.effectiveType;
        setConnectionSpeed(effectiveType);
        
        // Consider 'slow-2g' and '2g' as slow connections
        setIsSlowConnection(effectiveType === 'slow-2g' || effectiveType === '2g');
      };

      updateConnectionInfo();
      connection.addEventListener('change', updateConnectionInfo);

      return () => {
        connection.removeEventListener('change', updateConnectionInfo);
      };
    } else {
      // Fallback: measure download speed with a small image
      const measureSpeed = async () => {
        try {
          const startTime = Date.now();
          await fetch('/favicon.ico', { mode: 'no-cors' });
          const endTime = Date.now();
          const duration = endTime - startTime;
          
          // If loading a small favicon takes more than 1 second, consider it slow
          setIsSlowConnection(duration > 1000);
        } catch (error) {
          console.warn('Could not measure connection speed');
        }
      };

      measureSpeed();
    }
  }, []);

  return { connectionSpeed, isSlowConnection };
};

// Preload critical resources
export const usePreloadResources = (resources = []) => {
  useEffect(() => {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      
      if (resource.type === 'image') {
        link.as = 'image';
        link.href = resource.href;
      } else if (resource.type === 'font') {
        link.as = 'font';
        link.href = resource.href;
        link.crossOrigin = 'anonymous';
      }
      
      document.head.appendChild(link);
    });

    // Cleanup
    return () => {
      resources.forEach(resource => {
        const existingLink = document.querySelector(`link[href="${resource.href}"]`);
        if (existingLink) {
          document.head.removeChild(existingLink);
        }
      });
    };
  }, [resources]);
};

// Debounced function for performance
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Intersection Observer with performance optimizations
export const useOptimizedInView = (options = {}) => {
  const [inView, setInView] = useState(false);
  const [ref, setRef] = useState(null);

  const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options;

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(ref);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, threshold, rootMargin, triggerOnce]);

  return [setRef, inView];
};

// Performance monitoring
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    // Measure First Contentful Paint and other metrics
    if ('performance' in window && 'getEntriesByType' in performance) {
      const measureMetrics = () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        setMetrics({
          loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
          domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
          firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
          connectionType: navigator.connection?.effectiveType || 'unknown'
        });
      };

      // Wait for load event
      if (document.readyState === 'complete') {
        measureMetrics();
      } else {
        window.addEventListener('load', measureMetrics);
        return () => window.removeEventListener('load', measureMetrics);
      }
    }
  }, []);

  return metrics;
};

export default {
  useConnectionSpeed,
  usePreloadResources,
  useDebounce,
  useOptimizedInView,
  usePerformanceMetrics
};