import React, { useState, useEffect, useRef } from 'react';
import classes from './EnhancedProfilePicture.module.css';

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
  const animationTimeoutRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);
  
  // Clear all timeouts safely
  const clearAllTimeouts = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
  };

  // Function to handle the image transition
  const triggerTransition = () => {
    // Only run transitions if we have multiple images
    if (images.length <= 1) return;
    
    // Start the animation
    setIsAnimating(true);
    
    // Set a timeout to change the image at the peak of the blur effect (middle of animation)
    const animationDuration = 3000; // 3 seconds - must match CSS animation duration
    const midpointTime = animationDuration / 2; // 1.5 seconds (50% of animation)
    
    // Schedule image change to happen at the peak blur
    animationTimeoutRef.current = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      
      // Schedule the end of animation and the next transition
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
        
        // Schedule the next full transition cycle
        transitionTimeoutRef.current = setTimeout(triggerTransition, transitionInterval);
      }, midpointTime); // Second half of animation
      
    }, midpointTime); // First half of animation
  };
  
  useEffect(() => {
    // Start the first transition after initial delay
    if (images.length > 1) {
      transitionTimeoutRef.current = setTimeout(triggerTransition, transitionInterval);
    }
    
    // Cleanup function
    return clearAllTimeouts;
  }, [images.length, transitionInterval]);

  // Calculate dimensions based on size prop
  const containerSize = size + 20; // Add 20px for the border (10px on each side)
  const imageSize = size; // The image itself is slightly smaller to show the border

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
          <img 
            src={images[currentImageIndex]}
            alt={altText}
            className={classes.profileImage}
          />
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfilePicture;