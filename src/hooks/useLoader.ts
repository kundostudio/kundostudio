import { useContext } from "react";

import { LoaderContext } from "~/components/loader-manager";

export const useLoader = () => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader must be used within a LoaderManager");
  }

  return context;
};
