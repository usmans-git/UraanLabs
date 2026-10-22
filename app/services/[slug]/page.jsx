import { notFound } from "next/navigation";
import servicesData from "../../../data/servicesData.json";

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const service = servicesData[slug];

  if (!service) {
    return {
      title: "Service Not Found | UraanLabs",
    };
  }

  return {
    title: service.meta.title,
    description: service.meta.description,
    alternates: {
      canonical: `https://uraanlabs.com/services/${slug}`,
    },
    openGraph: {
      title: service.meta.ogTitle,
      description: service.meta.ogDescription,
      url: `https://uraanlabs.com/services/${slug}`,
      images: [{ url: service.meta.ogImage }],
    },
  };
}

export default function ServiceDetailPage({ params }) {
  const { slug } = params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      {service.meta.schemas &&
        service.meta.schemas.map((schema, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      <main dangerouslySetInnerHTML={{ __html: service.content }} />
    </>
  );
}
