"use client";

import { Link } from "~/components/link";
import { Page } from "~/components/page";
import { Typography } from "~/components/typography";

export default function About() {
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
        <Typography.H3>
          Kundo is a tight-knit group of creatives who unite to bring unique perspectives and
          diverse skills to the table — we blend our strengths to achieve a singular vision.
        </Typography.H3>

        <Typography.H3>
          Driven by passion and teamwork, we partner with top talent across disciplines to deliver
          outstanding results. Our core values guide every step: delicacy, thoroughness, precision,
          and simplicity.
        </Typography.H3>

        <Typography.H3>
          We&apos;re makers, problem-solvers, and collaborators building the future together,
          focused on creating lasting impact through exceptional work.
        </Typography.H3>

        <Typography.H3>
          If your startup or company needs a push, get in touch at{" "}
          <Link href="mailto:hello@kundo.studio" className="text-primary">
            hello@kundo.studio
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="text-primary">
            book a call
          </Link>
        </Typography.H3>
      </div>
    </Page>
  );
}
