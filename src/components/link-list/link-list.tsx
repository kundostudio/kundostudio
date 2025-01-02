"use client";

import Link from "next/link";

import { Typography } from "~/components/typography";
import ArrowUpRight from "~/public/icons/arrow-up-right.svg";

interface LinkItem {
  label: string;
  href: string;
}

type Props = JSX.IntrinsicElements["div"] & {
  items: LinkItem[];
};

function isExternalLink(href: string) {
  return href.startsWith("http") || href.startsWith("https");
}

function LinkContent({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between py-4">
      <Typography.P className="uppercase text-secondary group-hover:text-foreground transition-colors duration-300">
        {label}
      </Typography.P>
      <div className="w-4 h-4 overflow-hidden relative">
        <ArrowUpRight className="absolute text-secondary group-hover:text-foreground transition-all duration-300 group-hover:translate-x-full group-hover:-translate-y-full" />
        <ArrowUpRight className="absolute text-secondary group-hover:text-foreground transition-all duration-300 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0" />
      </div>
    </div>
  );
}

export function LinkList({ items, className, ...props }: Props) {
  return (
    <div className={className} {...props}>
      {items.map((item) => {
        const isExternal = isExternalLink(item.href);

        if (isExternal) {
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block border-t border-tertiary hover:border-foreground group transition-colors duration-300"
            >
              <LinkContent label={item.label} />
            </a>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href as any}
            className="relative block border-t border-tertiary hover:border-foreground group transition-colors duration-300"
          >
            <LinkContent label={item.label} />
          </Link>
        );
      })}
    </div>
  );
}
