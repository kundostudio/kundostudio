import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "visible",
      title: "Visible",
      description: "Toggle to control whether this project is displayed on the site",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "reference",
      to: [{ type: "client" }],
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required().min(2000).max(new Date().getFullYear()),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainAsset",
      title: "A / MAIN ASSET",
      description: "The asset from the top fold.",
      type: "asset",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "A / DESCRIPTION",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "skills",
      title: "B / WORK",
      description: "Add the skills used in the project.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryAsset",
      title: "B / SECONDARY ASSET",
      description: "The asset below the description and before the quote.",
      type: "asset",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "C / QUOTE",
      type: "quote",
    }),

    defineField({
      name: "assets",
      title: "C / PROJECT ASSETS",
      type: "array",
      description:
        "Add images or videos that can be displayed in full width or compact (half width)",
      of: [{ type: "asset" }],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "subtitle",
      media: "thumbnail",
      visible: "visible",
    },
    prepare({ title, subtitle, media, visible }) {
      return {
        title: `${title}${visible === false ? " (Hidden)" : ""}`,
        subtitle,
        media,
      };
    },
  },
});
