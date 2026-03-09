import React, { useState, useEffect, useMemo } from 'react';
import classes from './AnimatedCounter.module.css';

interface AnimatedCounterProps {
  start: number;
  end: number;
  duration: number;
  suffix?: string;
  onComplete?: () => void;
  className?: string;
}

// Max particles at the final value
const MAX_PARTICLES = 16;
// Min particles at the first value
const MIN_PARTICLES = 4;

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  start,
  end,
  duration,
  suffix = '',
  onComplete,
  className,
}) => {
  const [count, setCount] = useState(start);
  const [burstKey, setBurstKey] = useState(0);
  const [done, setDone] = useState(false);

  const range = end - start;

  // Progress from 0 to 1 based on current count
  const progress = range > 0 ? (count - start) / range : 1;

  // Number of particles scales with progress
  const particleCount = Math.round(MIN_PARTICLES + (MAX_PARTICLES - MIN_PARTICLES) * progress);

  // Scale grows from 0.6 to 1.0 as counter progresses
  const scale = 0.6 + 0.4 * progress;

  // Pre-compute particle config so we don't recalculate every render
  const particleElements = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const angle = (360 / particleCount) * i;
      const dist = 25 + Math.random() * 30;
      const size = 3 + Math.random() * 4;
      const delay = Math.random() * 60;
      return (
        <span
          key={i}
          className={classes.particle}
          style={{
            '--angle': `${angle}deg`,
            '--dist': `${dist}px`,
            '--size': `${size}px`,
            animationDelay: `${delay}ms`,
          } as React.CSSProperties}
        />
      );
    });
  }, [burstKey, particleCount]);

  // Animate the counter value
  useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;
    let lastValue = start;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const p = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(p * (end - start) + start);

      if (currentValue !== lastValue) {
        lastValue = currentValue;
        setCount(currentValue);
        // Remount particle container to restart CSS animations
        setBurstKey((k) => k + 1);
      }

      if (p < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDone(true);
        onComplete?.();
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [start, end, duration, onComplete]);

  return (
    <div className={`${classes.counterContainer} ${className || ''}`}>
      <div
        className={`${classes.counterValue} ${done ? classes.popFinal : classes.bump}`}
        key={`val-${burstKey}`}
        style={{ '--base-scale': scale } as React.CSSProperties}
      >
        {count}{suffix}
      </div>

      <div key={burstKey} className={classes.particles} aria-hidden>
        {particleElements}
      </div>
    </div>
  );
};

export default AnimatedCounter;
