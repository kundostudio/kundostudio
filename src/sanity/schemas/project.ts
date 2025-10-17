import { defineField, defineType } from "sanity";

export default defineType({
	name: "project",
	title: "Project",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "visible",
			title: "Visible",
			description: "Toggle to control whether this project is displayed on the site",
			type: "boolean",
			initialValue: true,
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "projectType",
			title: "Project Type",
			type: "array",
			of: [{ type: "projectType" }],
		}),
		defineField({
			name: "client",
			title: "Client",
			type: "reference",
			to: [{ type: "client" }],
		}),
		defineField({
			name: "url",
			title: "URL",
			type: "url",
		}),
		defineField({
			name: "year",
			title: "Year",
			type: "number",
			validation: (Rule) => Rule.required().min(2000).max(new Date().getFullYear()),
		}),
		defineField({
			name: "thumbnail",
			title: "Thumbnail",
			type: "image",
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "mainAsset",
			title: "MAIN ASSET",
			description: "The asset from the top fold.",
			type: "asset",
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "DESCRIPTION",
			type: "text",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "secondaryAsset",
			title: "SECONDARY ASSET",
			description: "The asset below the description and before the quote.",
			type: "asset",
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "secondaryDescription",
			title: "SECONDARY DESCRIPTION",
			description: "Sections of copy shown after the secondary asset.",
			type: "object",
			fields: [
				defineField({
					name: "sections",
					title: "Sections",
					type: "array",
					of: [
						{
							title: "Section",
							type: "object",
							fields: [
								defineField({ name: "title", title: "Title", type: "string" }),
								defineField({ name: "content", title: "Content", type: "richText" }),
							],
							preview: {
								select: { title: "title" },
								prepare: ({ title }) => ({ title: title || "Untitled section" }),
							},
						},
					],
				}),
			],
			preview: {
				select: { title: "sections.0.title" },
				prepare: ({ title }) => ({ title: title ? `Secondary: ${title}` : "Secondary description" }),
			},
		}),
		defineField({
			name: "quote",
			title: "C / QUOTE",
			type: "quote",
		}),

		defineField({
			name: "assets",
			title: "PROJECT ASSETS",
			type: "array",
			description:
				"Add images or videos that can be displayed in full width or compact (half width)",
			of: [{ type: "asset" }],
		}),
		defineField({
			name: "roles",
			title: "ROLES",
			type: "object",
			fields: [
				defineField({
					name: "internal",
					title: "KUNDO / Roles",
					type: "array",
					of: [{ type: "roleItem" }],
				}),
				defineField({
					name: "external",
					title: "CLIENT / Roles",
					type: "array",
					of: [{ type: "roleItem" }],
				}),
				defineField({
					name: "services",
					title: "SERVICES",
					type: "array",
					of: [{ type: "string" }],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "name",
			subtitle: "subtitle",
			media: "thumbnail",
			visible: "visible",
		},
		prepare({ title, subtitle, media, visible }) {
			return {
				title: `${title}${visible === false ? " (Hidden)" : ""}`,
				subtitle,
				media,
			};
		},
	},
});
