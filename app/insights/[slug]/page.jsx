import { notFound } from "next/navigation";
import insightsData from "../../../data/insightsData.json";

export async function generateStaticParams() {
  return Object.keys(insightsData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const article = insightsData[slug];

  if (!article) {
    return {
      title: "Article Not Found | UraanLabs Insights",
    };
  }

  return {
    title: article.meta.title,
    description: article.meta.description,
    alternates: {
      canonical: `https://uraanlabs.com/insights/${slug}`,
    },
    openGraph: {
      title: article.meta.ogTitle,
      description: article.meta.ogDescription,
      url: `https://uraanlabs.com/insights/${slug}`,
      images: [{ url: article.meta.ogImage }],
    },
  };
}

export default function InsightDetailPage({ params }) {
  const { slug } = params;
  const article = insightsData[slug];

  if (!article) {
    notFound();
  }

  return (
    <>
      {article.meta.schemas &&
        article.meta.schemas.map((schema, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      <main dangerouslySetInnerHTML={{ __html: article.content }} />
    </>
  );
}
