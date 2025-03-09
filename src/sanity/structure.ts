import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singleton for Home Page
      S.listItem()
        .title("Home Page")
        .child(S.document().schemaType("home").documentId("home").title("Home Page")),
      // Singleton for About Page
      S.listItem()
        .title("About Page")
        .child(S.document().schemaType("about").documentId("about").title("About Page")),
      // Singleton for Contact Page
      S.listItem()
        .title("Contact Page")
        .child(S.document().schemaType("contact").documentId("contact").title("Contact Page")),
      // Regular document types
      ...S.documentTypeListItems().filter(
        (listItem) => !["home", "about", "contact"].includes(listItem.getId() as string)
      ),
    ]);
