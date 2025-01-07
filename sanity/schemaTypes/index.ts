import { type SchemaTypeDefinition } from "sanity";

import project from "../../schemas/project";
import quote from "../../schemas/quote";
import skill from "../../schemas/skill";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [skill, quote, project],
};
