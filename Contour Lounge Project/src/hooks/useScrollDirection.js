import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to detect scroll direction.
 * Uses requestAnimationFrame throttling for performance.
 * Returns 'up' or 'down'.
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [prevScrollY, setPrevScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const direction = currentScrollY > prevScrollY ? 'down' : 'up';
    
    if (direction !== scrollDirection && Math.abs(currentScrollY - prevScrollY) > 10) {
      setScrollDirection(direction);
    }
    setPrevScrollY(currentScrollY);
  }, [scrollDirection, prevScrollY]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  return scrollDirection;
}
