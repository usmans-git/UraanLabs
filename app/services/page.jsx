import pagesData from "../../data/pagesData.json";

export const metadata = {
  title: pagesData.services.meta.title,
  description: pagesData.services.meta.description,
  alternates: {
    canonical: "https://uraanlabs.com/services",
  },
  openGraph: {
    title: pagesData.services.meta.ogTitle,
    description: pagesData.services.meta.ogDescription,
    url: "https://uraanlabs.com/services",
    images: [{ url: pagesData.services.meta.ogImage }],
  },
};

export default function ServicesPage() {
  const page = pagesData.services;

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
