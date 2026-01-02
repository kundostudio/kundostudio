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
			name: "assets",
			title: "Assets",
			type: "array",
			of: [{ type: "asset" }],
		}),
		defineField({
			name: "imageDuration",
			title: "Image Duration (milliseconds)",
			type: "number",
			description: "Duration in milliseconds for each image transition",
			initialValue: 5000,
			validation: (Rule) => Rule.required().min(100).max(30000),
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
