import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { muxInput } from "sanity-plugin-mux-input";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "~/sanity/env";
import { schema } from "~/sanity/schemas";

import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "kundo-studio",
  title: "Kundo Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }), // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    muxInput(),
  ],
  schema,
});
