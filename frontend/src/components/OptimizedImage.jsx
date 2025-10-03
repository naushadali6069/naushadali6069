import React, { useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  style = {},
  priority = false,
  width,
  height,
  placeholder = 'blur',
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(priority ? src : null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    skip: priority
  });

  // Load image when in view
  React.useEffect(() => {
    if ((inView || priority) && !imageSrc && !hasError) {
      setImageSrc(src);
    }
  }, [inView, priority, src, imageSrc, hasError]);

  const handleLoad = useCallback((e) => {
    setIsLoaded(true);
    onLoad && onLoad(e);
  }, [onLoad]);

  const handleError = useCallback((e) => {
    setHasError(true);
    setIsLoaded(false);
    onError && onError(e);
  }, [onError]);

  // Create optimized image URL (add quality and format parameters if possible)
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return '';
    
    // If it's an external URL, try to add optimization parameters
    if (originalSrc.includes('customer-assets.emergentagent.com')) {
      // These URLs might support optimization parameters
      const url = new URL(originalSrc);
      // Add compression if not already present
      if (!url.searchParams.has('q')) {
        url.searchParams.set('q', '75'); // 75% quality for good balance
      }
      return url.toString();
    }
    
    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(imageSrc);

  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: '#f3f4f6',
        minHeight: height || '200px',
        ...style
      }}
      {...props}
    >
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
          style={{
            background: 'linear-gradient(45deg, #f8f9fa 25%, transparent 25%, transparent 75%, #f8f9fa 75%), linear-gradient(45deg, #f8f9fa 25%, transparent 25%, transparent 75%, #f8f9fa 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px'
          }}
        >
          <div className="animate-pulse">
            <svg 
              className="w-12 h-12 text-gray-300" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Failed to load</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      {optimizedSrc && (
        <img
          src={optimizedSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={width}
          height={height}
        />
      )}

      {/* Loading indicator for slow connections */}
      {imageSrc && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;