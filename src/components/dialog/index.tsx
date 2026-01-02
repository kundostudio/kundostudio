"use client";
import * as RadixDialog from "@radix-ui/react-dialog";

import { useStore } from "~/lib/store";

import { Dialog } from "./dialog";

export type DialogTypeProps = {
  type?: "dialog";
  title?: string;
  className?: string;
  content: React.ReactNode;
  closeOnClickOutside?: boolean;
  confirmCloseOnClickOutside?: boolean;
};

export function DialogProvider() {
  const { closeOnClickOutside, type, ...dialog } = useStore((s) => s.dialog) as DialogTypeProps;
  const dialogIsOpen = useStore((s) => s.dialogIsOpen);
  const setIsOpen = useStore((s) => s.setIsOpen);

  const handleClose = () => {
    if (closeOnClickOutside) {
      setIsOpen(false);
    }
  };

  return (
    <RadixDialog.Root open={dialogIsOpen} onOpenChange={setIsOpen}>
      {dialog && <Dialog onRequestClose={handleClose} {...(dialog as DialogTypeProps)} />}
    </RadixDialog.Root>
  );
}
