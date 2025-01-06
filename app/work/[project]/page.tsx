"use client";

import Image from "next/image";
import Link from "next/link";

import { Page } from "~/components/page";
import { Typography } from "~/components/typography";

export default function ProjectDetail() {
  return (
    <Page className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 gap-y-8 md:gap-x-6 lg:gap-x-8 pb-[120px]">
      {/* Header */}
      <div className="col-span-full flex flex-col mt-10 md:mt-18 lg:translate-y-6 lg:mt-28">
        <Typography.P className="text-secondary uppercase">/ WORK</Typography.P>
        <div className="relative inline-block w-fit">
          <Typography.H1 className="leading-none w-fit mt-1 mb-8">Runreal</Typography.H1>
          <Typography.P className="absolute top-0 -right-2 translate-x-full text-primary">
            [6]
          </Typography.P>
        </div>
        <Typography.P className="text-secondary uppercase">
          RUNREAL. THE RUNREAL DEVELOPMENT
          <br /> PLATFORM.
        </Typography.P>
      </div>

      <div className="h-16 md:h-24 lg:h-36 border-t border-tertiary col-span-full" />

      {/* Visit Button */}
      <div className="col-span-full flex justify-end">
        <Link
          href="https://runreal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Typography.P className="text-primary uppercase">VISIT →</Typography.P>
        </Link>
      </div>

      {/* Project Image */}
      <div className="col-span-full aspect-[16/9] relative">
        <Image src="/projects/runreal.png" alt="Runreal" fill className="object-cover" priority />
      </div>

      {/* Description */}
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
        A /
      </Typography.P>
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
        DESCRIPTION
      </Typography.P>
      <Typography.H3 className="text-start col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
        We were thrilled to work with Runreal, where we saw a chance to make their software design
        simpler and more efficient. Our partnership began with a complete rebranding, where we
        created a fresh and modern look that truly represented their innovative vision. Then, we
        designed a cutting-edge website that effectively communicated their story and featured their
        groundbreaking product. Working closely with the Runreal team, we collaborated to develop a
        sleek and intuitive interface for their software, making the development process smoother
        and easier for creators to bring their ideas to life. Our work with Runreal represents a
        significant milestone in the gaming industry, and we&apos;re proud to have been a part of
        it.
      </Typography.H3>

      <div className="h-px bg-tertiary col-span-full" />

      {/* Work */}
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
        B /
      </Typography.P>
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
        WORK
      </Typography.P>
      <div className="col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
        <Typography.P className="text-secondary uppercase">
          ART & CREATIVE DIRECTION
          <br />
          VISUAL IDENTITY
          <br />
          PRODUCT DESIGN
          <br />
          WEBSITE DESIGN
          <br />
          CREATIVE DEVELOPMENT
          <br />
          FRONTEND DEVELOPMENT
          <br />
          ANIMATION
        </Typography.P>
      </div>

      {/* Placeholder Image */}
      <div className="col-span-full aspect-video bg-tertiary mt-16" />

      <div className="h-px bg-tertiary col-span-full" />

      {/* Quote */}
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
        C /
      </Typography.P>
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
        QUOTE
      </Typography.P>
      <div className="col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
        <Typography.H3 className="text-start text-balance">
          &ldquo;Working with Facu has been an absolute pleasure. Facu is organized, insightful, and
          has forced us to step up our thinking&rdquo;.
        </Typography.H3>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-6 h-6 rounded-full bg-tertiary" />
          <Typography.P className="text-secondary uppercase">
            MARWAN HELMI, CO-FOUNDER & CEO
          </Typography.P>
        </div>
      </div>
    </Page>
  );
}
