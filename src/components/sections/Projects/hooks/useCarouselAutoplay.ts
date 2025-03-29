import { useState, useEffect, useCallback, useRef } from "react";
import { Embla } from "@mantine/carousel";

interface UseCarouselAutoplayOptions {
  delay?: number;
  idleDelay?: number;
  stopOnInteraction?: boolean;
}

export function useCarouselAutoplay(
  embla: Embla | null,
  options: UseCarouselAutoplayOptions = {}
) {
  const {
    delay = 5000, // Auto rotate every 15 seconds by default
    idleDelay = 10000, // Reset user interaction after 30 seconds of inactivity
    stopOnInteraction = true, // Stop autoplay on user interaction
  } = options;

  const [userInteracted, setUserInteracted] = useState(false);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const autoplayIntervalRef = useRef<number | null>(null);
  const userIdleTimeoutRef = useRef<number | null>(null);

  // Function to stop autoplay
  const stopAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
    setAutoplayActive(false);
  }, []);

  // Function to start autoplay
  const startAutoplay = useCallback(() => {
    if (!embla) return;

    // Stop any existing interval
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }

    // Start new interval
    autoplayIntervalRef.current = window.setInterval(() => {
      if (!stopOnInteraction || !userInteracted) {
        embla.scrollNext();
      }
    }, delay);

    setAutoplayActive(true);
  }, [embla, userInteracted, delay, stopOnInteraction]);

  // Reset user interaction after idle time
  const resetUserInteraction = useCallback(() => {
    if (userIdleTimeoutRef.current) {
      clearTimeout(userIdleTimeoutRef.current);
    }

    if (userInteracted) {
      userIdleTimeoutRef.current = window.setTimeout(() => {
        setUserInteracted(false);
      }, idleDelay);
    }
  }, [userInteracted, idleDelay]);

  // Handle user interaction
  const handleUserInteraction = useCallback(() => {
    setUserInteracted(true);
    resetUserInteraction();
  }, [resetUserInteraction]);

  // Initialize and clean up autoplay
  useEffect(() => {
    if (autoplayActive) {
      startAutoplay();
    }

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
      if (userIdleTimeoutRef.current) {
        clearTimeout(userIdleTimeoutRef.current);
      }
    };
  }, [embla, startAutoplay, autoplayActive]);

  // Restart autoplay when user interaction state changes
  useEffect(() => {
    if (!userInteracted && embla && autoplayActive) {
      startAutoplay();
    }
  }, [userInteracted, embla, startAutoplay, autoplayActive]);

  // Effect for user interaction reset
  useEffect(() => {
    resetUserInteraction();
    return () => {
      if (userIdleTimeoutRef.current) {
        clearTimeout(userIdleTimeoutRef.current);
      }
    };
  }, [userInteracted, resetUserInteraction]);

  // Handle embla events
  useEffect(() => {
    if (!embla) return;

    // When user manually navigates, consider it an interaction
    const onSelect = () => handleUserInteraction();

    embla.on("select", onSelect);

    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, handleUserInteraction]);

  return {
    handleUserInteraction,
    startAutoplay,
    stopAutoplay,
    isAutoplayRunning: autoplayActive && !userInteracted,
  };
}

export default useCarouselAutoplay;
