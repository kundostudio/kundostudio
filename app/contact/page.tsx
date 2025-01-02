"use client";

import { Link } from "~/components/link";
import { Page } from "~/components/page";
import { Typography } from "~/components/typography";

export default function Contact() {
  return (
    <Page className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 gap-y-8 md:gap-x-6 lg:gap-x-8 pb-[120px]">
      {/* Header */}
      <div className="col-span-full flex flex-col mt-10 md:mt-18 lg:translate-y-6 lg:mt-28">
        <Typography.P className="text-secondary uppercase">/ CONTACT</Typography.P>
        <div className="relative inline-block w-fit">
          <Typography.H1 className="leading-none w-fit mt-1 mb-8">Get in touch</Typography.H1>
          <Typography.P className="absolute top-0 -right-2 translate-x-full text-primary">
            [3]
          </Typography.P>
        </div>
        <Typography.P className="text-secondary uppercase">
          <span className="text-primary">WE&apos;RE HERE TO HELP YOU</span> GO 0-1, OR
          <br /> 0-BEYOND.
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
      <div className="col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
        <Typography.H3>
          We&apos;d love to learn more about you and your business. Let&apos;s connect and explore
          how we can help you take things to the next level.{" "}
          <Link href="https://cal.com/kundo" className="text-primary">
            Book a call
          </Link>
        </Typography.H3>
      </div>

      {/* Collaborate Section */}
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
        [ 02 ]
      </Typography.P>
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
        COLLABORATE
      </Typography.P>
      <div className="col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
        <Typography.H3>
          If you&apos;re a developer or designer looking to collaborate with us, we&apos;d love to
          hear from you. Please drop us a line at{" "}
          <Link href="mailto:hello@kundo.studio" className="text-primary">
            hello@kundo.studio
          </Link>{" "}
          — let&apos;s create something great together!
        </Typography.H3>
      </div>

      {/* Follow Section */}
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
        [ 03 ]
      </Typography.P>
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
        FOLLOW
      </Typography.P>
      <div className="col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
        <Typography.H3>
          We focus on our work rather posting stuff, but is nice to connect via social media. Give
          us a follow at{" "}
          <Link href="https://x.com/kundostudio" className="text-primary">
            x.com/kundostudio
          </Link>{" "}
          and take a look at our latest collaborations and projects.
        </Typography.H3>
      </div>
    </Page>
  );
}
