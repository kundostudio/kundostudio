import { defineField, defineType } from "sanity";

export default defineType({
	name: "projectType",
	title: "Project Type",
	type: "object",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
		}),
	],
});
