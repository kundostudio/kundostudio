import { useQuery } from "@tanstack/react-query";

import { Typography } from "~/components/typography";
import { fetcher } from "~/lib/fetcher";
// import M from "~/public/social/m.svg";
import Telegram from "~/public/social/telegram.svg";
import Zero from "~/public/social/zero.svg";
// import W from "~/public/social/w.svg";
import X from "~/public/social/x.svg";
import { UserInfoResponse } from "~/types";

import { Link } from "../link";

import styles from "./footer.module.scss";

export function Footer() {
  const { data: userInfo } = useQuery<UserInfoResponse>({
    queryKey: ["user-info"],
    queryFn: () => fetcher("/api/info"),
    refetchInterval: 60000,
  });

  return (
    <footer className={styles.wrapper}>
      <div className={styles.poweredBy}>
        <Typography.Span className="opacity-40 tracking-[0.08em]">powered by: </Typography.Span>
        <Typography.Span className="tracking-[0.08em] pl-2">
          Zero <span className="opacity-40 tracking-[0.08em]">x</span> Z Chain{" "}
          <span className="opacity-40 tracking-[0.08em]">x</span> Polygon ZKVM
        </Typography.Span>
      </div>
      <div className={styles.prices}>
        <div className="flex items-center gap-2">
          <Typography.Span className="opacity-40 tracking-[0.08em]">wallets:</Typography.Span>
          <Typography.Span className="tracking-[0.08em]">
            {userInfo?.totalWallets.toLocaleString() ?? "..."}
          </Typography.Span>
        </div>
      </div>

      <span className={styles.social}>
        <Link href="https://www.zero.tech">
          <Zero className="w-[15.77px] h-auto" />
        </Link>
        <Link href="https://twitter.com/meow_cabal">
          <X className="w-[15.77px] h-auto" />
        </Link>
        <Link href="https://telegram.me/meowchainofficial">
          <Telegram className="w-[15.77px] h-auto" />
        </Link>
        {/* <Link href="#">
          <M className="w-[15.77px] h-auto" />
        </Link>
        <Link href="#">
          <W className="w-[15.77px] h-auto" />
        </Link> */}
      </span>
    </footer>
  );
}
