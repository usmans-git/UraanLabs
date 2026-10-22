import pagesData from "../../data/pagesData.json";

export const metadata = {
  title: pagesData.contact.meta.title,
  description: pagesData.contact.meta.description,
  alternates: {
    canonical: "https://uraanlabs.com/contact",
  },
  openGraph: {
    title: pagesData.contact.meta.ogTitle,
    description: pagesData.contact.meta.ogDescription,
    url: "https://uraanlabs.com/contact",
    images: [{ url: pagesData.contact.meta.ogImage }],
  },
};

export default function ContactPage() {
  const page = pagesData.contact;

  return (
    <>
      {page.meta.schemas &&
        page.meta.schemas.map((schema, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      <main dangerouslySetInnerHTML={{ __html: page.content }} />
    </>
  );
}
