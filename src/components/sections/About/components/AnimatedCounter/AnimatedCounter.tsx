import React, { useState, useEffect, useRef } from 'react';
import classes from './AnimatedCounter.module.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speed: number;
  angle: number;
  opacity: number;
}

interface AnimatedCounterProps {
  start: number;
  end: number;
  duration: number;
  suffix?: string;
  onComplete?: () => void;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  start,
  end,
  duration,
  suffix = '',
  onComplete,
  className,
}) => {
  const [count, setCount] = useState(start);
  const [scale, setScale] = useState(1);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const lastValue = useRef(start);
  const particleIdCounter = useRef(0);

  // Generate random color from a set of vibrant colors
  const getRandomColor = () => {
    const colors = [
      '#4299e1', // blue
      '#3182ce', // blue darker
      '#2b6cb0', // blue even darker
      '#63b3ed', // blue lighter
      '#ebf8ff', // blue lightest
      '#90cdf4', // another blue
      '#4fd1c5', // teal
      '#38b2ac', // teal darker
      '#f6ad55', // orange
      '#f6e05e', // yellow
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Create particles when counter changes
  const createParticles = (newValue: number) => {
    if (!counterRef.current || newValue === lastValue.current) return;
    
    const rect = counterRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const newParticles: Particle[] = [];
    
    // Number of particles to create - more particles for higher numbers
    const particleCount = 5 + Math.min(20, Math.floor(newValue * 3));
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: particleIdCounter.current++,
        x: centerX,
        y: centerY,
        color: getRandomColor() ?? "red",
        size: 5 + Math.random() * 5,
        speed: 1 + Math.random() * 3,
        angle: Math.random() * Math.PI * 2,
        opacity: 1
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    lastValue.current = newValue;
    
    // Trigger the scaling effect
    // Add a level-up effect with a bigger scale for the final value
    if (newValue === end) {
      setScale(1.5);
      setTimeout(() => {
        setScale(1.2);
        setTimeout(() => setScale(1), 200);
      }, 300);
    } else {
      setScale(1 + Math.min(0.4, newValue * 0.05));
      setTimeout(() => setScale(1), 250);
    }
  };

  // Animate the particles
  useEffect(() => {
    if (particles.length === 0) return;
    
    const animationFrame = requestAnimationFrame(() => {
      setParticles(prevParticles => {
        if (prevParticles.length === 0) return prevParticles;
        
        return prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + Math.cos(particle.angle) * particle.speed,
            y: particle.y + Math.sin(particle.angle) * particle.speed,
            opacity: particle.opacity - 0.02,
            size: Math.max(0.1, particle.size - 0.1)
          }))
          .filter(particle => particle.opacity > 0);
      });
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [particles]);

  // Animate the counter
  useEffect(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    let startTimestamp: number | null = null;
    let animationFrameId: number;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      
      setCount(currentValue);
      
      if (currentValue !== lastValue.current) {
        createParticles(currentValue);
      }
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setIsAnimating(false);
        if (onComplete) onComplete();
      }
    };
    
    animationFrameId = requestAnimationFrame(step);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      setIsAnimating(false);
    };
  }, [start, end, duration, onComplete]);

  return (
    <div ref={counterRef} className={`${classes.counterContainer} ${className || ''}`}>
      <div 
        className={classes.counterValue} 
        style={{ transform: `scale(${scale})` }}
      >
        {count}{suffix}
      </div>
      
      {particles.map(particle => (
        <div
          key={particle.id}
          className={classes.particle}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedCounter;