import type { Rule } from "sanity";

const quote = {
	name: "quote" as const,
	title: "Quote",
	type: "object",
	fields: [
		{
			name: "text",
			title: "Text",
			type: "text",
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: "author",
			title: "Author",
			type: "object",
			fields: [
				{
					name: "name",
					title: "Name",
					type: "string",
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: "role",
					title: "Role",
					type: "string",
					validation: (Rule: Rule) => Rule.required(),
				},
				{
					name: "image",
					title: "Image",
					type: "image",
					options: {
						hotspot: true,
					},
				},
			],
		},
	],
};

export default quote;
