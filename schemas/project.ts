import { Rule } from "sanity";

const project = {
  name: "project" as const,
  title: "Project",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "url",
      title: "URL",
      type: "url",
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule: Rule) => Rule.required().min(2000).max(new Date().getFullYear()),
    },
    {
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "secondaryImage",
      title: "Secondary Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "images",
      title: "Additional Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: "quote",
      title: "Quote",
      type: "quote",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "subtitle",
      media: "thumbnail",
    },
  },
};

export default project;
