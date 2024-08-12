"use client";

import { createContext, useCallback, useEffect, useState } from "react";

import { useImagesLoader } from "~/hooks/useImagesLoader";

import { LoaderUI } from "../loader-ui";

type LoaderContextType = {
  loaded: boolean;
  registerAsset: (assetId: string) => void;
  setAssetLoaded: (assetId: string) => void;
};

export const LoaderContext = createContext<LoaderContextType>({
  loaded: false,
  registerAsset: (assetId: string) => {},
  setAssetLoaded: (assetId: string) => {},
});

export function LoaderManager({ children }) {
  const [loadingList, setLoadingList] = useState<Map<string, boolean>>(new Map());
  const [loaded, setLoaded] = useState(false);

  const imagesLoaded = useImagesLoader();

  const registerAsset = useCallback((assetId: string) => {
    setLoadingList((prevList) => {
      if (!prevList.has(assetId)) {
        const newList = new Map(prevList);
        newList.set(assetId, false);
        return newList;
      }
      return prevList;
    });
  }, []);

  const setAssetLoaded = useCallback((assetId: string) => {
    setLoadingList((prevList) => {
      const newList = new Map(prevList);
      newList.set(assetId, true);
      return newList;
    });
  }, []);

  useEffect(() => {
    const allAssetsLoaded = Array.from(loadingList.values()).every((loaded) => loaded);

    if (allAssetsLoaded && loadingList.size > 0 && imagesLoaded) {
      setLoaded(true);
    }
  }, [loadingList, imagesLoaded]);

  return (
    <LoaderContext.Provider value={{ loaded, registerAsset, setAssetLoaded }}>
      <LoaderUI loaded={loaded} />
      {children}
    </LoaderContext.Provider>
  );
}
