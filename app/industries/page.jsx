import pagesData from "../../data/pagesData.json";

export const metadata = {
  title: pagesData.industries.meta.title,
  description: pagesData.industries.meta.description,
  alternates: {
    canonical: "https://uraanlabs.com/industries",
  },
  openGraph: {
    title: pagesData.industries.meta.ogTitle,
    description: pagesData.industries.meta.ogDescription,
    url: "https://uraanlabs.com/industries",
    images: [{ url: pagesData.industries.meta.ogImage }],
  },
};

export default function IndustriesPage() {
  const page = pagesData.industries;

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
