export type DialogTypeProps = {
  type?: "dialog";
  title?: string;
  className?: string;
  content: React.ReactNode;
  closeOnClickOutside?: boolean;
  confirmCloseOnClickOutside?: boolean;
};

export type DialogStore = {
  dialogs: Record<string, DialogTypeProps>;
  dialog: DialogTypeProps | {};
  dialogIsOpen: boolean;
  addDialog: (key: string, dialog: DialogTypeProps) => void;
  removeDialog: (key: string) => void;
  setDialogOpen: (key: string, open: boolean) => void;
  setIsOpen: (open: boolean) => void;
};
