import { defineField, defineType } from "sanity";

export default defineType({
  name: "roleItem",
  title: "Role",
  type: "object",
  fields: [
    defineField({
      name: "role",
      title: "Role",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "people",
      title: "People",
      description: "One name per line",
      type: "text",
      rows: 4,
    }),
  ],
});

