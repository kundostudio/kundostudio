"use client";

import { PortableText, PortableTextReactComponents } from "next-sanity";
import { Link } from "~/components/link";
import { Page } from "~/components/page";
import { Typography } from "~/components/typography";

// Configure the PortableText components
const portableTextComponents: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ value, children }) => {
      const { href, blank } = value || {};
      return (
        <Link href={href || "#"} target={blank ? "_blank" : undefined} showIcon={blank}>
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
            <Image
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

export function AboutPage({ aboutData }) {
  return (
    <Page className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 gap-y-8 md:gap-x-6 lg:gap-x-8 pb-[120px]">
      {/* Header */}
      <div className="col-span-full flex flex-col mt-10 md:mt-18 lg:translate-y-6 lg:mt-28">
        <Typography.P className="text-secondary uppercase">/ ABOUT</Typography.P>
        <div className="relative inline-block w-fit">
          <Typography.H1 className="leading-none w-fit mt-1 mb-8">Kundo</Typography.H1>
          <Typography.P className="absolute top-0 -right-2 translate-x-full text-primary">
            [1]
          </Typography.P>
        </div>
        <Typography.P className="text-secondary uppercase">
          <span className="text-primary">WHAT IS KUNDO?</span> KNOW A BIT MORE
          <br /> ABOUT WHO WE ARE AND WHAT WE DO.
        </Typography.P>
      </div>

      <div className="h-16 md:h-24 lg:h-36 border-t border-b border-tertiary col-span-full" />

      {/* Section number and label */}
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
        [ 01 ]
      </Typography.P>
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
        ABOUT
      </Typography.P>

      {/* Content */}
      <div className="flex flex-col gap-8 col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6 md:pb-8 lg:pb-24">
      {aboutData?.content ? (
          <PortableText value={aboutData.content} components={portableTextComponents} />
        ) : (
          <Typography.P>No content available. Add content in the Sanity Studio.</Typography.P>
        )}
      </div>
    </Page>
  );
}