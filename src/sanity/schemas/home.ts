import { defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  title: "Home Page",
  type: "document",
  // Note: This is configured as a singleton in structure.ts
  // Only one instance of this document should exist
  fields: [
    defineField({
      name: "studioDescriptionDesktop",
      title: "Studio Description (Desktop)",
      type: "text",
      initialValue:
        "KUNDO IS A TIGHT-KNIT TEAM COMBINING CRAFTSMANSHIP AND COLLABORATION TO HELP FOUNDERS SECURE FUNDING, LAUNCH PRODUCTS, AND ACHIEVE GROWTH.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "studioDescriptionMobile",
      title: "Studio Description (Mobile)",
      type: "text",
      initialValue:
        "KUNDO THRIVES AT THE INTERSECTION OF EXCEPTIONAL CRAFTSMANSHIP AND MEANINGFUL COLLABORATION. OUR WORK EMPOWERS FOUNDERS TO ACHIEVE SUCCESSFUL FUNDRAISING, LAUNCH IMPACTFUL PRODUCTS, AND DRIVE EXPONENTIAL GROWTH.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "carouselProjects",
      title: "Carousel Projects",
      description: "Select projects to display in the home page carousel",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
          options: {
            filter: "visible == true",
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: "clientsDescription",
      title: "01 / CLIENTS: Description",
      description: "Rich text content for the Clients section",
      type: "richText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredClients",
      title: "01 / CLIENTS: Featured Clients",
      description: "Select clients to highlight on the home page",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "client" }],
          options: {
            filter: "visible == true",
          },
        },
      ],
    }),
    defineField({
      name: "servicesDescription",
      title: "02 / SERVICES: Description",
      description: "Rich text content for the Services section",
      type: "richText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pricingDescription",
      title: "03 / PRICING: Description",
      description: "Rich text content for the Pricing section",
      type: "richText",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
});
