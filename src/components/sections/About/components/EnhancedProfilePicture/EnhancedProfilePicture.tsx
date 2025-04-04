import React, { useState, useEffect, useRef } from 'react';
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
  const [nextImageLoaded, setNextImageLoaded] = useState(false);

  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preloadImageRef = useRef<HTMLImageElement | null>(null);
  
  // Clear all timeouts safely
  const clearAllTimeouts = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
  };

  // Function to preload the next image in sequence
  const preloadNextImage = () => {
    if (images.length <= 1) return;
    
    const nextIndex = (currentImageIndex + 1) % images.length;
    // Make sure we access a valid array index
    const nextImageSrc = images[nextIndex] || '';
    
    // Create a new image element for preloading
    if (!preloadImageRef.current) {
      preloadImageRef.current = new Image();
    }
    
    // Only load if it's a different image
    if (preloadImageRef.current.src !== nextImageSrc) {
      preloadImageRef.current.onload = () => {
        setNextImageLoaded(true);
      };
      preloadImageRef.current.src = nextImageSrc;
    }
  };

  // Function to handle the image transition
  const triggerTransition = () => {
    // Only run transitions if we have multiple images
    if (images.length <= 1) return;
    
    // Start the animation
    setIsAnimating(true);
    
    // Set a timeout to change the image at the peak of the blur effect
    const animationDuration = 3000; // 3 seconds - must match CSS animation duration
    const midpointTime = animationDuration / 2; // 1.5 seconds (50% of animation)
    
    // Schedule image change to happen at the peak blur
    animationTimeoutRef.current = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setNextImageLoaded(false);
      
      // Schedule the end of animation
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        
        // Start preloading the next image immediately
        preloadNextImage();
        
        // Schedule the next transition
        transitionTimeoutRef.current = setTimeout(triggerTransition, transitionInterval);
      }, midpointTime);
      
    }, midpointTime);
  };
  
  // Start initial transition and preloading
  useEffect(() => {
    // Only load the current image immediately
    // The next image will be preloaded just before we need it
    if (images.length > 1) {
      // Preload the next image
      preloadNextImage();
      
      // Start the first transition after initial delay
      transitionTimeoutRef.current = setTimeout(triggerTransition, transitionInterval);
    }
    
    // Cleanup function
    return clearAllTimeouts;
  }, [images.length, transitionInterval]);

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