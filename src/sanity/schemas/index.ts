import type { SchemaTypeDefinition } from "sanity";

import about from "./about";
import asset from "./asset";
import client from "./client";
import contact from "./contact";
import home from "./home";
import { richText } from "./objects/richText";
import project from "./project";
import projectType from "./projectType";
import roleItem from "./roleItem";
import quote from "./quote";
import works from "./works";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		// Documents
		quote,
		project,
		asset,
		home,
		client,
		about,
		contact,
		works,
		// Objects
		richText,
		projectType,
		roleItem,
	],
};
