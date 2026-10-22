import pagesData from "../../data/pagesData.json";

export const metadata = {
  title: pagesData.careers.meta.title,
  description: pagesData.careers.meta.description,
  alternates: {
    canonical: "https://uraanlabs.com/careers",
  },
  openGraph: {
    title: pagesData.careers.meta.ogTitle,
    description: pagesData.careers.meta.ogDescription,
    url: "https://uraanlabs.com/careers",
    images: [{ url: pagesData.careers.meta.ogImage }],
  },
};

export default function CareersPage() {
  const page = pagesData.careers;

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
