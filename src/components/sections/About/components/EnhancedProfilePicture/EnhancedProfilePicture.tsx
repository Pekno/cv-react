import React, { useState, useEffect, useRef, useCallback } from 'react';
import classes from './EnhancedProfilePicture.module.css';
import ImageLoader from '../../../../common/OptimizedImage/ImageLoader';

interface EnhancedProfilePictureProps {
  images: string[];
  altText: string;
  size?: number;
  transitionInterval?: number;
}

const EnhancedProfilePicture: React.FC<EnhancedProfilePictureProps> = ({
  images,
  altText,
  size = 220,
  transitionInterval = 5000 // Default to 5 seconds between transitions
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preloadImageRef = useRef<HTMLImageElement | null>(null);
  // Keep a ref to the current index so callbacks always read the latest value
  const currentImageIndexRef = useRef(currentImageIndex);
  currentImageIndexRef.current = currentImageIndex;

  const clearAllTimeouts = useCallback((): void => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
  }, []);

  const preloadNextImage = useCallback((): void => {
    if (images.length <= 1) return;

    const nextIndex = (currentImageIndexRef.current + 1) % images.length;
    const nextImageSrc = images[nextIndex] || '';

    if (!preloadImageRef.current) {
      preloadImageRef.current = new Image();
    }

    if (preloadImageRef.current.src !== nextImageSrc) {
      preloadImageRef.current.src = nextImageSrc;
    }
  }, [images]);

  const triggerTransition = useCallback((): void => {
    if (images.length <= 1) return;

    setIsAnimating(true);

    const animationDuration = 3000;
    const midpointTime = animationDuration / 2;

    animationTimeoutRef.current = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);

      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        preloadNextImage();
        transitionTimeoutRef.current = setTimeout(triggerTransition, transitionInterval);
      }, midpointTime);

    }, midpointTime);
  }, [images, transitionInterval, preloadNextImage]);

  useEffect(() => {
    if (images.length > 1) {
      preloadNextImage();
      transitionTimeoutRef.current = setTimeout(triggerTransition, transitionInterval);
    }

    return clearAllTimeouts;
  }, [images.length, transitionInterval, preloadNextImage, triggerTransition, clearAllTimeouts]);

  // Calculate dimensions based on size prop
  const containerSize = size + 20; // Add 20px for the border (10px on each side)
  const imageSize = size; // The image itself is slightly smaller to show the border

  // Choose the current image source with fallback to empty string if undefined
  const currentImageSrc = images[currentImageIndex] || '';

  return (
    <div className={classes.mainContainer} style={{ width: containerSize, height: containerSize }}>
      {/* Gradient border container - must be first in DOM (below image) */}
      <div className={classes.borderContainer}>
        <div className={classes.gradientRingOuter}></div>
      </div>
      
      {/* The image container - must be second in DOM (above border) */}
      <div 
        className={classes.imageWrapper}
        style={{ width: imageSize, height: imageSize }}
      >
        <div 
          className={`${classes.imageContainer} ${isAnimating ? classes.animating : ''}`}
        >
          <ImageLoader 
            src={currentImageSrc}
            alt={altText}
            className={classes.profileImage}
            radius={9999} // Make it fully rounded
            height={imageSize}
            width={imageSize}
            priority="high" // First profile picture gets high priority
            lazyLoad={false} // Don't lazy load the primary profile image
          />
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfilePicture;