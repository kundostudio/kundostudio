import { Typography } from "~/components/typography";
import M from "~/public/social/m.svg";
import O from "~/public/social/o.svg";
import Telegram from "~/public/social/telegram.svg";
import W from "~/public/social/w.svg";
import X from "~/public/social/x.svg";

import { Link } from "../link";

import styles from "./footer.module.scss";

export function Footer() {
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
          <Typography.Span className="opacity-40 tracking-[0.08em] mobile:before:pr-2">
            wallets:
          </Typography.Span>
          <Typography.Span className="tracking-[0.08em]">21,369</Typography.Span>
        </div>
      </div>
      <span className={styles.social}>
        <Link href="#">
          <O className="w-[15.77px] h-auto" />
        </Link>
        <Link href="#">
          <X className="w-[15.77px] h-auto" />
        </Link>
        <Link href="#">
          <Telegram className="w-[15.77px] h-auto" />
        </Link>
        <Link href="#">
          <M className="w-[15.77px] h-auto" />
        </Link>
        <Link href="#">
          <W className="w-[15.77px] h-auto" />
        </Link>
      </span>
    </footer>
  );
}
