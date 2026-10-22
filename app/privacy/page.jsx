import pagesData from "../../data/pagesData.json";

export const metadata = {
  title: pagesData.privacy.meta.title,
  description: pagesData.privacy.meta.description,
  alternates: {
    canonical: "https://uraanlabs.com/privacy",
  },
  openGraph: {
    title: pagesData.privacy.meta.ogTitle,
    description: pagesData.privacy.meta.ogDescription,
    url: "https://uraanlabs.com/privacy",
    images: [{ url: pagesData.privacy.meta.ogImage }],
  },
};

export default function PrivacyPage() {
  const page = pagesData.privacy;

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
