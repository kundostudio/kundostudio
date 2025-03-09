"use client";

import type { PortableTextReactComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import NextImage from "next/image";

import { Link } from "~/components/link";
import { Page } from "~/components/page";
import { Typography } from "~/components/typography";
import type { ContactPage as ContactPageType } from "~/lib/queries";

// Configure the PortableText components
const portableTextComponents: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ value, children }) => {
      const { href } = value || {};
      return (
        <Link href={href || "#"} className="text-primary">
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

export function ContactPage({ contactData }: { contactData: ContactPageType | null }) {
  return (
    <Page className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 gap-y-8 md:gap-x-6 lg:gap-x-8 pb-[120px]">
      {/* Header */}
      <div className="col-span-full flex flex-col mt-10 md:mt-18 lg:translate-y-6 lg:mt-28">
        <Typography.P className="text-secondary uppercase">/ CONTACT</Typography.P>
        <div className="relative inline-block w-fit">
          <Typography.H1 className="leading-none w-fit mt-1 mb-8">Get in Touch</Typography.H1>
        </div>
        <Typography.P className="text-secondary uppercase">
          <span className="text-primary">LET'S WORK TOGETHER.</span> REACH OUT TO START A CONVERSATION.
        </Typography.P>
      </div>

      <div className="h-16 md:h-24 lg:h-36 border-t border-b border-tertiary col-span-full" />

      {/* Contact Section */}
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
        [ 01 ]
      </Typography.P>
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
        CONTACT
      </Typography.P>

      {/* Contact Content */}
      <div className="flex flex-col gap-8 col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6 md:pb-8">
        {contactData?.contactContent ? (
          <PortableText value={contactData.contactContent} components={portableTextComponents} />
        ) : (
          <Typography.P>No contact content available. Add content in the Sanity Studio.</Typography.P>
        )}

        {contactData?.calendarLink && (
          <Link href={contactData.calendarLink} target="_blank" showIcon className="text-primary">
            <Typography.P>Book a call</Typography.P>
          </Link>
        )}
      </div>

      <div className="h-[1px] bg-tertiary col-span-full" />

      {/* Collaborate Section */}
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
        [ 02 ]
      </Typography.P>
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
        COLLABORATE
      </Typography.P>

      {/* Collaborate Content */}
      <div className="flex flex-col gap-8 col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6 md:pb-8">
        {contactData?.collaborateContent ? (
          <PortableText value={contactData.collaborateContent} components={portableTextComponents} />
        ) : (
          <Typography.P>No collaborate content available. Add content in the Sanity Studio.</Typography.P>
        )}

        {contactData?.email && (
          <Link href={`mailto:${contactData.email}`} className="text-primary">
            <Typography.P>{contactData.email}</Typography.P>
          </Link>
        )}
      </div>

      <div className="h-[1px] bg-tertiary col-span-full" />

      {/* Follow Section */}
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
        [ 03 ]
      </Typography.P>
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
        FOLLOW
      </Typography.P>

      {/* Follow Content */}
      <div className="flex flex-col gap-8 col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6 md:pb-8">
        {contactData?.followContent ? (
          <PortableText value={contactData.followContent} components={portableTextComponents} />
        ) : (
          <Typography.P>No follow content available. Add content in the Sanity Studio.</Typography.P>
        )}

        {contactData?.socialLinks && contactData.socialLinks.length > 0 && (
          <ul className="flex flex-col gap-2 mt-2">
            {contactData.socialLinks.map((social, index) => (
              <li key={index}>
                <Link href={social.url} target="_blank" showIcon className="text-primary">
                  <Typography.P>
                    {social.label || social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                  </Typography.P>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Page>
  );
} 