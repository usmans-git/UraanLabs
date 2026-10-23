import Link from "next/link";

export const metadata = {
  title: "404 — Route Not Found | UraanTech",
  description: "The requested page could not be located on the UraanTech network. Return to the homepage or explore our core software and AI capabilities.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const quickLinks = [
    { title: "Custom Software & Web Apps", href: "/services/web-mobile-apps", icon: "💻" },
    { title: "AI Automation & Autonomous Agents", href: "/services/ai-automation", icon: "⚡" },
    { title: "Penetration Testing & VAPT Security", href: "/services/penetration-testing-vapt", icon: "🛡️" },
    { title: "Enterprise Platforms & ERPs", href: "/services/business-platforms", icon: "🏢" },
    { title: "Industries & Case Studies", href: "/industries", icon: "🌐" },
    { title: "Engineering Insights & Whitepapers", href: "/insights", icon: "📑" },
  ];

  return (
    <main className="not-found-page" style={{ minHeight: "85vh", display: "flex", alignItems: "center", position: "relative", zIndex: 1, padding: "140px 0 80px" }}>
      <div className="container" style={{ maxWidth: "1060px", margin: "0 auto", padding: "0 24px" }}>
        
        {/* Center Container Card */}
        <div
          style={{
            background: "linear-gradient(180deg, rgba(14, 21, 42, 0.78) 0%, rgba(9, 14, 28, 0.92) 100%)",
            border: "1px solid rgba(56, 189, 248, 0.22)",
            borderRadius: "28px",
            padding: "56px 40px",
            boxShadow: "0 30px 80px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.08)",
            backdropFilter: "blur(20px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle Cyber Accents */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "380px",
              height: "220px",
              background: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.22) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Status Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(56, 189, 248, 0.08)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              fontSize: "0.82rem",
              fontFamily: "var(--font-mono, monospace)",
              color: "var(--cyan-sonic, #38BDF8)",
              letterSpacing: "0.06em",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#EF4444",
                boxShadow: "0 0 10px #EF4444",
                display: "inline-block",
              }}
            />
            HTTP 404 // SIGNAL LOST — ROUTE UNMAPPED
          </div>

          {/* Big Stylized 404 Number */}
          <h1
            style={{
              fontFamily: "var(--font-display, 'Sora', sans-serif)",
              fontSize: "clamp(5rem, 12vw, 8.5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              margin: "0 0 16px",
              background: "linear-gradient(135deg, #FFFFFF 20%, #7DD3FC 60%, #38BDF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.04em",
              textShadow: "0 10px 30px rgba(56, 189, 248, 0.2)",
            }}
          >
            404
          </h1>

          <h2
            style={{
              fontFamily: "var(--font-display, 'Sora', sans-serif)",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "14px",
            }}
          >
            Coordinates Out of Range
          </h2>

          <p
            style={{
              maxWidth: "620px",
              margin: "0 auto 36px",
              color: "var(--text-muted, #94A3B8)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
            }}
          >
            The route or resource you are looking for does not exist, has been permanently decommissioned, or was migrated to our new domain infrastructure at <strong style={{ color: "#FFFFFF" }}>uraantech.online</strong>.
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "14px",
              marginBottom: "48px",
            }}
          >
            <Link
              href="/"
              className="btn btn-shimmer btn-lg"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <span>Return to Homepage</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>

            <Link
              href="/services"
              className="btn btn-glass btn-lg"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 24px",
                borderRadius: "12px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <span>View All Services</span>
            </Link>

            <Link
              href="/contact"
              className="btn btn-glass btn-lg"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 24px",
                borderRadius: "12px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              <span>Book a Call</span>
            </Link>
          </div>

          {/* Quick Jump Grid */}
          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              paddingTop: "36px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--text-dim, #64748B)",
                marginBottom: "18px",
                textAlign: "center",
              }}
            >
              DIRECT NAVIGATION CHANNELS
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "12px",
              }}
            >
              {quickLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                    color: "var(--text-body, #E2E8F0)",
                    textDecoration: "none",
                    fontSize: "0.92rem",
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                  }}
                  className="not-found-link"
                >
                  <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.title}</span>
                  <span style={{ color: "var(--cyan-sonic, #38BDF8)", opacity: 0.7 }}>&rarr;</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div style={{ marginTop: "32px", fontSize: "0.85rem", color: "var(--text-dim, #64748B)" }}>
            Need human assistance? Email us at{" "}
            <a href="mailto:info@uraantech.online" style={{ color: "var(--cyan-sonic, #38BDF8)", textDecoration: "none" }}>
              info@uraantech.online
            </a>{" "}
            or message our{" "}
            <a
              href="https://wa.me/923170128047?text=Hello%20UraanTech%20Support%2C%20I%20hit%20a%20404%20error."
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--cyan-sonic, #38BDF8)", textDecoration: "none" }}
            >
              WhatsApp Desk &rarr;
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
