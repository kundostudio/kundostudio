"use client";

import { useEffect, useState } from "react";

export const useImagesLoader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const images = document.querySelectorAll("img");

    if (!images || images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    const totalAssets = images.length;
    let loadedAssets = 0;

    const checkAllAssetsLoaded = () => {
      loadedAssets += 1;

      if (loadedAssets === totalAssets) {
        setImagesLoaded(true);
      }
    };

    images.forEach((img) => {
      img.loading = "eager";

      if ((img as HTMLImageElement).complete) {
        checkAllAssetsLoaded();
      } else {
        img.addEventListener("load", checkAllAssetsLoaded);
        img.addEventListener("error", checkAllAssetsLoaded);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", checkAllAssetsLoaded);
        img.removeEventListener("error", checkAllAssetsLoaded);
      });
    };
  }, []);

  return imagesLoaded;
};
