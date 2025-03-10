"use client";

import { Link } from "~/components/link";
import { Page } from "~/components/page";
import { PortableText } from "~/components/portable-text";
import { Typography } from "~/components/typography";
import type { ContactPage as ContactPageType } from "~/lib/queries";

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
          <span className="text-primary">LET&apos;S WORK TOGETHER.</span> REACH OUT TO START A CONVERSATION.
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
          <PortableText value={contactData.contactContent} />
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
          <PortableText value={contactData.collaborateContent} />
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
          <PortableText value={contactData.followContent} />
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