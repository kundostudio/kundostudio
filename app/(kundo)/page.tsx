"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import Link from "next/link";

import { Carousel } from "~/components/carousel";
import { HackerText } from "~/components/hacker-text";
import { LinkList } from "~/components/link-list";
import { Page } from "~/components/page";
import { Typography } from "~/components/typography";
import FullLogo from "~/public/full-logo.svg";
import Arrow from "~/public/icons/arrow.svg";

const STUDIO_DESCRIPTION_DESKTOP =
  "KUNDO IS A TIGHT-KNIT TEAM COMBINING CRAFTSMANSHIP AND COLLABORATION TO HELP FOUNDERS SECURE FUNDING, LAUNCH PRODUCTS, AND ACHIEVE GROWTH.";

const STUDIO_DESCRIPTION_MOBILE =
  "KUNDO THRIVES AT THE INTERSECTION OF EXCEPTIONAL CRAFTSMANSHIP AND MEANINGFUL COLLABORATION. OUR WORK EMPOWERS FOUNDERS TO ACHIEVE SUCCESSFUL FUNDRAISING, LAUNCH IMPACTFUL PRODUCTS, AND DRIVE EXPONENTIAL GROWTH.";

const CAROUSEL_ITEMS = [
  {
    image: "/projects/runreal.png",
    name: "Runreal",
    link: "/work/runreal",
  },
  {
    image: "/projects/meow.png",
    name: "Meow",
    link: "/work/meow",
  },
];

const CLIENTS_ITEMS = [
  {
    label: "Scale",
    href: "https://scale.com/",
  },
  {
    label: "Sketch",
    href: "https://www.sketch.com/",
  },
  {
    label: "Emerge Tools",
    href: "https://emergetools.com/",
  },
  {
    label: "Nhost",
    href: "https://nhost.io/",
  },
];

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <Page className="flex flex-col pb-[120px] !px-0" as="div">
      <section className="flex flex-col border-b border-tertiary text-start fluid-container">
        <div className="flex flex-col md:flex-row md:gap-8 md:mt-8">
          <div className="flex-1 h-14 md:h-auto relative">
            <FullLogo className="h-full w-auto max-w-full object-contain md:absolute md:inset-0" />
          </div>

          <div className="flex-1 flex-shrink-0 h-fit">
            <Typography.H3>Independent studio practice</Typography.H3>

            <Typography.P className="text-secondary uppercase">
              {isMobile ? STUDIO_DESCRIPTION_MOBILE : STUDIO_DESCRIPTION_DESKTOP}
            </Typography.P>
            <Link
              href="mailto:hello@kundo.studio"
              className="mt-1 md:mt-8 border-t border-b border-tertiary w-[calc(100%+var(--layout-padding-x))] h-6 flex items-center justify-start"
            >
              <Typography.P className="text-secondary">HELLO@KUNDO.STUDIO</Typography.P>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-16 md:mt-[104px] mb-2 md:mb-1">
          <div className="flex-1 hidden md:block">
            <Typography.H3>Currently</Typography.H3>
            <Link href="/contact" className="group flex items-center gap-4">
              <Typography.H3>
                Commissions Opened{" "}
                <Arrow className="w-6 inline-block transition-transform duration-300 group-hover:translate-x-1" />
              </Typography.H3>
              <Typography.P className="text-secondary hidden lg:block">/ CONTACT</Typography.P>
            </Link>
          </div>
          <div className="flex-1">
            <Typography.H3>Based in</Typography.H3>
            <Typography.H3>Buenos Aires, ARG</Typography.H3>
          </div>
        </div>
      </section>

      <main className="fluid-container">
        <section className="pt-12 pb-[72px] md:py-36">
          <Carousel
            items={CAROUSEL_ITEMS}
            description={
              <div className="flex flex-col">
                <Typography.P className="uppercase text-primary">
                  {"let's build the future together."}
                </Typography.P>
                <Typography.P className="uppercase text-secondary">
                  {"explore our latest projects."}
                </Typography.P>
              </div>
            }
          />
        </section>

        <div className="w-full h-px bg-tertiary" />

        {/* Clients Section */}
        <section className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 gap-y-8 md:gap-x-6 lg:gap-x-8 pt-8 pb-16">
          {/* Section number */}
          <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
            <HackerText
              iterationsToAdvance={2}
              speed={30}
              startsComplete
              minRepeatTime={5000}
              maxRepeatTime={10000}
            >
              [ 01 ]
            </HackerText>
          </Typography.P>

          {/* Section title */}
          <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
            <HackerText
              iterationsToAdvance={2}
              speed={30}
              startsComplete
              minRepeatTime={5000}
              maxRepeatTime={10000}
            >
              CLIENTS
            </HackerText>
          </Typography.P>

          {/* Main text */}
          <Typography.H3 className="text-start col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
            Working with clients globally, we bring ideas to life through design—serving as partners
            and founding designers to build innovative solutions together.
          </Typography.H3>

          {/* Placeholder for client list */}
          <LinkList
            className="col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-8 aspect-[4/1]"
            items={CLIENTS_ITEMS}
          />
        </section>

        <div className="w-full h-px bg-tertiary" />

        {/* Services Section */}
        <section className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 gap-y-8 md:gap-x-6 lg:gap-x-8 pt-8 pb-16">
          {/* Section number */}
          <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
            <HackerText
              iterationsToAdvance={2}
              speed={30}
              startsComplete
              minRepeatTime={5000}
              maxRepeatTime={10000}
            >
              [ 02 ]
            </HackerText>
          </Typography.P>

          {/* Section title */}
          <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
            <HackerText
              iterationsToAdvance={2}
              speed={30}
              startsComplete
              minRepeatTime={5000}
              maxRepeatTime={10000}
            >
              SERVICES
            </HackerText>
          </Typography.P>
          {/* Main text */}
          <Typography.H3 className="text-start col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
            {`We offer three core services to deliver high-impact solutions for businesses of all sizes.
          Whether you're a startup founder looking to scale or an established company seeking fresh
          innovation, our approach adapts to your specific needs.`}
          </Typography.H3>
        </section>

        <div className="w-full h-px bg-tertiary" />

        {/* Pricing Section */}
        <section className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-8 gap-x-4 md:gap-x-6 lg:gap-x-8 pt-8 pb-16">
          {/* Section number */}
          <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
            <HackerText
              iterationsToAdvance={2}
              speed={30}
              startsComplete
              minRepeatTime={5000}
              maxRepeatTime={10000}
            >
              [ 03 ]
            </HackerText>
          </Typography.P>

          {/* Section title */}
          <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
            <HackerText
              iterationsToAdvance={2}
              speed={30}
              startsComplete
              minRepeatTime={5000}
              maxRepeatTime={10000}
            >
              PRICING
            </HackerText>
          </Typography.P>

          {/* Main text */}
          <Typography.H3 className="text-start col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6 text-pretty">
            We partner with companies at every stage, from bootstrapped startups to Series D+
            organizations. With a focus on collaboration, we create customized solutions that
            maximize value and drive long-term success.
          </Typography.H3>
        </section>
      </main>
    </Page>
  );
}
