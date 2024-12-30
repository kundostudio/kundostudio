"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import Link from "next/link";

import { Carousel } from "~/components/carousel";
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

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <Page className="flex flex-col">
      <section className="flex flex-col border-b border-tertiary text-start">
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
    </Page>
  );
}
