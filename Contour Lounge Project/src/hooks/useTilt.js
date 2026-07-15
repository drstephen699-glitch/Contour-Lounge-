import { useRef, useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for 3D tilt effect on equipment cards.
 * Calculates rotateX/rotateY from mouse position relative to element center.
 * Uses requestAnimationFrame for smooth updates.
 * Disabled when prefers-reduced-motion: reduce is active.
 * 
 * @param {number} maxTilt - Maximum tilt angle in degrees (default: 10)
 * @returns {{ ref, style, onMouseMove, onMouseLeave }}
 */
export function useTilt(maxTilt = 10) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.1s ease-out',
  });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const onMouseMove = useCallback((e) => {
    if (isReducedMotion || !ref.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate offset from center (-1 to 1)
      const offsetX = (e.clientX - centerX) / (rect.width / 2);
      const offsetY = (e.clientY - centerY) / (rect.height / 2);

      // Clamp values
      const clampedX = Math.max(-1, Math.min(1, offsetX));
      const clampedY = Math.max(-1, Math.min(1, offsetY));

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${-clampedY * maxTilt}deg) rotateY(${clampedX * maxTilt}deg)`,
        transition: 'transform 0.1s ease-out',
      });
    });
  }, [isReducedMotion, maxTilt]);

  const onMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.4s ease-out',
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return {
    ref,
    style: isReducedMotion ? {} : tiltStyle,
    onMouseMove: isReducedMotion ? undefined : onMouseMove,
    onMouseLeave: isReducedMotion ? undefined : onMouseLeave,
  };
}
