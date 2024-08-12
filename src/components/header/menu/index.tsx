import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { cn } from "~/lib/utils";

import styles from "./menu.module.scss";

type Props = {
  isOpen: boolean;
};

const LINKS = [
  { label: "join airdrop", href: "/join" },
  { label: "chain", href: "/chain" },
  { label: "airdrop", href: "/airdrop" },
  { label: "leaderboard", href: "/leaderboard" },
];

function MenuItem({ item }) {
  return (
    <motion.li className={styles.menuItem}>
      <Link href={item.href} className={styles.link}>
        <span className={styles.text}>{item.label}</span>
      </Link>
    </motion.li>
  );
}

export function Menu({ isOpen }: Props) {
  const [itemsOpen, setItemsOpen] = useState(0);

  const handleItemToogle = (open) => {
    if (open) {
      setItemsOpen(itemsOpen + 1);
    } else {
      setItemsOpen(itemsOpen - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={styles.wrapper}
        >
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: itemsOpen > 0 ? 1 : 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          />
          <nav className={styles.nav}>
            <ul>
              {LINKS.map((item) => (
                <MenuItem key={item.label} item={item} />
              ))}
            </ul>
          </nav>
          <span className={cn(styles.copyright, itemsOpen > 0 ? styles.addBorder : "")}>
            © 2024 meow
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
