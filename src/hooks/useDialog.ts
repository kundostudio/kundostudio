import { useEffect } from "react";

import { useStore } from "~/lib/store";
import { DialogTypeProps } from "~/types";

const defaultDialog: DialogTypeProps = {
  type: "dialog",
  content: null,
  closeOnClickOutside: true,
  confirmCloseOnClickOutside: false,
};

export function useDialog(
  key: string,
  dialogProps: DialogTypeProps = {
    type: "dialog",
    content: null,
    closeOnClickOutside: true,
    confirmCloseOnClickOutside: false,
  }
) {
  const { addDialog, removeDialog, setDialogOpen } = useStore.getState();

  useEffect(() => {
    const dialog = { ...defaultDialog, ...dialogProps };
    addDialog(key, dialog);

    return () => {
      removeDialog(key);
    };
  }, [addDialog, dialogProps, key, removeDialog]);

  return {
    setDialogOpen: (isOpen: boolean) => setDialogOpen(key, isOpen),
  };
}
