import { defineField, defineType } from "sanity";

export default defineType({
  name: "client",
  title: "Client",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "visible",
      title: "Visible",
      description: "Toggle to control whether this client is displayed on the site",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "website",
      media: "logo",
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
