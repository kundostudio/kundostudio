"use client";

import type { PortableTextReactComponents } from "@portabletext/react";
import { PortableText as SanityPortableText } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import NextImage from "next/image";

import { Link } from "~/components/link";
import * as Typography from "~/components/typography";
import { cn } from "~/lib/utils";

type PortableTextClassNames = {
  marks?: {
    link?: string;
  };
  types?: {
    image?: {
      figure?: string;
      wrapper?: string;
      img?: string;
      figcaption?: string;
    };
  };
  block?: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    normal?: string;
    blockquote?: string;
    blockquoteP?: string;
  };
  list?: {
    bullet?: string;
    number?: string;
  };
  listItem?: {
    bullet?: string;
    number?: string;
  };
};

function createPortableTextComponents(classes?: PortableTextClassNames): Partial<PortableTextReactComponents> {
  return {
    marks: {
      link: ({ value, children }) => {
        const { href, blank } = value || {};
        return (
          <Link
            href={href || "#"}
            target={blank ? "_blank" : undefined}
            showIcon={blank}
            className={cn("text-primary", classes?.marks?.link)}
          >
            {children}
          </Link>
        );
      },
    },
    types: {
      image: ({ value }) => {
        if (!value?.asset?.url) {
          return null;
        }
        const { alt, caption } = value;
        return (
          <figure className={cn("my-8", classes?.types?.image?.figure)}>
            <div className={cn("relative w-full aspect-video", classes?.types?.image?.wrapper)}>
              <NextImage src={value.asset.url} alt={alt || ""} fill className={cn("object-cover", classes?.types?.image?.img)} />
            </div>
            {caption && (
              <figcaption className={cn("mt-2 text-sm text-secondary", classes?.types?.image?.figcaption)}>
                {caption}
              </figcaption>
            )}
          </figure>
        );
      },
    },
    block: {
      h1: ({ children }) => <Typography.H1 className={classes?.block?.h1}>{children}</Typography.H1>,
      h2: ({ children }) => <Typography.H2 className={classes?.block?.h2}>{children}</Typography.H2>,
      h3: ({ children }) => <Typography.H3 className={classes?.block?.h3}>{children}</Typography.H3>,
      h4: ({ children }) => <Typography.H4 className={classes?.block?.h4}>{children}</Typography.H4>,
      normal: ({ children }) => <Typography.P className={cn("mb-4", classes?.block?.normal)}>{children}</Typography.P>,
      blockquote: ({ children }) => (
        <blockquote className={cn("pl-4 border-l-2 border-primary italic my-6", classes?.block?.blockquote)}>
          <Typography.P className={classes?.block?.blockquoteP}>{children}</Typography.P>
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className={cn("list-disc pl-6 mb-6", classes?.list?.bullet)}>{children}</ul>,
      number: ({ children }) => <ol className={cn("list-decimal pl-6 mb-6", classes?.list?.number)}>{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li className={cn("mb-1", classes?.listItem?.bullet)}>{children}</li>,
      number: ({ children }) => <li className={cn("mb-1", classes?.listItem?.number)}>{children}</li>,
    },
  };
}

interface PortableTextProps {
  value: TypedObject | TypedObject[];
  className?: string; // wrapper className (not applied to inner nodes)
  classes?: PortableTextClassNames; // per-component classNames
}

export function PortableText({ value, classes }: PortableTextProps) {
  if (!value) {
    return null;
  }

  return <SanityPortableText value={value} components={createPortableTextComponents(classes)} />;
}
