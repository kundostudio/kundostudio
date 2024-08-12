"use client";

import { Suspense, useEffect, useLayoutEffect } from "react";

import { useLoader } from "~/hooks/useLoader";

function ReportSceneReady({ assetName }: { assetName: string }) {
  const { setAssetLoaded } = useLoader();

  useEffect(() => {
    setAssetLoaded(assetName);
  }, [setAssetLoaded, assetName]);

  return null;
}

export function Scene({ children }: { children: React.ReactNode }) {
  const { registerAsset } = useLoader();
  const assetName = "scene";

  useLayoutEffect(() => {
    registerAsset(assetName);
  }, [registerAsset, assetName]);

  return (
    <Suspense fallback={null}>
      {children}
      {/* this will report as soon as the scene finishes loading */}
      <ReportSceneReady assetName={assetName} />
    </Suspense>
  );
}
