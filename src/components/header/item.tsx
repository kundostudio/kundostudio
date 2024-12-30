"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Typography } from "../typography";

interface ItemProps {
  href: string;
  label: string;
}

export function Item({ href, label }: ItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href as Route} className="relative flex items-center gap-1">
      <div
        className={`w-[6px] h-[12px] bg-primary transition-opacity ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
      <Typography.P className="uppercase">{label}</Typography.P>
    </Link>
  );
}
