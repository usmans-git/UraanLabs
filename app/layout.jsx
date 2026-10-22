import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import UraanBot from "../components/UraanBot";
import ClientEffects from "../components/ClientEffects";

export const metadata = {
  title: "UraanLabs | Next-Gen Software Engineering, AI & Cybersecurity Studio",
  description:
    "UraanLabs engineers intelligent software systems, bespoke AI automations, scalable SaaS products, and bank-grade cybersecurity for ambitious companies.",
  metadataBase: new URL("https://uraanlabs.com"),
  alternates: {
    canonical: "https://uraanlabs.com",
  },
  icons: {
    icon: "/images/uraanlabs-mark.svg",
  },
  openGraph: {
    type: "website",
    title: "UraanLabs | Next-Gen Software Engineering, AI & Cybersecurity Studio",
    description:
      "We engineer intelligent software systems, bespoke AI workflow automations, and category-defining digital products.",
    url: "https://uraanlabs.com",
    siteName: "UraanLabs",
    images: [
      {
        url: "/images/herobanner.png",
        width: 1200,
        height: 630,
        alt: "UraanLabs Venture & AI Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UraanLabs | Next-Gen Software Engineering, AI & Cybersecurity Studio",
    description:
      "We engineer intelligent software systems, bespoke AI workflow automations, and category-defining digital products.",
    images: ["/images/herobanner.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="dark-canvas">
        {/* Background Ambient Glow Orbs */}
        <div className="ambient-glow orb-top-left" aria-hidden="true"></div>
        <div className="ambient-glow orb-top-right" aria-hidden="true"></div>
        <div className="ambient-glow orb-center" aria-hidden="true"></div>

        {/* Floating Glass Navbar */}
        <Header />

        {/* Page Content */}
        {children}

        {/* Expanded Site Footer */}
        <Footer />

        {/* Floating WhatsApp (Pinned Bottom-Left) */}
        <FloatingWhatsApp />

        {/* Live AI Concierge Chatbot (Pinned Bottom-Right) */}
        <UraanBot />

        {/* Dynamic Micro-Interactions Client Handler */}
        <ClientEffects />
      </body>
    </html>
  );
}
