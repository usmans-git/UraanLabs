# UraanLabs — Next-Gen Software Engineering, AI & Cybersecurity Studio

Official repository and source code for **UraanLabs** (`uraanlabs.com`), engineered with **Next.js 14 App Router**, static-site generation (SSG), interactive WebGL/CSS 3D parallax, and an integrated real-time AI concierge.

---

## 🚀 Overview

- **Studio**: UraanLabs
- **Founding Architect**: Usman Ahmed
- **Headquarters**: Karachi, Pakistan (Serving Global Clients in US, UK, UAE, Saudi Arabia, Canada, Australia)
- **Framework**: Next.js 14 (App Router) with React 18 & SSG
- **Primary Pillars**:
  1. **UI/UX Design & Branding** (6 Core Services)
  2. **Web & Mobile Apps** (6 Core Services)
  3. **Business Platforms** (6 Core Services — ERP, CRM, LMS, SaaS)
  4. **AI & Automation** (8 Core Services — Autonomous Agents, RAG, Voice Bots)
  5. **Cybersecurity & Audits** (8 Core Services — VAPT, Code Reviews, Zero-Trust Cloud)

---

## 🛠️ Project Structure

```text
UraanLabs/
├── app/
│   ├── about/             # /about (Story, Team, Credentials)
│   ├── careers/           # /careers
│   ├── contact/           # /contact
│   ├── industries/        # /industries (7 enterprise sectors)
│   ├── insights/          # /insights (Technical articles & blog)
│   │   └── [slug]/        # /insights/[slug] (8 dynamic technical deep-dives)
│   ├── privacy/           # /privacy
│   ├── services/          # /services (Directory of 5 pillars)
│   │   └── [slug]/        # /services/[slug] (39 dynamic pillar & child services)
│   ├── terms/             # /terms
│   ├── globals.css        # Minimal Monochrome Obsidian & Sonic Cyan design system
│   ├── layout.jsx         # Root layout with Header, Footer, UraanBot & WhatsApp
│   └── page.jsx           # Homepage with 3D centerpiece, telemetry & case studies
├── components/
│   ├── ClientEffects.jsx  # Parallax 3D tilt, telemetry simulation, FAQ accordions, captcha
│   ├── FloatingWhatsApp.jsx # Pinned to bottom-left (zero-overlap)
│   ├── Footer.jsx         # 5-column responsive footer
│   ├── Header.jsx         # 2-column mega menu, dropdowns, and mobile drawer
│   └── UraanBot.jsx       # Real-time NLP conversational AI concierge (pinned bottom-right)
├── data/
│   ├── insightsData.json  # 8 complete articles with author and schema data
│   ├── pagesData.json     # All root page contents & JSON-LD schemas
│   └── servicesData.json  # All 39 service definitions, deliverables, and FAQs
├── public/
│   ├── images/            # Brand marks, vector icons, diagrams & UI assets
│   └── robots.txt
├── next.config.mjs        # Production config with URL rewrites
└── package.json           # Project manifest
```

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Production Build (59 pre-rendered SSG routes)
npm run build

# 4. Start production server
npm run start
```

---

## 🔒 Security & Performance

- **Zero-Trust & Bank-Grade Hardening**: Implements OWASP ASVS and zero external telemetry leakages.
- **Micro-Interactions**: Custom hardware-accelerated 3D parallax without bulky third-party libraries.
- **Strict Brand Design System**: Minimal Monochrome Obsidian canvas (`#060913`) with precision Sonic Cyan (`#38BDF8`) optical accents.
