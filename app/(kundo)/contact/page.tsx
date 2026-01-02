import { CONTACT_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";

import { ContactPage } from "./contact";

export default async function Contact() {
  const { data: contactData } = await sanityFetch({ query: CONTACT_QUERY });

  return (
    <ContactPage contactData={contactData} />
  );
}
 