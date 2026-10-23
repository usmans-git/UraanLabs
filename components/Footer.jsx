import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-col-brand">
            <Link href="/" className="logo" aria-label="UraanTech Homepage">
              <img
                src="/images/uraantech-logo.svg"
                alt="UraanTech Logo"
                width={290}
                height={64}
                loading="lazy"
                decoding="async"
                className="brand-logo-img"
              />
            </Link>
            <p className="footer-bio">
              Next-generation software engineering, autonomous AI automation, bespoke business platforms, and bank-grade cybersecurity for high-growth companies.
            </p>
            <div className="system-status-pill">
              <span className="status-dot"></span>
              <span>All Global Systems Live (99.98% Uptime)</span>
            </div>
          </div>

          {/* Col 2: Services (5 Pillars) */}
          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li>
                <Link href="/services/design-branding">Design &amp; Branding</Link>
              </li>
              <li>
                <Link href="/services/web-mobile-apps">Web &amp; Mobile Apps</Link>
              </li>
              <li>
                <Link href="/services/business-platforms">Business Platforms</Link>
              </li>
              <li>
                <Link href="/services/ai-automation">AI &amp; Automation</Link>
              </li>
              <li>
                <Link href="/services/cybersecurity">Cybersecurity</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Industries (7 Sectors) */}
          <div className="footer-col">
            <h4 className="footer-heading">Industries</h4>
            <ul className="footer-links">
              <li>
                <Link href="/industries#retail">Retail &amp; E-Commerce</Link>
              </li>
              <li>
                <Link href="/industries#edtech">Education (EdTech)</Link>
              </li>
              <li>
                <Link href="/industries#fintech">Finance (FinTech)</Link>
              </li>
              <li>
                <Link href="/industries#healthcare">Healthcare</Link>
              </li>
              <li>
                <Link href="/industries#realestate">Real Estate</Link>
              </li>
              <li>
                <Link href="/industries#logistics">Logistics &amp; Supply Chain</Link>
              </li>
              <li>
                <Link href="/industries#saas">Startups &amp; SaaS</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li>
                <Link href="/about#story">Our Story</Link>
              </li>
              <li>
                <Link href="/about#why-uraantech">Why UraanTech</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/insights">Insights</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Us */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:info@uraantech.online">info@uraantech.online</a>
              </li>
              <li>
                <a href="tel:+923170128047">+92 317 0128047</a>
              </li>
              <li>
                <span>Karachi, Pakistan (HQ)</span>
              </li>
              <li>
                <a
                  href="https://wa.me/923170128047?text=Hello%20UraanTech%20Team%2C%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--cyan-sonic)" }}
                >
                  WhatsApp Chat &rarr;
                </a>
              </li>
              <li>
                <Link href="/contact">Book an Audit &rarr;</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>
            &copy; {new Date().getFullYear()} UraanTech. All Rights Reserved. Built with precision and venture-grade craft.
          </p>
          <div className="footer-legal-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
