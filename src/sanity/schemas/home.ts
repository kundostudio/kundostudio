import { defineField, defineType } from "sanity";

// Note: This is configured as a singleton in structure.ts
// Only one instance of this document should exist

export default defineType({
	name: "home",
	title: "Home Page",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "text",
			initialValue: "Collaborative studio practice.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "asset",
			title: "Asset",
			type: "asset",
		}),
	],
	preview: {
		prepare() {
			return {
				title: "Home Page",
			};
		},
	},
});
