import { useMediaQuery } from "@studio-freight/hamo";

import { Button, Props as ButtonProps } from "~/components/button";
import { cn } from "~/lib/utils";

import styles from "./connect-wallet.module.scss";

type Label = {
  text: string;
  type?: string;
};

type ConnectButtonProps = ButtonProps & { icon; index?: number; labels?: Label[] };

const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.15 },
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
      delay: i * 0.1,
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.15 },
  },
};

export function ConnectButton({
  children,
  icon: Icon,
  className,
  index = 0,
  labels,
  ...props
}: ConnectButtonProps) {
  const isMobile = useMediaQuery("(max-width: 639px)");
  return (
    <Button
      variant="highlight"
      className={cn(styles.button, className)}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={buttonVariants}
      custom={index}
      {...props}
    >
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </div>
      <span className={styles.buttonText}>{children}</span>
      {!isMobile && labels && labels.length > 0 && (
        <div className={styles.labels}>
          {labels.map((label, index) => (
            <span
              key={index}
              className={cn(styles.label, label.type === "inverted" && styles.inverted)}
            >
              {label.text}
            </span>
          ))}
        </div>
      )}
    </Button>
  );
}
