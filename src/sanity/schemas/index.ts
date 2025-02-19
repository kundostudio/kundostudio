import { type SchemaTypeDefinition } from "sanity";

import asset from "./asset";
import project from "./project";
import quote from "./quote";
import skill from "./skill";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skill, quote, project, asset],
};
