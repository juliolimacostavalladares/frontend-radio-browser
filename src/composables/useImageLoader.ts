export function useImageLoader(fallbackImage: string) {
  const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement;
    target.src = fallbackImage;
  };

  return {
    handleImageError,
  };
}
