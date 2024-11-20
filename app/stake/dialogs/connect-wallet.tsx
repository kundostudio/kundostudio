import * as RadixDialog from "@radix-ui/react-dialog";

import { Button } from "~/components/button";

import styles from "./connect-wallet.module.scss";

export function ConnectWallet({}) {
  return (
    <div className={styles.wrapper}>
      <RadixDialog.Close className={styles.closeButton}>
        <div className={styles.outline} />
        <span className="sr-only">Close</span>
      </RadixDialog.Close>
      <RadixDialog.Title className={styles.title}>connect wallet</RadixDialog.Title>
      <div className={styles.buttons}>
        <Button variant="highlight" className={styles.button}>
          metamask
        </Button>
        <Button variant="highlight" className={styles.button}>
          walletconnect
        </Button>
        <Button variant="highlight" className={styles.button}>
          brave wallet
        </Button>
        <Button variant="highlight" className={styles.button}>
          coinbase
        </Button>
        <Button variant="highlight" className={styles.button}>
          all wallets
        </Button>
      </div>
    </div>
  );
}
