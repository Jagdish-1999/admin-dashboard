import { useState, useEffect } from "react";

export const useImagePreloader = (initialUrl: string) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const preloadImage = (url: string) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setImageSrc(url);
        setIsLoading(false);
      };
      img.onerror = (err) => {
        console.error("Failed to load image", err, "initialUrl", initialUrl);
        setIsLoading(false);
      };
    };

    if (!imageSrc && initialUrl) {
      preloadImage(initialUrl);
    }
  }, [initialUrl, imageSrc, isLoading]);

  return { imageSrc, isLoading };
};
