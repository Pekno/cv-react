import React, { useState, useEffect } from 'react';
import { Image, Skeleton } from '@mantine/core';

interface ImageLoaderProps {
  src: string;
  fallbackSrc?: string;
  lowQualitySrc?: string;
  priority?: 'high' | 'low' | 'auto';
  lazyLoad?: boolean;
  alt?: string;
  height?: number | string;
  width?: number | string;
  radius?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Advanced image component with loading optimizations
 * Features:
 * - Progressive loading with low-quality image placeholder
 * - Priority loading for important images
 * - Fallback image for errors
 * - Loading skeleton
 */
const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  fallbackSrc,
  lowQualitySrc,
  priority = 'auto',
  lazyLoad = true,
  alt = '',
  height,
  width,
  radius,
  className,
  style,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || src);
  
  // Set loading priority attributes
  const loadingPriority = priority === 'high' ? 'eager' : (lazyLoad ? 'lazy' : undefined);
  const fetchPriority = priority === 'high' ? 'high' : (priority === 'low' ? 'low' : 'auto');
  
  // Handle image loading
  useEffect(() => {
    if (!lowQualitySrc || loaded) return;
    
    const img = new window.Image();
    img.src = src;
    
    // Set fetchPriority attribute if available
    if ('fetchPriority' in img) {
      // TypeScript doesn't know about this property by default
      (img as any).fetchPriority = fetchPriority;
    }
    
    img.onload = () => {
      setCurrentSrc(src);
      setLoaded(true);
    };
    
    img.onerror = () => {
      setError(true);
      if (fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      }
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, lowQualitySrc, fallbackSrc, fetchPriority, loaded]);
  
  // Handle error state when no lowQualitySrc is provided
  const handleError = () => {
    setError(true);
    if (fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
  };
  
  // Handle successful load
  const handleLoad = () => {
    setLoaded(true);
  };
  
  return (
    <>
      {!loaded && !error && (
        <Skeleton
          height={height}
          width={width || '100%'}
          radius={radius || 'md'}
          animate={true}
        />
      )}
      
      <Image
        src={error && fallbackSrc ? fallbackSrc : currentSrc}
        loading={loadingPriority}
        fetchPriority={fetchPriority}
        alt={alt}
        height={height}
        width={width}
        radius={radius}
        className={className}
        style={{
          display: loaded || error ? 'block' : 'none',
          transition: 'opacity 0.3s ease-in-out',
          opacity: loaded || error ? 1 : 0,
          ...(style || {})
        }}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </>
  );
};

export default ImageLoader;