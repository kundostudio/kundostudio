import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact Page",
  type: "document",
  // Note: This is configured as a singleton in structure.ts
  // Only one instance of this document should exist
  fields: [
    defineField({
      name: "contactContent",
      title: "01 / CONTACT",
      type: "richText",
    }),
    defineField({
      name: "collaborateContent",
      title: "02 / COLLABORATE",
      type: "richText",
    }),
    defineField({
      name: "followContent",
      title: "03 / FOLLOW",
      type: "richText",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Contact Page",
      };
    },
  },
});
