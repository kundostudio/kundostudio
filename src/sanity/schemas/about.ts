import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "about",
	title: "About Page",
	type: "document",
	// Note: This is configured as a singleton in structure.ts
	// Only one instance of this document should exist
	fields: [
		defineField({
			name: "hero",
			title: "A / HERO",
			type: "object",
			fields: [
				defineField({
					name: "heading",
					title: "Heading",
					type: "string",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "asset",
					title: "Hero Asset",
					type: "asset",
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
		defineField({
			name: "cards",
			title: "B / CARDS",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					name: "card",
					title: "Card",
					fields: [
						defineField({
							name: "title",
							title: "Title",
							type: "string",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "richText",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "asset",
							title: "Card Asset",
							type: "asset",
							validation: (Rule) => Rule.required(),
						}),
					],
				}),
			],
			validation: (Rule) => Rule.required().min(3),
		}),
		defineField({
			name: "whatWeDo",
			title: "C / WHAT WE DO",
			type: "object",
			fields: [
				defineField({
					name: "heading",
					title: "Heading",
					type: "string",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "description",
					title: "Introduction",
					type: "richText",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "capabilities",
					title: "Capabilities",
					type: "array",
					of: [
						defineArrayMember({
							type: "object",
							name: "capability",
							title: "Capability",
							fields: [
								defineField({
									name: "title",
									title: "Title",
									type: "string",
									validation: (Rule) => Rule.required(),
								}),
								defineField({
									name: "description",
									title: "Description",
									type: "richText",
									validation: (Rule) => Rule.required(),
								}),
							],
						}),
					],
					validation: (Rule) => Rule.required().min(1),
				}),
			],
		}),
		defineField({
			name: "prefooter",
			title: "D / PREFOOTER",
			type: "object",
			fields: [
				defineField({
					name: "tagline",
					title: "Tagline",
					type: "string",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "asset",
					title: "Prefooter Asset",
					type: "asset",
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
		defineField({
			name: "descriptionV2",
			title: "V2 — Description",
			description:
				"Intro paragraphs for the v2027 About page. Separate paragraphs with blank lines.",
			type: "text",
			rows: 10,
		}),
		defineField({
			name: "servicesV2",
			title: "V2 — Services",
			description: "Service categories for the v2027 About page",
			type: "array",
			of: [
				{
					type: "object",
					name: "serviceCategory",
					title: "Service Category",
					fields: [
						defineField({
							name: "category",
							title: "Category Name",
							type: "string",
						}),
						defineField({
							name: "description",
							title: "Description",
							description:
								"Short description displayed below the category heading",
							type: "string",
						}),
						defineField({
							name: "items",
							title: "Services",
							type: "array",
							of: [{ type: "string" }],
						}),
					],
					preview: {
						select: { title: "category" },
					},
				},
			],
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
