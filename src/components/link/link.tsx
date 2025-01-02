"use client";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";

import { cn } from "~/lib/utils";
import ArrowUpRight from "~/public/icons/arrow-up-right.svg";

type Props = React.HTMLProps<HTMLAnchorElement> &
  NextLinkProps<string> & {
    showIcon?: boolean;
  };

export function Link({ children, href, className, ...props }: Props) {
  const isExternal = href?.toString().startsWith("http") || href?.toString().startsWith("mailto:");
  const Component = isExternal ? "a" : NextLink;

  return (
    <Component
      href={href}
      className={cn("group relative inline-flex items-center", className)}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    >
      <span className="relative">
        {children}
        <span className="absolute inset-x-0 bottom-[2px] h-[2px] overflow-hidden">
          <span className="absolute inset-0 bg-primary transition-all duration-500 group-hover:translate-x-[calc(100%+50px)]" />
          <span className="absolute inset-0 bg-primary transition-all duration-500 -translate-x-[calc(100%+200px)] group-hover:translate-x-0" />
        </span>
      </span>
      {isExternal && (
        <div className="w-6 h-6 overflow-hidden relative">
          <ArrowUpRight className="absolute text-foreground transition-all duration-300 group-hover:translate-x-full group-hover:-translate-y-full" />
          <ArrowUpRight className="absolute text-foreground transition-all duration-300 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0" />
        </div>
      )}
    </Component>
  );
}
