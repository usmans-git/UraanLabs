import pagesData from "../../data/pagesData.json";

export const metadata = {
  title: pagesData.terms.meta.title,
  description: pagesData.terms.meta.description,
  alternates: {
    canonical: "https://uraanlabs.com/terms",
  },
  openGraph: {
    title: pagesData.terms.meta.ogTitle,
    description: pagesData.terms.meta.ogDescription,
    url: "https://uraanlabs.com/terms",
    images: [{ url: pagesData.terms.meta.ogImage }],
  },
};

export default function TermsPage() {
  const page = pagesData.terms;

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
