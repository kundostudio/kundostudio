import { HOME_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";

import { HomePage } from "./home/page";

// Fallback values in case Sanity data is not available
const FALLBACK_STUDIO_DESCRIPTION_DESKTOP =
  "KUNDO IS A TIGHT-KNIT TEAM COMBINING CRAFTSMANSHIP AND COLLABORATION TO HELP FOUNDERS SECURE FUNDING, LAUNCH PRODUCTS, AND ACHIEVE GROWTH.";

const FALLBACK_STUDIO_DESCRIPTION_MOBILE =
  "KUNDO THRIVES AT THE INTERSECTION OF EXCEPTIONAL CRAFTSMANSHIP AND MEANINGFUL COLLABORATION. OUR WORK EMPOWERS FOUNDERS TO ACHIEVE SUCCESSFUL FUNDRAISING, LAUNCH IMPACTFUL PRODUCTS, AND DRIVE EXPONENTIAL GROWTH.";

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

export default async function Home() {
  const { data } = await sanityFetch({ query: HOME_QUERY });

  const carouselProjects = data?.carouselProjects?.map((item) => ({
    src: item.src,
    name: item.name,
    link: `/work/${item.slug}`,
    type: item.type,
  }));

  const studioDescriptionDesktop = data?.studioDescriptionDesktop;
  const studioDescriptionMobile = data?.studioDescriptionMobile;

  const featuredClients = data?.featuredClients?.map((item) => ({
    label: item.name,
    href: item.website,
  }));

  return (
    <HomePage
      studioDescriptionDesktop={studioDescriptionDesktop}
      studioDescriptionMobile={studioDescriptionMobile}
      carouselProjects={carouselProjects}
      clientsDescription={data?.clientsDescription}
      featuredClients={featuredClients}
      servicesDescription={data?.servicesDescription}
      pricingDescription={data?.pricingDescription}
    />
  );
}
