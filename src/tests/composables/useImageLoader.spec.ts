import { describe, it, expect } from 'vitest';
import { useImageLoader } from '@/composables/useImageLoader';

describe('useImageLoader', () => {
  const fallbackImage = 'http://fallback.image/url';

  it('sets the fallback image on error', () => {
    const { handleImageError } = useImageLoader(fallbackImage);
    const event = {
      target: {
        src: '',
      },
    } as unknown as Event;

    handleImageError(event);

    expect((event.target as HTMLImageElement).src).toBe(fallbackImage);
  });

  it('handles non-string fallbackImage gracefully', () => {
    const invalidFallbackImage = null as unknown as string;
    const { handleImageError } = useImageLoader(invalidFallbackImage);
    const event = {
      target: {
        src: '',
      },
    } as unknown as Event;

    handleImageError(event);

    expect((event.target as HTMLImageElement).src).toBe('');
  });
});
