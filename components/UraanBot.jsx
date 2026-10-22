"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const WA_NUMBER = "923170128047";
const WA_DEFAULT_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hello UraanLabs Team, I would like to discuss a project."
)}`;

const DEFAULT_QUICK_CHIPS = [
  { label: "⚡ All Services", query: "What services do you offer?" },
  { label: "🤖 AI & Automation", query: "Tell me about AI Agents and automation" },
  { label: "🛡️ Cybersecurity VAPT", query: "Can you perform a cybersecurity audit and VAPT?" },
  { label: "💻 Web & Mobile Apps", query: "Do you build web and mobile apps?" },
  { label: "📈 Custom ERP / SaaS", query: "Tell me about custom ERP and SaaS platforms" },
  { label: "💬 Chat on WhatsApp", query: "I want to chat with someone on WhatsApp" },
];

function getTimeString() {
  const d = new Date();
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasMatch(text, triggers) {
  return triggers.some((t) => {
    if (t.length <= 4 && !t.includes(" ")) {
      const reg = new RegExp(`(^|[^a-zA-Z0-9])${escapeRegex(t)}([^a-zA-Z0-9]|$)`, "i");
      return reg.test(text);
    }
    return text.includes(t);
  });
}

function resolveBotResponse(rawQuery) {
  const q = rawQuery.toLowerCase().trim();

  // 1. ESCALATION TO HUMAN / SALES / WHATSAPP / PRICING / EXTRA INFORMATION
  const humanTriggers = [
    "whatsapp", "whatsap", "whtsapp", "human", "sales agent", "human agent", "salesman", "sales rep",
    "representative", "talk to human", "talk to someone", "speak to", "speak with", "call me",
    "phone number", "contact number", "phone", "rabta", "baat krni", "insan se", "bande se",
    "extra info", "more info", "extra information", "more details", "custom quote", "proposal",
    "quotation", "pricing", "price", "cost", "budget", "meeting", "consultation", "book a call",
    "schedule a call", "urgent", "hire you", "nda", "email address", "sales team", "office address"
  ];

  if (hasMatch(q, humanTriggers)) {
    return {
      text: "I'd be glad to connect you directly with our <strong>Senior Systems Architect & Solutions Team</strong>! You don't have to wait or navigate junior sales representatives.",
      cta: {
        title: "Direct Engineering Access",
        links: [
          {
            label: "💬 Chat on WhatsApp (+92 317 0128047)",
            url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
              "Hello UraanLabs Team, I would like to discuss a project."
            )}`,
            isWA: true,
          },
          { label: "📅 Book 30-Min Discovery Call", url: "/contact", isPrimary: true },
          { label: "📞 Call Direct +92 317 0128047", url: "tel:+923170128047", isOutline: true },
          { label: "✉️ Email info@uraanlabs.com", url: "mailto:info@uraanlabs.com", isOutline: true },
        ],
      },
      chips: [
        { label: "⚡ Browse Services", query: "What services do you offer?" },
        { label: "🏢 About Founder & Team", query: "Who is the founder of UraanLabs?" },
      ],
    };
  }

  // 2. AI & AUTOMATION
  const aiTriggers = [
    "ai", "artificial intelligence", "automation", "ai agent", "ai agents", "autonomous agent",
    "chatbot", "chatbots", "voice bot", "voice assistant", "rag", "llm", "langchain", "n8n", "vector database"
  ];
  if (hasMatch(q, aiTriggers)) {
    return {
      text: "We engineer <strong>production-grade AI & Automation systems</strong> with deterministic guarantees (zero brittle wrappers):<br><br>• <strong>Autonomous AI Agents:</strong> Multi-agent workflows with JSON Schema verification.<br>• <strong>Deterministic RAG:</strong> 1536-D vector search with strict source attribution.<br>• <strong>AI Voice & Chatbots:</strong> Sub-second conversational bots for customer service & sales.<br>• <strong>Workflow Automation:</strong> End-to-end operational pipeline orchestration with n8n & Python.",
      cta: {
        title: "AI & Automation Solutions",
        links: [
          { label: "🤖 AI & Automation Overview", url: "/services/ai-automation", isPrimary: true },
          { label: "⚡ Autonomous AI Agents", url: "/services/autonomous-ai-agents", isOutline: true },
          { label: "💬 AI Chatbots", url: "/services/ai-chatbots", isOutline: true },
          {
            label: "🚀 Discuss AI on WhatsApp",
            url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
              "Hello UraanLabs, I am interested in your AI & Automation solutions."
            )}`,
            isWA: true,
          },
        ],
      },
      chips: [
        { label: "🛡️ Cybersecurity Audits", query: "Tell me about cybersecurity audits" },
        { label: "💻 Web & Mobile Apps", query: "Do you build web and mobile apps?" },
        { label: "💬 Connect on WhatsApp", query: "Connect me with someone on WhatsApp" },
      ],
    };
  }

  // 3. CYBERSECURITY & AUDITS
  const secTriggers = [
    "security", "cyber", "audit", "audits", "vapt", "penetration", "pentest", "hacker", "hacking",
    "soc 2", "iso 27001", "code review", "source code review", "owasp", "compliance"
  ];
  if (hasMatch(q, secTriggers)) {
    return {
      text: "Our <strong>Cybersecurity & Code Audit practice</strong> hardens critical digital infrastructure against modern threats:<br><br>• <strong>Full-Scope VAPT:</strong> Web, API, mobile & network penetration testing.<br>• <strong>White-Box Source Code Review:</strong> Line-by-line manual & SAST vulnerability auditing.<br>• <strong>Zero-Trust Cloud Architecture:</strong> Hardened AWS/GCP IAM policies & network segmentation.<br>• <strong>Enterprise Compliance:</strong> ISO/IEC 27001, SOC 2 Type II & OWASP ASVS 4.0 audit readiness.",
      cta: {
        title: "Cybersecurity Audits",
        links: [
          { label: "🛡️ Cybersecurity Overview", url: "/services/cybersecurity", isPrimary: true },
          { label: "🔍 Penetration Testing (VAPT)", url: "/services/penetration-testing-vapt", isOutline: true },
          { label: "📄 Source Code Review", url: "/services/source-code-review", isOutline: true },
          {
            label: "🚀 Request Audit via WhatsApp",
            url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
              "Hello UraanLabs, I need a security audit / VAPT consultation."
            )}`,
            isWA: true,
          },
        ],
      },
      chips: [
        { label: "📈 Business Platforms", query: "Tell me about custom ERP and SaaS" },
        { label: "💬 Connect on WhatsApp", query: "I want to chat on WhatsApp" },
      ],
    };
  }

  // 4. WEB & MOBILE APPS
  const appTriggers = [
    "web", "website", "mobile", "app", "apps", "ios", "android", "flutter", "react", "nextjs",
    "next.js", "frontend", "backend", "pwa", "api integration"
  ];
  if (hasMatch(q, appTriggers)) {
    return {
      text: "We build <strong>high-performance Web & Mobile Applications</strong> engineered for velocity, offline capability, and enterprise scale:<br><br>• <strong>Modern Web Apps:</strong> Next.js 15, React, Node.js, and edge computing with &lt;100ms TTFB.<br>• <strong>Native & Cross-Platform Mobile:</strong> Flutter, React Native, Swift (iOS) & Kotlin (Android).<br>• <strong>Progressive Web Apps (PWA):</strong> App-like speed, offline CRDT syncing, and installability.<br>• <strong>Scalable API Backends:</strong> RESTful, GraphQL & event-driven microservices.",
      cta: {
        title: "Web & Mobile Engineering",
        links: [
          { label: "💻 Web & Mobile Apps Overview", url: "/services/web-mobile-apps", isPrimary: true },
          { label: "🚀 Custom Web Apps", url: "/services/custom-web-apps", isOutline: true },
          { label: "📱 Mobile App Development", url: "/services/mobile-apps", isOutline: true },
          {
            label: "💬 Talk to App Architect",
            url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
              "Hello UraanLabs, I would like to build a web or mobile app."
            )}`,
            isWA: true,
          },
        ],
      },
      chips: [
        { label: "🎨 UI/UX Design", query: "Tell me about UI/UX design and Figma" },
        { label: "🤖 AI & Automation", query: "Tell me about AI automation" },
        { label: "💬 Chat on WhatsApp", query: "Connect me with someone on WhatsApp" },
      ],
    };
  }

  // 5. BUSINESS PLATFORMS
  const platformTriggers = [
    "erp", "crm", "saas", "ecommerce", "e-commerce", "online store", "marketplace", "lms", "portal",
    "platform", "platforms", "inventory", "billing", "financial ledger"
  ];
  if (hasMatch(q, platformTriggers)) {
    return {
      text: "We build <strong>Mission-Critical Custom Business Platforms</strong> designed to eliminate manual bottlenecks and scale operations:<br><br>• <strong>Custom ERP Systems:</strong> Multi-warehouse inventory, double-entry financial ledger & supply chain.<br>• <strong>Custom CRM Solutions:</strong> Lead scoring, omni-channel pipelines & automated follow-ups.<br>• <strong>Multi-Tenant SaaS:</strong> Subscription billing, role-based access control & tenant isolation.<br>• <strong>High-Throughput E-Commerce:</strong> Custom headless storefronts & B2B marketplace engines.",
      cta: {
        title: "Custom Business Platforms",
        links: [
          { label: "📈 Business Platforms Overview", url: "/services/business-platforms", isPrimary: true },
          { label: "🏢 Custom ERP Systems", url: "/services/custom-erp-systems", isOutline: true },
          { label: "☁️ SaaS Development", url: "/services/saas-development", isOutline: true },
          {
            label: "🚀 Discuss Platform on WhatsApp",
            url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
              "Hello UraanLabs, I want to build a custom business platform / ERP."
            )}`,
            isWA: true,
          },
        ],
      },
      chips: [
        { label: "🛡️ Cybersecurity VAPT", query: "Can you perform a cybersecurity audit?" },
        { label: "📅 Book a Call", query: "I want to book an engineering call" },
      ],
    };
  }

  // 6. DESIGN & BRANDING
  const designTriggers = [
    "design", "ui", "ux", "figma", "branding", "brand", "logo", "prototype", "prototyping",
    "wireframe", "stationery"
  ];
  if (hasMatch(q, designTriggers)) {
    return {
      text: "Our <strong>Design & Branding Studio</strong> pairs aesthetic mastery with systematic engineering rigor:<br><br>• <strong>High-Craft UI/UX Design:</strong> Scalable Figma design tokens, user journeys & micro-interactions.<br>• <strong>Interactive Prototyping:</strong> High-fidelity clickable prototypes tested for conversion.<br>• <strong>Brand Identity Systems:</strong> Comprehensive visual identity guidelines, palettes & typography.<br>• <strong>Corporate Collateral:</strong> Logo design, print stationery & digital brand kits.",
      cta: {
        title: "Design & Branding Services",
        links: [
          { label: "🎨 UI/UX Design & Branding", url: "/services/design-branding", isPrimary: true },
          { label: "✨ UI/UX Product Design", url: "/services/ui-ux-design", isOutline: true },
          { label: "🏷️ Brand Identity & Logos", url: "/services/brand-identity", isOutline: true },
          {
            label: "💬 Share Design Brief on WhatsApp",
            url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
              "Hello UraanLabs, I have a UI/UX or Branding design project."
            )}`,
            isWA: true,
          },
        ],
      },
      chips: [
        { label: "💻 Web & Mobile Apps", query: "Do you build web and mobile apps?" },
        { label: "💬 Chat on WhatsApp", query: "Chat with someone on WhatsApp" },
      ],
    };
  }

  // 7. ABOUT COMPANY / FOUNDER / HQ
  const aboutTriggers = [
    "about", "who are you", "uraanlabs", "usman", "founder", "team", "company", "location", "karachi",
    "office", "experience", "credentials", "story", "vision", "mission"
  ];
  if (hasMatch(q, aboutTriggers)) {
    return {
      text: "<strong>UraanLabs</strong> is a venture engineering studio headquartered in Karachi, Pakistan, delivering mission-critical software globally across 6 international markets (US, UK, UAE, Saudi Arabia, Australia, and Canada).<br><br>Founded by <strong>Usman Ahmed</strong> (Principal Systems Architect), we operate with a strict <em>zero-sales-fluff</em> philosophy—putting senior engineers directly at the table with founders and business leaders from day zero.",
      cta: {
        title: "Learn More About Us",
        links: [
          { label: "🏢 Our Story, Vision & Accreditations", url: "/about", isPrimary: true },
          { label: "✉️ Founder's Letter by Usman Ahmed", url: "/about#founder-message", isOutline: true },
          {
            label: "🚀 Connect with Founder on WhatsApp",
            url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
              "Hello Usman & UraanLabs Team, I would like to connect."
            )}`,
            isWA: true,
          },
        ],
      },
      chips: [
        { label: "⚡ Explore Services", query: "What services do you offer?" },
        { label: "📅 Book a Call", query: "I want to schedule an engineering call" },
      ],
    };
  }

  // 8. SERVICES GENERAL
  const servicesTriggers = [
    "service", "services", "kya kaam", "kya krty", "capabilities", "what do you do", "solutions"
  ];
  if (hasMatch(q, servicesTriggers)) {
    return {
      text: "UraanLabs delivers <strong>5 Core Engineering Pillars</strong> with zero agency bloat:<br><br>1. <strong>UI/UX Design & Branding</strong> (Figma Design Systems & Brand Kits)<br>2. <strong>Web & Mobile Apps</strong> (Next.js, Flutter, React Native, Swift)<br>3. <strong>Business Platforms</strong> (Custom ERP, CRM, SaaS & E-Commerce)<br>4. <strong>AI & Automation</strong> (Autonomous Agents, RAG & Voice Bots)<br>5. <strong>Cybersecurity & Audits</strong> (Full VAPT, Source Code Review & ISO/SOC 2)",
      cta: {
        title: "Browse Services",
        links: [
          { label: "📂 All 34 Specialized Services", url: "/services", isPrimary: true },
          {
            label: "💬 Quick WhatsApp Inquiry",
            url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
              "Hello UraanLabs, I want to learn more about your services."
            )}`,
            isWA: true,
          },
        ],
      },
      chips: DEFAULT_QUICK_CHIPS,
    };
  }

  // DEFAULT / FALLBACK INTENT WITH WHATSAPP ESCALATION
  return {
    text: "Thank you for your inquiry! While I can provide technical details on our 5 core pillars (Design, Web/Mobile Apps, Custom ERP/SaaS, AI Automation, Cybersecurity), for custom project scopes or extra details, our <strong>Senior Systems Architect</strong> can provide an instant direct answer:",
    cta: {
      title: "Speak with Our Engineering Team",
      links: [
        {
          label: "💬 Chat Directly on WhatsApp (+92 317 0128047)",
          url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
            `Hello UraanLabs, I have an inquiry: ${rawQuery}`
          )}`,
          isWA: true,
        },
        { label: "📅 Book 30-Min Engineering Call", url: "/contact", isPrimary: true },
        { label: "📂 Browse Services Directory", url: "/services", isOutline: true },
      ],
    },
    chips: DEFAULT_QUICK_CHIPS,
  };
}

