"use client";

import { motion } from "motion/react";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Typography } from "../typography";

interface ItemProps {
  href: string;
  label: string;
}

export function Item({ href, label }: ItemProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.includes(href);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href as Route}
      className="relative flex items-center gap-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        key={isHovered ? "hovered" : isActive ? "active" : "inactive"}
        className="w-[6px] h-[12px] bg-primary"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered || isActive ? [1, 0.2, 1, 0.2, 1, 0.2, 1] : 0,
          transition: isActive ? {
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3,
            times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
            ease: "easeInOut"
          } : isHovered ? {
            duration: 0.6,
            repeat: Infinity,
            times: [0, 0.2, 0.3, 0.5, 0.6, 0.8, 1],
            ease: "linear"
          } : {
            duration: 0,
          }
        }}
      />
      <Typography.P className="uppercase">{label}</Typography.P>
    </Link>
  );
}