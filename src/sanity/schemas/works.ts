import { defineField, defineType } from "sanity";

export default defineType({
  name: "works",
  title: "Works Page",
  type: "document",
  // Note: This is configured as a singleton in structure.ts
  // Only one instance of this document should exist
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "richText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredProjects",
      title: "Featured Projects",
      description: "Select projects to display on the Works page",
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
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Works Page",
      };
    },
  },
});
