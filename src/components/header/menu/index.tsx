import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { Button } from "~/components/button";

import styles from "./menu.module.scss";

type Props = {
  isOpen: boolean;
  onItemClick: () => void;
};

const LINKS = [
  { label: "home", href: "/" },
  { label: "leaderboard", href: "/leaderboard" },
  { label: "stake", href: "/stake" },
];

function MenuItem({ item, active, onItemClick }) {
  return (
    <Button
      variant={active ? "highlight" : "subtle"}
      href={item.href}
      onClick={onItemClick}
      className={styles.button}
    >
      {item.label}
    </Button>
  );
}

export function Menu({ isOpen, onItemClick }: Props) {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={styles.menuWrapper}
        >
          <nav className={styles.nav}>
            <ul>
              {LINKS.map((item) => (
                <MenuItem
                  key={item.label}
                  item={item}
                  onItemClick={onItemClick}
                  active={pathname === item.href}
                />
              ))}
            </ul>
          </nav>
          <div className={styles.social}>
            <Button variant="highlight" href="https://www.zero.tech" className={styles.socialLink}>
              link
            </Button>
            <Button
              variant="highlight"
              href="https://twitter.com/meow_cabal"
              className={styles.socialLink}
            >
              link
            </Button>
            <Button
              variant="highlight"
              href="https://telegram.me/meowchainofficial"
              className={styles.socialLink}
            >
              link
            </Button>
            {/* <Button variant="highlight" href="#" className={styles.socialLink}>
              <span className={styles.socialLogoWrapper}>
                <M className="w-8 h-8" />
              </span>
            </Button>
            <Button variant="highlight" href="#" className={styles.socialLink}>
              <span className={styles.socialLogoWrapper}>
                <W className="w-8 h-8" />
              </span>
            </Button> */}
          </div>
          <div className={styles.footerText}>
            <span className={styles.privacy}>
              privacy policy <span className="opacity-30">{"//"}</span> terms of use
            </span>
            <span className={styles.copyright}>© copyright 2024 meow.inc</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
