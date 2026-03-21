"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Home Page")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem()
              .title("About Page")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !["homePage", "aboutPage"].includes(item.getId() ?? "")
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
