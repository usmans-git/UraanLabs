import pagesData from "../../data/pagesData.json";

export const metadata = {
  title: pagesData.about.meta.title,
  description: pagesData.about.meta.description,
  alternates: {
    canonical: "https://uraantech.online/about",
  },
  openGraph: {
    title: pagesData.about.meta.ogTitle,
    description: pagesData.about.meta.ogDescription,
    url: "https://uraantech.online/about",
    images: [{ url: pagesData.about.meta.ogImage }],
  },
};

export default function AboutPage() {
  const page = pagesData.about;

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
