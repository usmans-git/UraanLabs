import "./globals.css";
import { Inter, Sora, Space_Grotesk } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import UraanBot from "../components/UraanBot";
import ClientEffects from "../components/ClientEffects";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

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
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${spaceGrotesk.variable}`}
    >
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
