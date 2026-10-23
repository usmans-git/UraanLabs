import pagesData from "../../data/pagesData.json";

export const metadata = {
  title: pagesData.insights.meta.title,
  description: pagesData.insights.meta.description,
  alternates: {
    canonical: "https://uraantech.online/insights",
  },
  openGraph: {
    title: pagesData.insights.meta.ogTitle,
    description: pagesData.insights.meta.ogDescription,
    url: "https://uraantech.online/insights",
    images: [{ url: pagesData.insights.meta.ogImage }],
  },
};

export default function InsightsPage() {
  const page = pagesData.insights;

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
