import * as RadixDialog from "@radix-ui/react-dialog";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useMemo } from "react";

import { useStore } from "~/lib/store";
import AllIcon from "~/public/wallets/all.svg";
import BraveIcon from "~/public/wallets/brave.svg";
import CoinbaseIcon from "~/public/wallets/coinbase.svg";
import WalletConnectIcon from "~/public/wallets/wallet.svg";

import { ConnectButton } from "./connect-button";
import styles from "./connect-wallet.module.scss";

export function ConnectWallet({ onConnected }) {
  const theme = useStore((s) => s.theme);

  // I need to import Metamask icon this way since its the only one that
  // has various colors in the .svg so we can't use themeColors like --current-color
  const MetamaskIcon = useMemo(() => {
    const variant = theme.name;
    return lazy(() => import(`~/public/wallets/metamask-${variant}.svg`));
  }, [theme.name]);

  const buttons = [
    { icon: MetamaskIcon, text: "metamask" },
    {
      icon: WalletConnectIcon,
      text: "walletconnect",
      labels: [{ text: "qr code", type: "inverted" }],
    },
    { icon: BraveIcon, text: "brave", labels: [{ text: "installed" }] },
    { icon: CoinbaseIcon, text: "coinbase" },
    { icon: AllIcon, text: "all wallets", labels: [{ text: "440+" }] },
  ];

  return (
    <div className={styles.wrapper}>
      <RadixDialog.Title className={styles.title}>connect wallet</RadixDialog.Title>
      <div className={styles.buttons}>
        <Suspense fallback={null}>
          <AnimatePresence mode="popLayout" key={theme.name}>
            {buttons.map((button, index) => (
              <ConnectButton
                key={`${button.text}-${theme.name}`}
                icon={button.icon}
                onClick={onConnected}
                index={index}
                labels={button.labels}
              >
                {button.text}
              </ConnectButton>
            ))}
          </AnimatePresence>
        </Suspense>
      </div>
    </div>
  );
}
