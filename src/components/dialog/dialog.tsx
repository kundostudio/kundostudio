import * as RadixDialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { forwardRef } from "react";

import { cn } from "~/lib/utils";

import styles from "./dialog.module.scss";

import { DialogTypeProps } from ".";

type Props = {
  onRequestClose: () => void;
  confirmCloseOnClickOutside?: boolean;
} & DialogTypeProps;

const DialogOverlay = forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className, ...props }, ref) => (
  <RadixDialog.Overlay ref={ref} className={cn(styles.overlay, className)} {...props} />
));
DialogOverlay.displayName = RadixDialog.Overlay.displayName;

export function Dialog({
  title,
  content,
  className,
  onRequestClose,
  confirmCloseOnClickOutside = false,
}: Props) {
  const handleClose = () => {
    if (confirmCloseOnClickOutside) {
      if (window.confirm("Are you sure you want to close? Any unsaved changes will be lost.")) {
        onRequestClose();
      }
    } else {
      onRequestClose();
    }
  };
  return (
    <RadixDialog.Portal>
      <DialogOverlay onClick={onRequestClose} className={styles.overlay} />
      <RadixDialog.Content
        className={clsx(styles.dialogWrapper, className)}
        onPointerDownOutside={(e) => {
          e.preventDefault();
          handleClose();
        }}
      >
        {title && <span className={styles.title}>{title}</span>}
        {content}
        <div className={styles.dialogBorder} />
        <div className={styles.dialogBorder} />
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}
