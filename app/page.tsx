"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/accordion";
import { Carousel } from "~/components/carousel";
import { LinkList } from "~/components/link-list";
import { Page } from "~/components/page";
import { Typography } from "~/components/typography";
import FullLogo from "~/public/full-logo.svg";

const STUDIO_DESCRIPTION_DESKTOP =
  "KUNDO IS A TIGHT-KNIT TEAM COMBINING CRAFTSMANSHIP AND COLLABORATION TO HELP FOUNDERS SECURE FUNDING, LAUNCH PRODUCTS, AND ACHIEVE GROWTH.";

const STUDIO_DESCRIPTION_MOBILE =
  "KUNDO THRIVES AT THE INTERSECTION OF EXCEPTIONAL CRAFTSMANSHIP AND MEANINGFUL COLLABORATION. OUR WORK EMPOWERS FOUNDERS TO ACHIEVE SUCCESSFUL FUNDRAISING, LAUNCH IMPACTFUL PRODUCTS, AND DRIVE EXPONENTIAL GROWTH.";

const CAROUSEL_ITEMS = [
  {
    image: "/projects/runreal.png",
    name: "Runreal",
    link: "/projects/runreal",
  },
  {
    image: "/projects/meow.png",
    name: "Meow",
    link: "/projects/meow",
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
          <div className="flex-1 h-14 max-h-14 md:h-full md:max-h-full my-2 md:my-0 relative">
            <FullLogo className="h-full max-w-full md:absolute" />
          </div>

          <div className="flex-1 flex-shrink-0 h-fit">
            <Typography.H3>Independent studio practice</Typography.H3>

            <Typography.P className="text-secondary uppercase">
              {isMobile ? STUDIO_DESCRIPTION_MOBILE : STUDIO_DESCRIPTION_DESKTOP}
            </Typography.P>
            <Link
              href="mailto:hello@kundo.studio"
              className="mt-1 md:mt-8 border-t border-b border-tertiary w-full h-6 flex items-center justify-start"
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
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
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
            [ 01 ]
          </Typography.P>

          {/* Section title */}
          <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
            CLIENTS
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
            [ 02 ]
          </Typography.P>

          {/* Section title */}
          <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
            SERVICES
          </Typography.P>

          {/* Main text */}
          <Typography.H3 className="text-start col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
            {`We offer three core services to deliver high-impact solutions for businesses of all sizes.
          Whether you're a startup founder looking to scale or an established company seeking fresh
          innovation, our approach adapts to your specific needs.`}
          </Typography.H3>

          {/* Services List - Desktop */}
          <div className="w-full h-px bg-tertiary col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-8" />

          <Typography.P className="hidden md:block md:col-start-4 lg:col-start-5">
            DESIGN:
          </Typography.P>
          <div className="hidden md:flex flex-col md:col-start-6 md:col-span-3 lg:col-start-7 xl:col-start-6 lg:col-span-6 xl:col-span-7">
            <Typography.P>ART & CREATIVE DIRECTION</Typography.P>
            <Typography.P>VISUAL IDENTITY</Typography.P>
            <Typography.P>PRODUCT DESIGN</Typography.P>
            <Typography.P>CONSULTING</Typography.P>
            <Typography.P>WEBSITE DESIGN</Typography.P>
            <Typography.P>LANDING PAGES</Typography.P>
            <Typography.P>RESPONSIVE DESIGN</Typography.P>
            <Typography.P>APPS & USER INTERFACE</Typography.P>
          </div>

          <div className="w-full h-px bg-tertiary col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-8" />

          <Typography.P className="hidden md:block md:col-start-4 lg:col-start-5">
            DEVELOPMENT:
          </Typography.P>
          <div className="hidden md:flex flex-col md:col-start-6 md:col-span-3 lg:col-start-7 xl:col-start-6 lg:col-span-6 xl:col-span-7">
            <Typography.P>ANIMATION DEVELOPMENT</Typography.P>
            <Typography.P>CMS INTEGRATION</Typography.P>
            <Typography.P>WEB 3D EXPERIENCES</Typography.P>
            <Typography.P>PERFORMANCE METRICS</Typography.P>
            <Typography.P>ANALYTICS IMPLEMENTATION</Typography.P>
            <Typography.P>CREATIVE DEVELOPMENT</Typography.P>
            <Typography.P>FRONTEND DEVELOPMENT</Typography.P>
            <Typography.P>INTERACTION DESIGN</Typography.P>
            <Typography.P>CMS INTEGRATION</Typography.P>
            <Typography.P>ECOMMERCE DEVELOPMENT</Typography.P>
            <Typography.P>TECHNICAL CONSULTATION</Typography.P>
          </div>

          <div className="w-full h-px bg-tertiary col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-8" />

          <Typography.P className="hidden md:block md:col-start-4 lg:col-start-5">
            ANIMATION:
          </Typography.P>
          <div className="hidden md:flex flex-col md:col-start-6 md:col-span-3 lg:col-start-7 xl:col-start-6 lg:col-span-6 xl:col-span-7">
            <Typography.P>PRODUCT UI</Typography.P>
            <Typography.P>LOGO REVEALS</Typography.P>
            <Typography.P>BRANDING VIDEOS</Typography.P>
            <Typography.P>EXPLAINER VIDEOS</Typography.P>
            <Typography.P>INFOGRAPHIC VIDEOS</Typography.P>
            <Typography.P>& MORE</Typography.P>
          </div>

          {/* Services List - Mobile */}
          <div className="md:hidden col-span-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="design">
                <AccordionTrigger>Design</AccordionTrigger>
                <AccordionContent>
                  <Typography.P className="text-secondary">
                    ART & CREATIVE DIRECTION, VISUAL IDENTITY, PRODUCT DESIGN, CONSULTING, WEBSITE
                    DESIGN, LANDING PAGES, RESPONSIVE DESIGN, APPS & USER INTERFACE
                  </Typography.P>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="development">
                <AccordionTrigger>Development</AccordionTrigger>
                <AccordionContent>
                  <Typography.P className="text-secondary">
                    ANIMATION DEVELOPMENT, WEB 3D EXPERIENCES, PERFORMANCE METRICS, ANALYTICS
                    IMPLEMENTATION, CREATIVE DEVELOPMENT, FRONTEND DEVELOPMENT, INTERACTION DESIGN,
                    CMS INTEGRATION, ECOMMERCE DEVELOPMENT & TECHNICAL CONSULTATION
                  </Typography.P>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="animation">
                <AccordionTrigger>Motion</AccordionTrigger>
                <AccordionContent>
                  <Typography.P className="text-secondary">
                    PRODUCT UI, LOGO REVEALS, BRANDING VIDEOS, EXPLAINER VIDEOS, INFOGRAPHIC VIDEOS
                    & MORE
                  </Typography.P>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <div className="w-full h-px bg-tertiary" />

        {/* Pricing Section */}
        <section className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-8 gap-x-4 md:gap-x-6 lg:gap-x-8 pt-8 pb-16">
          {/* Section number */}
          <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
            [ 03 ]
          </Typography.P>

          {/* Section title */}
          <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
            PRICING
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
