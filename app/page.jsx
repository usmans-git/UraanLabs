import pagesData from "../data/pagesData.json";

export const metadata = {
  title: pagesData.home.meta.title,
  description: pagesData.home.meta.description,
  alternates: {
    canonical: "https://uraanlabs.com/",
  },
  openGraph: {
    title: pagesData.home.meta.ogTitle,
    description: pagesData.home.meta.ogDescription,
    url: "https://uraanlabs.com/",
    images: [{ url: pagesData.home.meta.ogImage }],
  },
};

export default function HomePage() {
  const page = pagesData.home;

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
      <main id="main-content" dangerouslySetInnerHTML={{ __html: page.content }} />
    </>
  );
}
