"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverLight, setIsOverLight] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("panel-design");
  const [openMobileAccordions, setOpenMobileAccordions] = useState({
    about: false,
    services: false,
    industries: false,
  });

  useEffect(() => {
    let ticking = false;
    let headerEl = null;
    let lightSections = null;

    const updateHeaderState = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 20);

      if (!headerEl) headerEl = document.getElementById("header");
      if (!lightSections) lightSections = document.querySelectorAll(".section-light");

      if (lightSections && lightSections.length > 0 && headerEl) {
        const headerRect = headerEl.getBoundingClientRect();
        const headerMiddle = headerRect.top + (headerRect.height / 2 || 35);
        let overLight = false;
        for (let i = 0; i < lightSections.length; i++) {
          const secRect = lightSections[i].getBoundingClientRect();
          if (secRect.top <= headerMiddle && secRect.bottom >= headerMiddle) {
            overLight = true;
            break;
          }
        }
        setIsOverLight(overLight);
      } else {
        setIsOverLight(false);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderState);
        ticking = true;
      }
    };

    const handleResize = () => {
      lightSections = document.querySelectorAll(".section-light");
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    updateHeaderState();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleAccordion = (key) => {
    setOpenMobileAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <header
        className={`site-header ${isScrolled ? "is-scrolled" : ""} ${
          isOverLight ? "is-over-light" : ""
        }`}
        id="header"
      >
        <div className="container">
          <nav className="navbar" aria-label="Main Navigation">
            {/* Logo */}
            <Link href="/" className="logo" aria-label="UraanLabs Homepage">
              <img
                src="/images/uraanlabs-logo.svg"
                alt="UraanLabs Logo"
                width={255}
                height={56}
                fetchPriority="high"
                decoding="sync"
                className="brand-logo-img"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="nav-links" id="navLinks">
              <li>
                <Link
                  href="/"
                  className={`nav-link ${pathname === "/" ? "active" : ""}`}
                >
                  Home
                </Link>
              </li>

              {/* 1. About Us Dropdown */}
              <li className="nav-item has-dropdown">
                <Link
                  href="/about"
                  className={`nav-link dropdown-toggle ${
                    pathname === "/about" ? "active" : ""
                  }`}
                  aria-haspopup="true"
                >
                  <span>About Us</span>
                  <span className="chevron" aria-hidden="true">&#9662;</span>
                </Link>
                <div className="dropdown-menu dropdown-simple">
                  <Link href="/about#story" className="dropdown-item">
                    <span className="dropdown-title">Our Story</span>
                    <small className="dropdown-desc">
                      Why UraanLabs was built and our mission.
                    </small>
                  </Link>
                  <Link href="/about#why-uraanlabs" className="dropdown-item">
                    <span className="dropdown-title">Why UraanLabs</span>
                    <small className="dropdown-desc">
                      Our 4 core engineering differentiators.
                    </small>
                  </Link>
                  <Link href="/about#founder-message" className="dropdown-item">
                    <span className="dropdown-title">Founder's Message</span>
                    <small className="dropdown-desc">
                      Executive perspective from Usman Ahmed.
                    </small>
                  </Link>
                  <Link href="/careers" className="dropdown-item">
                    <span className="dropdown-title">Careers</span>
                    <small className="dropdown-desc">
                      Join our senior technical &amp; creative studio.
                    </small>
                  </Link>
                </div>
              </li>

              {/* 2. Services Mega Menu (5 Pillars, 34 Child Services) */}
              <li className="nav-item has-dropdown has-mega">
                <Link
                  href="/services"
                  className={`nav-link dropdown-toggle ${
                    pathname.startsWith("/services") ? "active" : ""
                  }`}
                  aria-haspopup="true"
                >
                  <span>Services</span>
                  <span className="chevron" aria-hidden="true">&#9662;</span>
                </Link>

                <div className="mega-menu" id="servicesMegaMenu">
                  <div className="mega-inner">
                    {/* Left: 5 Pillar Selector Tabs */}
                    <div
                      className="mega-tabs"
                      role="tablist"
                      aria-label="Service Pillars"
                    >
                      <button
                        className={`mega-tab ${
                          activeTab === "panel-design" ? "active" : ""
                        }`}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === "panel-design"}
                        onMouseEnter={() => setActiveTab("panel-design")}
                        onClick={() => setActiveTab("panel-design")}
                      >
                        <span className="tab-icon">&#10024;</span>
                        <div className="tab-text">
                          <strong>Design &amp; Branding</strong>
                          <small>6 Core Services</small>
                        </div>
                        <span className="tab-arrow" aria-hidden="true">&rarr;</span>
                      </button>

                      <button
                        className={`mega-tab ${
                          activeTab === "panel-webmob" ? "active" : ""
                        }`}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === "panel-webmob"}
                        onMouseEnter={() => setActiveTab("panel-webmob")}
                        onClick={() => setActiveTab("panel-webmob")}
                      >
                        <span className="tab-icon">&#128187;</span>
                        <div className="tab-text">
                          <strong>Web &amp; Mobile Apps</strong>
                          <small>6 Core Services</small>
                        </div>
                        <span className="tab-arrow" aria-hidden="true">&rarr;</span>
                      </button>

                      <button
                        className={`mega-tab ${
                          activeTab === "panel-platforms" ? "active" : ""
                        }`}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === "panel-platforms"}
                        onMouseEnter={() => setActiveTab("panel-platforms")}
                        onClick={() => setActiveTab("panel-platforms")}
                      >
                        <span className="tab-icon">&#128200;</span>
                        <div className="tab-text">
                          <strong>Business Platforms</strong>
                          <small>6 Core Services</small>
                        </div>
                        <span className="tab-arrow" aria-hidden="true">&rarr;</span>
                      </button>

                      <button
                        className={`mega-tab ${
                          activeTab === "panel-ai" ? "active" : ""
                        }`}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === "panel-ai"}
                        onMouseEnter={() => setActiveTab("panel-ai")}
                        onClick={() => setActiveTab("panel-ai")}
                      >
                        <span className="tab-icon">&#9889;</span>
                        <div className="tab-text">
                          <strong>AI &amp; Automation</strong>
                          <small>8 Core Services</small>
                        </div>
                        <span className="tab-arrow" aria-hidden="true">&rarr;</span>
                      </button>

                      <button
                        className={`mega-tab ${
                          activeTab === "panel-security" ? "active" : ""
                        }`}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === "panel-security"}
                        onMouseEnter={() => setActiveTab("panel-security")}
                        onClick={() => setActiveTab("panel-security")}
                      >
                        <span className="tab-icon">&#128737;</span>
                        <div className="tab-text">
                          <strong>Cybersecurity</strong>
                          <small>8 Core Services</small>
                        </div>
                        <span className="tab-arrow" aria-hidden="true">&rarr;</span>
                      </button>
                    </div>

                    {/* Right: Content Panels corresponding to 5 pillars */}
                    <div className="mega-panels">
                      {/* Panel 1: Design & Branding (6) */}
                      <div
                        className={`mega-panel ${
                          activeTab === "panel-design" ? "active" : ""
                        }`}
                        role="tabpanel"
                      >
                        <div className="panel-header">
                          <div>
                            <span className="panel-badge">PILLAR 01</span>
                            <h4>Design &amp; Branding</h4>
                            <p>
                              Brand systems and interfaces crafted for recognition, trust, and conversion.
                            </p>
                          </div>
                          <Link
                            href="/services/design-branding"
                            className="panel-cta"
                          >
                            Dedicated Pillar Page &rarr;
                          </Link>
                        </div>
                        <div className="panel-grid">
                          <Link
                            href="/services/logo-design"
                            className="service-item"
                          >
                            <strong>Logo Design</strong>
                            <small>Distinct marks built for recognition and long-term brand equity.</small>
                          </Link>
                          <Link
                            href="/services/brand-identity"
                            className="service-item"
                          >
                            <strong>Brand Identity</strong>
                            <small>Complete design systems, typography, color palettes, and guidelines.</small>
                          </Link>
                          <Link
                            href="/services/print-stationery"
                            className="service-item"
                          >
                            <strong>Print &amp; Stationery</strong>
                            <small>Tangible marketing collateral, business cards, packaging, and decks.</small>
                          </Link>
                          <Link
                            href="/services/ui-ux-design"
                            className="service-item"
                          >
                            <strong>UI/UX Design</strong>
                            <small>Clean, high-converting digital interfaces mapped to real customer journeys.</small>
                          </Link>
                          <Link
                            href="/services/product-prototyping"
                            className="service-item"
                          >
                            <strong>Product Prototyping</strong>
                            <small>Clickable Figma prototypes to test assumptions before writing code.</small>
                          </Link>
                          <Link
                            href="/services/social-media-creatives"
                            className="service-item"
                          >
                            <strong>Social Media Creatives</strong>
                            <small>Visual templates and creative assets tailored for active social feeds.</small>
                          </Link>
                        </div>
                      </div>

                      {/* Panel 2: Web & Mobile Apps (6) */}
                      <div
                        className={`mega-panel ${
                          activeTab === "panel-webmob" ? "active" : ""
                        }`}
                        role="tabpanel"
                      >
                        <div className="panel-header">
                          <div>
                            <span className="panel-badge">PILLAR 02</span>
                            <h4>Web &amp; Mobile Apps</h4>
                            <p>
                              High-speed web platforms and cross-platform apps built with modern JavaScript stacks.
                            </p>
                          </div>
                          <Link
                            href="/services/web-mobile-apps"
                            className="panel-cta"
                          >
                            Dedicated Pillar Page &rarr;
                          </Link>
                        </div>
                        <div className="panel-grid">
                          <Link
                            href="/services/business-websites"
                            className="service-item"
                          >
                            <strong>Business Websites</strong>
                            <small>Fast, responsive web experiences engineered to convert qualified leads.</small>
                          </Link>
                          <Link
                            href="/services/custom-web-apps"
                            className="service-item"
                          >
                            <strong>Custom Web Apps</strong>
                            <small>Scalable, database-driven web applications built with modern JavaScript stacks.</small>
                          </Link>
                          <Link
                            href="/services/mobile-apps"
                            className="service-item"
                          >
                            <strong>Mobile Apps (iOS &amp; Android)</strong>
                            <small>High-performance Flutter and React Native mobile applications.</small>
                          </Link>
                          <Link
                            href="/services/pwa"
                            className="service-item"
                          >
                            <strong>Progressive Web Apps (PWA)</strong>
                            <small>App-like browser experiences with offline persistence and push notifications.</small>
                          </Link>
                          <Link
                            href="/services/api-integrations"
                            className="service-item"
                          >
                            <strong>API Integrations</strong>
                            <small>Reliable backend connectors linking third-party tools, payment gateways, and databases.</small>
                          </Link>
                          <Link
                            href="/services/support-maintenance"
                            className="service-item"
                          >
                            <strong>Support &amp; Maintenance</strong>
                            <small>Proactive performance monitoring, security patches, and ongoing feature updates.</small>
                          </Link>
                        </div>
                      </div>

                      {/* Panel 3: Business Platforms (6) */}
                      <div
                        className={`mega-panel ${
                          activeTab === "panel-platforms" ? "active" : ""
                        }`}
                        role="tabpanel"
                      >
                        <div className="panel-header">
                          <div>
                            <span className="panel-badge">PILLAR 03</span>
                            <h4>Business Platforms</h4>
                            <p>
                              Centralized operating systems engineered around how your company actually works.
                            </p>
                          </div>
                          <Link
                            href="/services/business-platforms"
                            className="panel-cta"
                          >
                            Dedicated Pillar Page &rarr;
                          </Link>
                        </div>
                        <div className="panel-grid">
                          <Link
                            href="/services/ecommerce-stores"
                            className="service-item"
                          >
                            <strong>E-Commerce Stores</strong>
                            <small>Fast, frictionless storefronts engineered for high transaction volume and conversions.</small>
                          </Link>
                          <Link
                            href="/services/lms-elearning"
                            className="service-item"
                          >
                            <strong>LMS &amp; E-Learning</strong>
                            <small>Structured digital course platforms, learner tracking, and automated student assessments.</small>
                          </Link>
                          <Link
                            href="/services/custom-erp-systems"
                            className="service-item"
                          >
                            <strong>Custom ERP Systems</strong>
                            <small>Centralized operations software connecting finance, inventory, supply chain, and staff.</small>
                          </Link>
                          <Link
                            href="/services/custom-crm-solutions"
                            className="service-item"
                          >
                            <strong>Custom CRM Solutions</strong>
                            <small>Tailored sales pipelines, contact management, and customer interaction records.</small>
                          </Link>
                          <Link
                            href="/services/online-marketplaces"
                            className="service-item"
                          >
                            <strong>Online Marketplaces</strong>
                            <small>Multi-vendor platforms with split payments, user dashboards, and review engines.</small>
                          </Link>
                          <Link
                            href="/services/saas-development"
                            className="service-item"
                          >
                            <strong>SaaS Development</strong>
                            <small>Multi-tenant cloud software with subscription billing and role-based access.</small>
                          </Link>
                        </div>
                      </div>

                      {/* Panel 4: AI & Automation (8) */}
                      <div
                        className={`mega-panel ${
                          activeTab === "panel-ai" ? "active" : ""
                        }`}
                        role="tabpanel"
                      >
                        <div className="panel-header">
                          <div>
                            <span className="panel-badge">PILLAR 04</span>
                            <h4>AI &amp; Automation</h4>
                            <p>
                              Bespoke LLM agents and multi-system automated workflows that remove manual friction.
                            </p>
                          </div>
                          <Link
                            href="/services/ai-automation"
                            className="panel-cta"
                          >
                            Dedicated Pillar Page &rarr;
                          </Link>
                        </div>
                        <div className="panel-grid">
                          <Link
                            href="/services/workflow-automation"
                            className="service-item"
                          >
                            <strong>Workflow Automation</strong>
                            <small>Connect operational tools and remove hours of repetitive manual data entry.</small>
                          </Link>
                          <Link
                            href="/services/ai-chatbots"
                            className="service-item"
                          >
                            <strong>AI Chatbots</strong>
                            <small>Context-aware conversational assistants that resolve customer tickets around the clock.</small>
                          </Link>
                          <Link
                            href="/services/autonomous-ai-agents"
                            className="service-item"
                          >
                            <strong>Autonomous AI Agents</strong>
                            <small>Independent task-running agents that process records, drafts, and system tasks.</small>
                          </Link>
                          <Link
                            href="/services/ai-voice-assistants"
                            className="service-item"
                          >
                            <strong>AI Voice Assistants</strong>
                            <small>Natural spoken audio interfaces for real-time customer support and routing.</small>
                          </Link>
                          <Link
                            href="/services/custom-llm-solutions"
                            className="service-item"
                          >
                            <strong>Custom LLM Solutions</strong>
                            <small>Secure language models fine-tuned exclusively on your private company knowledge.</small>
                          </Link>
                          <Link
                            href="/services/data-predictive-ai"
                            className="service-item"
                          >
                            <strong>Data &amp; Predictive AI</strong>
                            <small>Machine learning algorithms that forecast trends, churn, and operational capacity.</small>
                          </Link>
                          <Link
                            href="/services/text-language-ai"
                            className="service-item"
                          >
                            <strong>Text &amp; Language AI (NLP)</strong>
                            <small>Automated document summarization, sentiment extraction, and contract language review.</small>
                          </Link>
                          <Link
                            href="/services/vision-document-ai"
                            className="service-item"
                          >
                            <strong>Vision &amp; Document AI</strong>
                            <small>OCR systems that scan, extract, and classify receipts, invoices, and IDs.</small>
                          </Link>
                        </div>
                      </div>

                      {/* Panel 5: Cybersecurity (8) */}
                      <div
                        className={`mega-panel ${
                          activeTab === "panel-security" ? "active" : ""
                        }`}
                        role="tabpanel"
                      >
                        <div className="panel-header">
                          <div>
                            <span className="panel-badge">PILLAR 05</span>
                            <h4>Cybersecurity &amp; Audits</h4>
                            <p>
                              Real-world penetration testing, source code audits, and zero-trust cloud hardening.
                            </p>
                          </div>
                          <Link
                            href="/services/cybersecurity"
                            className="panel-cta"
                          >
                            Dedicated Pillar Page &rarr;
                          </Link>
                        </div>
                        <div className="panel-grid">
                          <Link
                            href="/services/penetration-testing-vapt"
                            className="service-item"
                          >
                            <strong>Penetration Testing (VAPT)</strong>
                            <small>Simulated hacker attacks to find and fix vulnerabilities before exploitation.</small>
                          </Link>
                          <Link
                            href="/services/source-code-review"
                            className="service-item"
                          >
                            <strong>Source Code Review</strong>
                            <small>Manual and automated audits finding logic flaws and hidden security backdoors.</small>
                          </Link>
                          <Link
                            href="/services/web-app-security"
                            className="service-item"
                          >
                            <strong>Web &amp; App Security</strong>
                            <small>OWASP-aligned hardening preventing SQL injection, cross-site scripting, and credential stuffing.</small>
                          </Link>
                          <Link
                            href="/services/cloud-security"
                            className="service-item"
                          >
                            <strong>Cloud Security</strong>
                            <small>Secure configuration reviews for AWS, Google Cloud, and containerized Docker environments.</small>
                          </Link>
                          <Link
                            href="/services/network-audits"
                            className="service-item"
                          >
                            <strong>Network Audits</strong>
                            <small>Perimeter scans detecting open ports, rogue endpoints, and firewall weaknesses.</small>
                          </Link>
                          <Link
                            href="/services/api-security"
                            className="service-item"
                          >
                            <strong>API Security</strong>
                            <small>Token validation, rate-limiting, and payload sanitization audits for backend endpoints.</small>
                          </Link>
                          <Link
                            href="/services/devsecops"
                            className="service-item"
                          >
                            <strong>DevSecOps</strong>
                            <small>Automated security testing baked directly into your continuous integration and deployment pipelines.</small>
                          </Link>
                          <Link
                            href="/services/compliance-audits"
                            className="service-item"
                          >
                            <strong>Compliance &amp; Audits</strong>
                            <small>Readiness reviews mapping your technical controls to SOC2, ISO, and GDPR standards.</small>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* 3. Industries Dropdown (7 Sectors) */}
              <li className="nav-item has-dropdown">
                <Link
                  href="/industries"
                  className={`nav-link dropdown-toggle ${
                    pathname === "/industries" ? "active" : ""
                  }`}
                  aria-haspopup="true"
                >
                  <span>Industries</span>
                  <span className="chevron" aria-hidden="true">&#9662;</span>
                </Link>
                <div className="dropdown-menu dropdown-simple dropdown-industries">
                  <Link href="/industries#retail" className="dropdown-item">
                    <span className="dropdown-title">Retail &amp; E-Commerce</span>
                    <small className="dropdown-desc">Headless stores, automated inventory &amp; checkout funnels.</small>
                  </Link>
                  <Link href="/industries#edtech" className="dropdown-item">
                    <span className="dropdown-title">Education (EdTech)</span>
                    <small className="dropdown-desc">Interactive LMS, student tracking &amp; AI tutor bots.</small>
                  </Link>
                  <Link href="/industries#fintech" className="dropdown-item">
                    <span className="dropdown-title">Finance (FinTech)</span>
                    <small className="dropdown-desc">Zero-trust architecture, automated ledger &amp; KYC sync.</small>
                  </Link>
                  <Link href="/industries#healthcare" className="dropdown-item">
                    <span className="dropdown-title">Healthcare</span>
                    <small className="dropdown-desc">Encrypted patient portals &amp; automated appointment reminders.</small>
                  </Link>
                  <Link href="/industries#realestate" className="dropdown-item">
                    <span className="dropdown-title">Real Estate</span>
                    <small className="dropdown-desc">Interactive property portals &amp; instant WhatsApp AI triage.</small>
                  </Link>
                  <Link href="/industries#logistics" className="dropdown-item">
                    <span className="dropdown-title">Logistics &amp; Supply Chain</span>
                    <small className="dropdown-desc">Fleet tracking backends, driver apps &amp; automated BOLs.</small>
                  </Link>
                  <Link href="/industries#saas" className="dropdown-item">
                    <span className="dropdown-title">Startups &amp; SaaS</span>
                    <small className="dropdown-desc">Fixed-scope 4-week MVP development &amp; Stripe billing.</small>
                  </Link>
                </div>
              </li>

              {/* 4. Insights (Blog) */}
              <li>
                <Link
                  href="/insights"
                  className={`nav-link ${
                    pathname.startsWith("/insights") ? "active" : ""
                  }`}
                >
                  Insights
                </Link>
              </li>

              {/* 5. Contact Us */}
              <li>
                <Link
                  href="/contact"
                  className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Action: Book a Call & AI/Cyber Badge */}
            <div className="nav-actions">
              <div
                className="nav-cyber-pill d-none-mobile"
                title="Autonomous AI & Zero-Trust Cybersecurity"
              >
                <span className="nav-cyber-pulse"></span>
                <span className="nav-cyber-icon">&#128737;</span>
                <span className="nav-cyber-text">AI &amp; Cyber Studio</span>
              </div>

              <Link href="/contact" className="btn btn-shimmer nav-cta">
                <span>Book a Call</span>
                <span className="btn-arrow" aria-hidden="true">&rarr;</span>
              </Link>

              <button
                className="mobile-toggle"
                id="mobileToggle"
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <aside
        className={`mobile-drawer ${mobileOpen ? "is-open" : ""}`}
        id="mobileDrawer"
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-drawer-header">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <img
              src="/images/uraanlabs-logo.svg"
              alt="UraanLabs Logo"
              className="brand-logo-img"
              width={140}
              height={31}
              loading="lazy"
              decoding="async"
            />
          </Link>
          <button
            className="mobile-close"
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
          >
            &times;
          </button>
        </div>

        <div className="mobile-drawer-body">
          <ul className="mobile-nav-list">
            <li>
              <Link
                href="/"
                className="mobile-nav-link"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </li>

            <li
              className={`mobile-acc-item ${
                openMobileAccordions.about ? "is-open" : ""
              }`}
            >
              <button
                className="mobile-acc-toggle"
                type="button"
                onClick={() => toggleAccordion("about")}
              >
                <span>About Us</span>
                <span className="acc-arrow">&#9662;</span>
              </button>
              <div className="mobile-acc-panel">
                <Link
                  href="/about#story"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Our Story
                </Link>
                <Link
                  href="/about#why-uraanlabs"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Why UraanLabs
                </Link>
                <Link
                  href="/careers"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Careers
                </Link>
              </div>
            </li>

            <li
              className={`mobile-acc-item ${
                openMobileAccordions.services ? "is-open" : ""
              }`}
            >
              <button
                className="mobile-acc-toggle"
                type="button"
                onClick={() => toggleAccordion("services")}
              >
                <span>Services (5 Pillars)</span>
                <span className="acc-arrow">&#9662;</span>
              </button>
              <div className="mobile-acc-panel">
                <Link
                  href="/services"
                  className="mobile-sublink font-bold text-cyan"
                  onClick={() => setMobileOpen(false)}
                >
                  All Services Overview &rarr;
                </Link>
                <div className="mobile-pillar-label">Design &amp; Branding</div>
                <Link
                  href="/services/design-branding"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Explore Design Pillar
                </Link>
                <div className="mobile-pillar-label mt-2">Web &amp; Mobile Apps</div>
                <Link
                  href="/services/web-mobile-apps"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Explore Web &amp; Mobile Apps
                </Link>
                <div className="mobile-pillar-label mt-2">Business Platforms</div>
                <Link
                  href="/services/business-platforms"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Explore Business Platforms
                </Link>
                <div className="mobile-pillar-label mt-2">AI &amp; Automation</div>
                <Link
                  href="/services/ai-automation"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Explore AI &amp; Automation
                </Link>
                <div className="mobile-pillar-label mt-2">Cybersecurity</div>
                <Link
                  href="/services/cybersecurity"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Explore Cybersecurity
                </Link>
              </div>
            </li>

            <li
              className={`mobile-acc-item ${
                openMobileAccordions.industries ? "is-open" : ""
              }`}
            >
              <button
                className="mobile-acc-toggle"
                type="button"
                onClick={() => toggleAccordion("industries")}
              >
                <span>Industries</span>
                <span className="acc-arrow">&#9662;</span>
              </button>
              <div className="mobile-acc-panel">
                <Link
                  href="/industries"
                  className="mobile-sublink font-bold text-cyan"
                  onClick={() => setMobileOpen(false)}
                >
                  All 7 Industries &rarr;
                </Link>
                <Link
                  href="/industries#retail"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Retail &amp; E-Commerce
                </Link>
                <Link
                  href="/industries#edtech"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Education (EdTech)
                </Link>
                <Link
                  href="/industries#fintech"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Finance (FinTech)
                </Link>
                <Link
                  href="/industries#healthcare"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Healthcare
                </Link>
                <Link
                  href="/industries#realestate"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Real Estate
                </Link>
                <Link
                  href="/industries#logistics"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Logistics &amp; Supply Chain
                </Link>
                <Link
                  href="/industries#saas"
                  className="mobile-sublink"
                  onClick={() => setMobileOpen(false)}
                >
                  Startups &amp; SaaS
                </Link>
              </div>
            </li>

            <li>
              <Link
                href="/insights"
                className="mobile-nav-link"
                onClick={() => setMobileOpen(false)}
              >
                Insights
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="mobile-nav-link"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="mobile-drawer-footer">
          <Link
            href="/contact"
            className="btn btn-shimmer full-width"
            onClick={() => setMobileOpen(false)}
          >
            Book a Call &rarr;
          </Link>
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`drawer-backdrop ${mobileOpen ? "is-active" : ""}`}
        id="drawerBackdrop"
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      ></div>
    </>
  );
}
