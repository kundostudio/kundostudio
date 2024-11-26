import * as RadixDialog from "@radix-ui/react-dialog";
import { useMediaQuery } from "@studio-freight/hamo";
import { useEffect, useState } from "react";

import { ConnectWallet } from "~/dialogs/connect-wallet";
import { Stake } from "~/dialogs/stake";
import { StakeSuccess } from "~/dialogs/stake-success";
import { useSound } from "~/hooks/useSound";
// @ts-ignore
import dialogSound from "~/public/sounds/menu-open.mp3";

import styles from "./stake-dialog.module.scss";

export function StakeDialog({}) {
  const [stage, setStage] = useState<keyof typeof STAGES>("connect-wallet");
  const [playOpenSound] = useSound(dialogSound);

  const [apr, setApr] = useState(10.16);
  const [tvl, setTvl] = useState(0.21);
  const [max, setMax] = useState(689.75);

  const [coin, setCoin] = useState<"wild" | "meow">("wild");
  const [amount, setAmount] = useState("");

  const isMobile = useMediaQuery("(max-width: 639px)");

  const handleConnectWalletSuccess = () => {
    setStage("stake");
  };

  const handleStakeSuccess = (c, a) => {
    setCoin(c);
    setAmount(a);
    setStage("stake-success");
  };

  const STAGES = {
    "connect-wallet": {
      key: "/01",
      component: <ConnectWallet onConnected={() => handleConnectWalletSuccess()} />,
    },
    stake: {
      key: "/02",
      component: (
        <Stake apr={apr} tvl={tvl} max={max} onSuccess={(c, a) => handleStakeSuccess(c, a)} />
      ),
    },
    "stake-success": {
      key: "/03",
      component: <StakeSuccess coin={coin} amount={Number(amount)} />,
    },
  };

  const key = STAGES[stage].key;
  const stageComponent = STAGES[stage].component;

  useEffect(() => {
    playOpenSound();
  }, [stage, playOpenSound]);

  return (
    <div
      className={styles.wrapper}
      style={{
        padding: stage === "connect-wallet" ? (isMobile ? 8 : 24) : 0,
      }}
    >
      <div
        className={styles.content}
        style={{
          borderColor: stage === "connect-wallet" ? "var(--current-shadow)" : "transparent",
        }}
      >
        {!isMobile && <span className={styles.key}>{key}</span>}
        {stage !== "stake-success" && (
          <RadixDialog.Close className={styles.closeButton}>
            <div className={styles.outline} />
            <span className="sr-only">Close</span>
          </RadixDialog.Close>
        )}
        {stageComponent}
      </div>
    </div>
  );
}
