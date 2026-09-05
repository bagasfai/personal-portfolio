import {
  EXPERTISE,
  FULL_NAME,
  ROLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
  USERNAMES,
} from "@/content/site";
import { CONTACT_EMAIL } from "@/content/contact";

const personId = `${SITE_URL}/#person`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: FULL_NAME,
      alternateName: [SITE_NAME, ...USERNAMES],
      url: SITE_URL,
      image: `${SITE_URL}/profile/me-1.jpg`,
      jobTitle: ROLE,
      description: SITE_DESCRIPTION,
      email: `mailto:${CONTACT_EMAIL}`,
      sameAs: SOCIAL_LINKS,
      knowsAbout: EXPERTISE,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      author: { "@id": personId },
      publisher: { "@id": personId },
    },
  ],
};

const json = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
