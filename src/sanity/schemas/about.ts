import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About Page",
  type: "document",
  // Note: This is configured as a singleton in structure.ts
  // Only one instance of this document should exist
  fields: [
    defineField({
      name: "content",
      title: "Content",
      description: "Rich text content for the About page",
      type: "richText",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About Page",
      };
    },
  },
});