export default function UraanBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize welcome message or load from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("uraan_bot_history_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch (e) {}

    const initial = [
      {
        role: "bot",
        text: "Hello! 👋 I'm <strong>UraanBot</strong>, your AI Engineering Concierge at UraanLabs.<br><br>How can I assist you today? Ask me about our <strong>services</strong>, <strong>tech stack</strong>, <strong>founder & company credentials</strong>, or connect directly with our senior team.",
        time: getTimeString(),
        chips: DEFAULT_QUICK_CHIPS,
      },
    ];
    setMessages(initial);

    // Show floating toast after 3 seconds on first visit
    const timer = setTimeout(() => {
      setShowToast(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Save history on changes
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem("uraan_bot_history_v1", JSON.stringify(messages));
      } catch (e) {}
    }
  }, [messages]);

  // Handle body class for WhatsApp separation
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("chatbot-is-open");
      setShowToast(false);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 150);
    } else {
      document.body.classList.remove("chatbot-is-open");
    }
  }, [isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue.trim();
    if (!text || isTyping) return;

    setInputValue("");
    const userTime = getTimeString();
    const newMessages = [...messages, { role: "user", text, time: userTime }];
    setMessages(newMessages);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = resolveBotResponse(text);
      const botTime = getTimeString();
      setMessages([
        ...newMessages,
        {
          role: "bot",
          text: botResponse.text,
          cta: botResponse.cta,
          time: botTime,
          chips: botResponse.chips,
        },
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleReset = () => {
    const initial = [
      {
        role: "bot",
        text: "Conversation reset! 👋 How else can I help you today?",
        time: getTimeString(),
        chips: DEFAULT_QUICK_CHIPS,
      },
    ];
    setMessages(initial);
    try {
      sessionStorage.removeItem("uraan_bot_history_v1");
    } catch (e) {}
  };

  return (
    <>
      {/* 1. Floating Launcher Button (Pinned Bottom-Right) */}
      <button
        id="uraanChatbotLauncher"
        className={`uraan-chatbot-launcher ${isOpen ? "is-active" : ""}`}
        type="button"
        aria-label="Open UraanLabs Live AI Chatbot"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="launcher-pulse-ring"></div>
        <span className="launcher-live-pip" title="AI Concierge Online"></span>
        {!isOpen ? (
          <svg className="launcher-icon launcher-icon-chat" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        ) : (
          <svg className="launcher-icon launcher-icon-close" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        )}
      </button>

      {/* 2. Floating Callout Toast Pill */}
      {showToast && !isOpen && (
        <div
          id="uraanChatbotToast"
          className="uraan-chatbot-toast"
          onClick={() => {
            setIsOpen(true);
            setShowToast(false);
          }}
        >
          <span>💬 Chat with UraanBot AI • <strong>Online</strong></span>
        </div>
      )}

      {/* 3. Chatbot Window Modal */}
      <div
        id="uraanChatbotWindow"
        className={`uraan-chatbot-window ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-label="UraanLabs AI Systems Concierge"
      >
        <div className="chatbot-header">
          <div className="chatbot-header-left">
            <div className="chatbot-avatar">🤖</div>
            <div className="chatbot-title-wrap">
              <h4>UraanBot Concierge</h4>
              <p>
                <span className="chatbot-live-dot"></span> Senior Systems AI • Karachi HQ
              </p>
            </div>
          </div>
          <div className="chatbot-header-actions">
            <a
              href={WA_DEFAULT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="chatbot-header-btn wa-shortcut"
              title="Chat on WhatsApp"
              aria-label="WhatsApp"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
              </svg>
            </a>
            <button
              type="button"
              className="chatbot-header-btn"
              onClick={handleReset}
              title="Reset Conversation"
              aria-label="Reset"
            >
              ↺
            </button>
            <button
              type="button"
              className="chatbot-header-btn"
              onClick={() => setIsOpen(false)}
              title="Close Chat"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="chatbot-body" id="chatbotBody" ref={chatBodyRef}>
          {messages.map((m, idx) => (
            <div key={idx} className={`chatbot-msg-row ${m.role}`}>
              <div className="chatbot-msg-bubble">
                <span dangerouslySetInnerHTML={{ __html: m.text }} />

                {/* Callout Cards & Action Buttons */}
                {m.cta && m.cta.links && m.cta.links.length > 0 && (
                  <div className="chatbot-card-embed">
                    <div className="chatbot-card-title">
                      {m.cta.title || "Recommended Actions"}
                    </div>
                    {m.cta.links.map((link, lIdx) => {
                      const btnClass = link.isWA
                        ? "wa-btn"
                        : link.isPrimary
                        ? "primary-btn"
                        : "outline-btn";
                      const isExternal =
                        link.isWA ||
                        link.url.startsWith("http") ||
                        link.url.startsWith("tel:") ||
                        link.url.startsWith("mailto:");

                      return isExternal ? (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`chatbot-link-btn ${btnClass}`}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          key={lIdx}
                          href={link.url}
                          className={`chatbot-link-btn ${btnClass}`}
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                )}

                {/* Quick Chips */}
                {m.chips && m.chips.length > 0 && (
                  <div className="chatbot-chips-wrap">
                    {m.chips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="chatbot-chip"
                        onClick={() => handleSendMessage(chip.query)}
                      >
                        {chip.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="chatbot-msg-time">{m.time}</div>
            </div>
          ))}

          {isTyping && (
            <div className="chatbot-typing" id="chatbotTyping">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          )}
        </div>

        <div className="chatbot-footer">
          <form
            className="chatbot-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              className="chatbot-input"
              ref={inputRef}
              placeholder="Ask about services, pricing, WhatsApp..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={isTyping}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
