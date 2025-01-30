import { Rule } from "sanity";

const CATEGORIES = ["design", "development", "animation"] as const;

const skill = {
  name: "skill" as const,
  title: "Skill",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: CATEGORIES.map((category) => ({
          title: category.charAt(0).toUpperCase() + category.slice(1),
          value: category,
        })),
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
    },
  },
};

export default skill;
