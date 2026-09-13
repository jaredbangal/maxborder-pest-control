import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll on navigation. A link with a hash (/#fall-specials) scrolls to
 * that section instead, since client-side navigation won't do it on its own.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }
    // Wait a frame so the new route has rendered the target.
    const frame = requestAnimationFrame(() =>
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    );
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
};
