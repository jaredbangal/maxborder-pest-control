import { useEffect } from 'react';

/**
 * Minimal per-route document metadata. Keeps titles and descriptions accurate
 * for sharing and for screen readers announcing page changes.
 */
export const Meta = ({ title, description }: { title: string; description?: string }) => {
  useEffect(() => {
    document.title = `${title} | Maxborder Pest Control`;

    if (!description) return;
    const tag = document.querySelector('meta[name="description"]');
    const previous = tag?.getAttribute('content') ?? null;
    tag?.setAttribute('content', description);

    return () => {
      if (previous !== null) tag?.setAttribute('content', previous);
    };
  }, [title, description]);

  return null;
};
