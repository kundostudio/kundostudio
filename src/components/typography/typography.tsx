import type { JSX } from "react";

import { cn } from "~/lib/utils";

function H1({ className, ...props }: JSX.IntrinsicElements["h1"]) {
  return (
    <h1
      className={cn(
        "font-sans text-[96px] leading-[96px] font-medium tracking-[0em] ml-[-0.07em]",
        className
      )}
      {...props}
    />
  );
}

function H2({ className, ...props }: JSX.IntrinsicElements["h2"]) {
  return (
    <h2
      className={cn(
        "font-sans text-[36px] leading-[40px] font-medium tracking-[-0.02em]",
        className
      )}
      {...props}
    />
  );
}

function H3({ className, ...props }: JSX.IntrinsicElements["h3"]) {
  return (
    <h3
      className={cn(
        "font-sans text-[26px] leading-[34px] font-medium tracking-[-0.02em]",
        className
      )}
      {...props}
    />
  );
}

function H4({ className, ...props }: JSX.IntrinsicElements["h4"]) {
  return (
    <h4
      className={cn(
        "font-sans text-[22px] leading-[30px] font-medium tracking-[-0.02em]",
        className
      )}
      {...props}
    />
  );
}

function P({ className, ...props }: JSX.IntrinsicElements["p"]) {
  return (
    <p
      className={cn("font-mono text-[12px] leading-[16px] font-normal tracking-[0em]", className)}
      {...props}
    />
  );
}

export const Typography = {
  H1,
  H2,
  H3,
  H4,
  P,
};
