import { type SchemaTypeDefinition } from "sanity";

import about from "./about";
import asset from "./asset";
import client from "./client";
import contact from "./contact";
import home from "./home";
import { richText } from "./objects/richText";
import project from "./project";
import quote from "./quote";
import skill from "./skill";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    skill,
    quote,
    project,
    asset,
    home,
    client,
    about,
    contact,
    // Objects
    richText,
  ],
};
