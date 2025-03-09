"use client";

import type { PortableTextReactComponents } from "@portabletext/react";
import { PortableText as SanityPortableText } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import NextImage from "next/image";

import { Link } from "~/components/link";
import { Typography } from "~/components/typography";

// Configure the PortableText components
const portableTextComponents: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ value, children }) => {
      const { href, blank } = value || {};
      return (
        <Link href={href || "#"} target={blank ? "_blank" : undefined} showIcon={blank} className="text-primary">
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
        <figure className="my-8">
          <div className="relative w-full aspect-video">
            <NextImage
              src={value.asset.url}
              alt={alt || ""}
              fill
              className="object-cover"
            />
          </div>
          {caption && (
            <figcaption className="mt-2 text-sm text-secondary">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => <Typography.H1>{children}</Typography.H1>,
    h2: ({ children }) => <Typography.H2>{children}</Typography.H2>,
    h3: ({ children }) => <Typography.H3>{children}</Typography.H3>,
    h4: ({ children }) => <Typography.H4>{children}</Typography.H4>,
    normal: ({ children }) => <Typography.P className="mb-4">{children}</Typography.P>,
    blockquote: ({ children }) => (
      <blockquote className="pl-4 border-l-2 border-primary italic my-6">
        <Typography.P>{children}</Typography.P>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
};

interface PortableTextProps {
  value: TypedObject | TypedObject[];
}

export function PortableText({ value }: PortableTextProps) {
  if (!value) {
    return null;
  }

  return (
    <SanityPortableText value={value} components={portableTextComponents} />
  );
} 