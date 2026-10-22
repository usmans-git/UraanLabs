/**
 * UraanLabs - Main Interactions & Application Script
 * Precision-engineered for high performance & micro-interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileDrawer();
  initStickyHeader();
  initMegaMenuTabs();
  initDesktopDropdowns();
  initSmoothScrollAndSpy();
  initAccordion();
  initLeadForm();
  initLiveTelemetrySimulator();
  initHero3DParallax();
  initPillars3DParallax();
  initUraanChatbot();
});

/* ==========================================================================
   01. Mobile Navigation Drawer & Accordions
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById("mobileToggle");
  const closeBtn = document.getElementById("mobileClose");
  const drawer = document.getElementById("mobileDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  const closeLinks = drawer ? drawer.querySelectorAll(".mobile-nav-link, .mobile-sublink, .mobile-drawer-footer a") : [];

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add("is-open");
    backdrop.classList.add("is-active");
    drawer.setAttribute("aria-hidden", "false");
    toggleBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-active");
    drawer.setAttribute("aria-hidden", "true");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggleBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

  closeLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  // Mobile Accordion items inside drawer
  const accItems = drawer.querySelectorAll(".mobile-acc-item");
  accItems.forEach((item) => {
    const toggle = item.querySelector(".mobile-acc-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      item.classList.toggle("is-open");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   02. Sticky Header Blur & Scroll Behavior
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  const handleScroll = () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }

    // Dynamic contrast check when scrolling over white / light-crystal sections
    const lightSections = document.querySelectorAll(".section-light");
    if (lightSections.length > 0) {
      const headerRect = header.getBoundingClientRect();
      const headerMiddle = headerRect.top + (headerRect.height / 2 || 35);

      let isOverLight = false;
      for (let i = 0; i < lightSections.length; i++) {
        const secRect = lightSections[i].getBoundingClientRect();
        if (secRect.top <= headerMiddle && secRect.bottom >= headerMiddle) {
          isOverLight = true;
          break;
        }
      }

      header.classList.toggle("is-over-light", isOverLight);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   03. Desktop Mega Menu Tab Switcher (5 Pillars)
   ========================================================================== */
function initMegaMenuTabs() {
  const tabs = document.querySelectorAll(".mega-tab");
  const panels = document.querySelectorAll(".mega-panel");
  const headlineEl = document.getElementById("spotlightHeadline");
  const ctaEl = document.getElementById("spotlightCta");
  if (!tabs.length || !panels.length) return;

  const activateTab = (tab) => {
    const targetId = tab.getAttribute("data-target");
    if (!targetId) return;

    tabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    panels.forEach((p) => {
      p.classList.remove("active");
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add("active");
    }

    const headline = tab.getAttribute("data-headline");
    const ctaUrl = tab.getAttribute("data-cta");
    if (headlineEl && headline) {
      headlineEl.textContent = headline;
    }
    if (ctaEl && ctaUrl) {
      ctaEl.setAttribute("href", ctaUrl);
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener("mouseenter", () => activateTab(tab));
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      activateTab(tab);
    });
  });
}

/* ==========================================================================
   04. Desktop Dropdowns (Keyboard & Click Fallback)
   ========================================================================== */
function initDesktopDropdowns() {
  const dropdownItems = document.querySelectorAll(".nav-item.has-dropdown");

  dropdownItems.forEach((item) => {
    const toggleBtn = item.querySelector(".dropdown-toggle");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const wasOpen = item.classList.contains("is-open");

      // Close all other dropdowns
      dropdownItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          const otherToggle = other.querySelector(".dropdown-toggle");
          if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
        }
      });

      if (wasOpen) {
        item.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-open");
        toggleBtn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Close dropdowns on outside click or Escape
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-dropdown")) {
      dropdownItems.forEach((item) => {
        item.classList.remove("is-open");
        const toggle = item.querySelector(".dropdown-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdownItems.forEach((item) => {
        item.classList.remove("is-open");
        const toggle = item.querySelector(".dropdown-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    }
  });
}

/* ==========================================================================
   05. Smooth Scroll & Deep-Linking to Contact Form
   ========================================================================== */
function initSmoothScrollAndSpy() {
  const navLinks = document.querySelectorAll(".site-header .nav-link");
  const sections = document.querySelectorAll("section[id], header[id]");

  // Pillar mapping for child services
  const servicePillarMap = {
    // Design & Branding
    "design": "Design & Branding",
    "logo-design": "Design & Branding",
    "brand-identity": "Design & Branding",
    "print-stationery": "Design & Branding",
    "ui-ux-design": "Design & Branding",
    "product-prototyping": "Design & Branding",
    "social-creatives": "Design & Branding",
    // Web & Mobile Apps
    "app-dev": "Web & Mobile Apps",
    "business-websites": "Web & Mobile Apps",
    "custom-web-apps": "Web & Mobile Apps",
    "mobile-apps": "Web & Mobile Apps",
    "pwa": "Web & Mobile Apps",
    "api-integrations": "Web & Mobile Apps",
    "maintenance": "Web & Mobile Apps",
    // Business Platforms
    "platforms": "Business Platforms",
    "ecommerce": "Business Platforms",
    "lms": "Business Platforms",
    "custom-erp": "Business Platforms",
    "custom-crm": "Business Platforms",
    "marketplaces": "Business Platforms",
    "saas-dev": "Business Platforms",
    // AI & Automation
    "ai-automation": "AI & Automation",
    "workflow-automation": "AI & Automation",
    "ai-chatbots": "AI & Automation",
    "autonomous-agents": "AI & Automation",
    "voice-assistants": "AI & Automation",
    "custom-llm": "AI & Automation",
    "predictive-ai": "AI & Automation",
    "nlp-ai": "AI & Automation",
    "vision-document-ai": "AI & Automation",
    // Cybersecurity
    "cybersecurity": "Cybersecurity",
    "vapt": "Cybersecurity",
    "code-review": "Cybersecurity",
    "web-app-security": "Cybersecurity",
    "cloud-security": "Cybersecurity",
    "network-audits": "Cybersecurity",
    "api-security": "Cybersecurity",
    "devsecops": "Cybersecurity",
    "compliance": "Cybersecurity"
  };

  // Smooth scroll offset calculation & auto-select service
  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const rawHref = this.getAttribute("href");
      if (!rawHref) return;

      const hashIndex = rawHref.indexOf("#");
      if (hashIndex === -1) return;

      const hashPart = rawHref.substring(hashIndex);
      const [anchorId, queryPart] = hashPart.split("?");

      if (!anchorId || anchorId === "#") return;

      const targetEl = document.querySelector(anchorId);
      if (targetEl) {
        e.preventDefault();

        // Close any open desktop dropdowns
        document.querySelectorAll(".nav-item.has-dropdown.is-open").forEach((item) => {
          item.classList.remove("is-open");
        });

        // Pre-select service in lead form if passed
        if (queryPart && anchorId === "#contact") {
          const params = new URLSearchParams(queryPart);
          const serviceParam = params.get("service");
          const intentParam = params.get("intent");
          const serviceSelect = document.getElementById("service");
          const messageInput = document.getElementById("message");

          if (serviceSelect && serviceParam && servicePillarMap[serviceParam]) {
            serviceSelect.value = servicePillarMap[serviceParam];
          }

          if (intentParam === "careers" && messageInput) {
            messageInput.placeholder = "Tell us about your background, GitHub/portfolio links, and what you would like to build with UraanLabs...";
          }
        }

        const headerHeight = 85;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // IntersectionObserver for scroll spy
  if (!("IntersectionObserver" in window)) return;

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (href === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   06. Interactive FAQ Accordion
   ========================================================================== */
function initAccordion() {
  const accordions = document.querySelectorAll("#faqAccordion, .accordion-wrapper, .faq-modern-list");
  if (!accordions.length) return;

  accordions.forEach((accordion) => {
    const items = accordion.querySelectorAll(".accordion-item");

    items.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      if (!header) return;

      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        // Close all other items for clean accordion UX
        items.forEach((other) => {
          if (other !== item) {
            other.classList.remove("is-open");
            const otherHeader = other.querySelector(".accordion-header");
            if (otherHeader) otherHeader.setAttribute("aria-expanded", "false");
          }
        });

        // Toggle current
        if (isOpen) {
          item.classList.remove("is-open");
          header.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("is-open");
          header.setAttribute("aria-expanded", "true");
        }
      });
    });
  });
}

/* ==========================================================================
   07. Project Inquiry Lead Form with Math Captcha
   ========================================================================== */
function initLeadForm() {
  const form = document.getElementById("leadForm");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const serviceInput = document.getElementById("service");
  const messageInput = document.getElementById("message");
  const captchaInput = document.getElementById("captchaInput");
  const captchaQuestion = document.getElementById("captchaQuestion");
  const refreshBtn = document.getElementById("refreshCaptcha");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const serviceError = document.getElementById("serviceError");
  const messageError = document.getElementById("messageError");
  const captchaError = document.getElementById("captchaError");

  const formSuccess = document.getElementById("formSuccess");
  const formFail = document.getElementById("formFail");

  // Initialize International Telephone Input (Country Flags & Dial Codes)
  let itiInstance = null;
  if (phoneInput && typeof window.intlTelInput === "function") {
    itiInstance = window.intlTelInput(phoneInput, {
      initialCountry: "pk",
      preferredCountries: ["pk", "ae", "sa", "gb", "us", "ca", "au"],
      separateDialCode: true,
      autoPlaceholder: "polite",
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js"
    });
  }

  // Auto-preselect service or careers intent from URL query params
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get("service");
    const intentParam = urlParams.get("intent");

    const paramMap = {
      "design": "Design & Branding",
      "logo-design": "Design & Branding",
      "brand-identity": "Design & Branding",
      "app-dev": "Web & Mobile Apps",
      "business-websites": "Web & Mobile Apps",
      "platforms": "Business Platforms",
      "ecommerce": "Business Platforms",
      "custom-erp": "Business Platforms",
      "ai-automation": "AI & Automation",
      "workflow-automation": "AI & Automation",
      "cybersecurity": "Cybersecurity",
      "vapt": "Cybersecurity"
    };

    if (serviceInput && serviceParam && paramMap[serviceParam]) {
      serviceInput.value = paramMap[serviceParam];
    }

    if (intentParam === "careers" && messageInput) {
      messageInput.placeholder = "Tell us about your background, GitHub/portfolio links, and what you would like to build with UraanLabs...";
    }
  } catch (err) {
    // Ignore URL param parsing errors
  }

  let expectedCaptchaAnswer = 0;

  // Generate a random math challenge (e.g. 7 + 4 = ?)
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    expectedCaptchaAnswer = num1 + num2;
    if (captchaQuestion) {
      captchaQuestion.textContent = `${num1} + ${num2}`;
    }
    if (captchaInput) {
      captchaInput.value = "";
    }
  };

  generateCaptcha();
  if (refreshBtn) refreshBtn.addEventListener("click", generateCaptcha);

  // Email format regex
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset error messages
    if (nameError) nameError.textContent = "";
    if (emailError) emailError.textContent = "";
    if (serviceError) serviceError.textContent = "";
    if (messageError) messageError.textContent = "";
    if (captchaError) captchaError.textContent = "";
    if (formFail) formFail.style.display = "none";
    if (formSuccess) formSuccess.style.display = "none";

    let isValid = true;

    // Validate Name
    const nameVal = nameInput ? nameInput.value.trim() : "";
    if (!nameVal || nameVal.length < 3) {
      if (nameError) nameError.textContent = "Please enter your full name (minimum 3 characters).";
      isValid = false;
    }

    // Validate Email
    const emailVal = emailInput ? emailInput.value.trim() : "";
    if (!emailVal || !isValidEmail(emailVal)) {
      if (emailError) emailError.textContent = "Please enter a valid business email address.";
      isValid = false;
    }

    // Validate Service
    const serviceVal = serviceInput ? serviceInput.value : "";
    if (!serviceVal) {
      if (serviceError) serviceError.textContent = "Please choose a primary capability.";
      isValid = false;
    }

    // Validate Message
    const msgVal = messageInput ? messageInput.value.trim() : "";
    if (!msgVal || msgVal.length < 15) {
      if (messageError) messageError.textContent = "Please share a few details about your project (at least 15 characters).";
      isValid = false;
    }

    // Validate Captcha
    const captchaVal = captchaInput ? parseInt(captchaInput.value.trim(), 10) : NaN;
    if (isNaN(captchaVal) || captchaVal !== expectedCaptchaAnswer) {
      if (captchaError) captchaError.textContent = "Incorrect verification answer. Please try again.";
      isValid = false;
    }

    if (!isValid) {
      if (formFail) formFail.style.display = "block";
      return;
    }

    // If valid: simulate submission state
    const submitBtn = document.getElementById("submitBtn");
    const originalText = submitBtn ? submitBtn.innerHTML : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Submitting Inquiry...</span>";
    }

    setTimeout(() => {
      if (formSuccess) formSuccess.style.display = "block";
      if (formFail) formFail.style.display = "none";
      form.reset();
      if (itiInstance) {
        itiInstance.setCountry("pk");
      }
      generateCaptcha();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }

      // Hide success message after 7 seconds
      setTimeout(() => {
        if (formSuccess) formSuccess.style.display = "none";
      }, 7000);
    }, 800);
  });
}

/* ==========================================================================
   08. Live Telemetry Simulator (Hero Dashboard)
   ========================================================================== */
function initLiveTelemetrySimulator() {
  const sparklineSpans = document.querySelectorAll(".metric-sparkline span");
  if (!sparklineSpans.length) return;

  // Gently randomize sparklines every 3 seconds to give the dashboard a breathing pulse
  setInterval(() => {
    sparklineSpans.forEach((span) => {
      const randomHeight = Math.floor(Math.random() * 65) + 30; // 30% to 95%
      span.style.height = `${randomHeight}%`;
    });
  }, 2800);
}

/* ==========================================================================
   09. Interactive 3D AI & Cybersecurity Parallax Tilt
   ========================================================================== */
function initHero3DParallax() {
  const heroSection = document.querySelector(".hero-section");
  const scene = document.getElementById("cyber3DScene");
  if (!heroSection || !scene) return;

  let currentX = 0, currentY = 0;
  let targetX = 0, targetY = 0;
  let isHovered = false;

  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetX = x * 22; // max tilt degrees on Y axis
    targetY = -y * 18; // max tilt degrees on X axis
    isHovered = true;
  }, { passive: true });

  heroSection.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
    isHovered = false;
  });

  const updateTilt = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    if (isHovered || Math.abs(currentX) > 0.02 || Math.abs(currentY) > 0.02) {
      scene.style.transform = `rotateY(${currentX.toFixed(2)}deg) rotateX(${currentY.toFixed(2)}deg)`;
    } else {
      scene.style.transform = "";
    }
    requestAnimationFrame(updateTilt);
  };

  requestAnimationFrame(updateTilt);
}

/* ==========================================================================
   10. Interactive 3D Pillar Showcase Parallax Tilt (Services Listing Page)
   ========================================================================== */
function initPillars3DParallax() {
  const cards = document.querySelectorAll(".pillar-card-wrapper");
  if (!cards.length) return;

  cards.forEach((card) => {
    const scene = card.querySelector(".pillar-3d-scene");
    if (!scene) return;

    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;
    let isHovered = false;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 20;
      targetY = -y * 16;
      isHovered = true;
    }, { passive: true });

    card.addEventListener("mouseleave", () => {
      targetX = 0;
      targetY = 0;
      isHovered = false;
    });

    const updateTilt = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (isHovered || Math.abs(currentX) > 0.02 || Math.abs(currentY) > 0.02) {
        scene.style.transform = `rotateY(${currentX.toFixed(2)}deg) rotateX(${currentY.toFixed(2)}deg)`;
      } else {
        scene.style.transform = "";
      }
      requestAnimationFrame(updateTilt);
    };

    requestAnimationFrame(updateTilt);
  });
}



/* ==========================================================================
   11. Live AI Concierge Chatbot Widget (UraanBot)
   Intelligent real-time query resolution, service guidance & WhatsApp escalation
   ========================================================================== */
function initUraanChatbot() {
  if (document.getElementById("uraanChatbotLauncher")) return;

  const isSubDir = window.location.pathname.includes("/services/") || window.location.pathname.includes("/insights/");
  const basePath = isSubDir ? "../" : "./";
  const WA_NUMBER = "923170128047";
  const WA_DEFAULT_LINK = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello UraanLabs Team, I would like to discuss a project.");

  // 1. Create Floating Launcher Button
  const launcher = document.createElement("button");
  launcher.id = "uraanChatbotLauncher";
  launcher.className = "uraan-chatbot-launcher";
  launcher.setAttribute("type", "button");
  launcher.setAttribute("aria-label", "Open UraanLabs Live AI Chatbot");
  launcher.innerHTML = `
    <div class="launcher-pulse-ring"></div>
    <span class="launcher-live-pip" title="AI Concierge Online"></span>
    <svg class="launcher-icon launcher-icon-chat" viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
    <svg class="launcher-icon launcher-icon-close" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  `;

  // 2. Create Floating Callout Toast Pill
  const toast = document.createElement("div");
  toast.id = "uraanChatbotToast";
  toast.className = "uraan-chatbot-toast is-hidden";
  toast.innerHTML = `<span>✨ Chat with UraanBot AI • <strong>Online</strong></span>`;

  // 3. Create Chatbot Window Modal
  const modal = document.createElement("div");
  modal.id = "uraanChatbotWindow";
  modal.className = "uraan-chatbot-window";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-label", "UraanLabs AI Systems Concierge");
  modal.innerHTML = `
    <div class="chatbot-header">
      <div class="chatbot-header-left">
        <div class="chatbot-avatar">🤖</div>
        <div class="chatbot-title-wrap">
          <h4>UraanBot Concierge</h4>
          <p><span class="chatbot-live-dot"></span> Senior Systems AI • Karachi HQ</p>
        </div>
      </div>
      <div class="chatbot-header-actions">
        <a href="${WA_DEFAULT_LINK}" target="_blank" rel="noopener noreferrer" class="chatbot-header-btn wa-shortcut" title="Chat on WhatsApp" aria-label="WhatsApp">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/>
          </svg>
        </a>
        <button type="button" class="chatbot-header-btn" id="chatbotResetBtn" title="Reset Conversation" aria-label="Reset">↻</button>
        <button type="button" class="chatbot-header-btn" id="chatbotCloseBtn" title="Close Chat" aria-label="Close">✕</button>
      </div>
    </div>

    <div class="chatbot-body" id="chatbotBody">
      <!-- Dynamic Messages rendered here -->
    </div>

    <div class="chatbot-footer">
      <form class="chatbot-form" id="chatbotForm">
        <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Ask about services, pricing, WhatsApp..." autocomplete="off" />
        <button type="submit" class="chatbot-send-btn" id="chatbotSendBtn" aria-label="Send message">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(launcher);
  document.body.appendChild(toast);
  document.body.appendChild(modal);

  const chatbotBody = document.getElementById("chatbotBody");
  const chatbotForm = document.getElementById("chatbotForm");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotSendBtn = document.getElementById("chatbotSendBtn");
  const chatbotCloseBtn = document.getElementById("chatbotCloseBtn");
  const chatbotResetBtn = document.getElementById("chatbotResetBtn");

  // State Management
  const STORAGE_KEY = "uraan_chatbot_messages_v1";
  let isTyping = false;

  const defaultQuickChips = [
    { label: "⚡ All Services", query: "What services do you offer?" },
    { label: "🤖 AI & Automation", query: "Tell me about AI Agents and automation" },
    { label: "🛡️ Cybersecurity VAPT", query: "Can you perform a cybersecurity audit and VAPT?" },
    { label: "📱 Web & Mobile Apps", query: "Do you build web and mobile apps?" },
    { label: "🏢 Custom ERP / SaaS", query: "Tell me about custom ERP and SaaS platforms" },
    { label: "💬 Chat on WhatsApp", query: "I want to chat with someone on WhatsApp" }
  ];

  function getTimeString() {
    const d = new Date();
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return hours + ":" + minutes + " " + ampm;
  }

  function renderMessage(role, text, cta, time, chips = []) {
    const row = document.createElement("div");
    row.className = "chatbot-msg-row " + role;

    let ctaHtml = "";
    if (cta && cta.links && cta.links.length > 0) {
      ctaHtml = `<div class="chatbot-card-embed"><div class="chatbot-card-title">${cta.title || "Recommended Actions"}</div>`;
      cta.links.forEach(l => {
        const btnClass = l.isWA ? "wa-btn" : (l.isPrimary ? "primary-btn" : "outline-btn");
        const target = (l.isWA || l.url.startsWith("http") || l.url.startsWith("tel:") || l.url.startsWith("mailto:")) ? 'target="_blank" rel="noopener noreferrer"' : "";
        ctaHtml += `<a href="${l.url}" ${target} class="chatbot-link-btn ${btnClass}">${l.label}</a>`;
      });
      ctaHtml += `</div>`;
    }

    let chipsHtml = "";
    if (chips && chips.length > 0) {
      chipsHtml = `<div class="chatbot-chips-wrap">`;
      chips.forEach(c => {
        chipsHtml += `<span class="chatbot-chip" data-query="${c.query}">${c.label}</span>`;
      });
      chipsHtml += `</div>`;
    }

    row.innerHTML = `
      <div class="chatbot-msg-bubble">
        ${text}
        ${ctaHtml}
        ${chipsHtml}
      </div>
      <div class="chatbot-msg-time">${time || getTimeString()}</div>
    `;

    chatbotBody.appendChild(row);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;

    // Attach chip event listeners
    row.querySelectorAll(".chatbot-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const q = chip.getAttribute("data-query");
        if (q) handleUserQuery(q);
      });
    });
  }

  function showTypingIndicator() {
    const typing = document.createElement("div");
    typing.id = "chatbotTyping";
    typing.className = "chatbot-typing";
    typing.innerHTML = `
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    `;
    chatbotBody.appendChild(typing);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  function removeTypingIndicator() {
    const el = document.getElementById("chatbotTyping");
    if (el) el.remove();
  }

  function saveHistory(messages) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {}
  }

  function loadHistory() {
    try {
      const data = sessionStorage.getItem(STORAGE_KEY);
      if (data) {
        const messages = JSON.parse(data);
        if (Array.isArray(messages) && messages.length > 0) {
          messages.forEach(m => renderMessage(m.role, m.text, m.cta, m.time, m.chips));
          return true;
        }
      }
    } catch (e) {}
    return false;
  }

  function initWelcomeMessage() {
    const initialText = "Hello! 👋 I'm <strong>UraanBot</strong>, your AI Engineering Concierge at UraanLabs.<br><br>How can I assist you today? Ask me about our <strong>services</strong>, <strong>tech stack</strong>, <strong>founder & company credentials</strong>, or connect directly with our senior team.";
    renderMessage("bot", initialText, null, getTimeString(), defaultQuickChips);
    saveHistory([{ role: "bot", text: initialText, cta: null, time: getTimeString(), chips: defaultQuickChips }]);
  }

  // --- NLP & INTENT RESOLUTION ENGINE ---
  function escapeRegex(string) {
    return string.replace(/[.*+?^$${}()|[\]\\]/g, "\\$&");
  }

  function hasMatch(text, triggers) {
    return triggers.some(t => {
      if (t.length <= 4 && !t.includes(" ")) {
        const reg = new RegExp("(^|[^a-zA-Z0-9])" + escapeRegex(t) + "([^a-zA-Z0-9]|$)", "i");
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
            { label: "💬 Chat on WhatsApp (+92 317 0128047)", url: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello UraanLabs Team, I would like to discuss a project."), isWA: true },
            { label: "📅 Book 30-Min Discovery Call", url: basePath + "contact.html", isPrimary: true },
            { label: "📞 Call Direct +92 317 0128047", url: "tel:+923170128047", isOutline: true },
            { label: "✉️ Email info@uraanlabs.com", url: "mailto:info@uraanlabs.com", isOutline: true }
          ]
        },
        chips: [
          { label: "⚡ Browse Services", query: "What services do you offer?" },
          { label: "🏢 About Founder & Team", query: "Who is the founder of UraanLabs?" }
        ]
      };
    }

    // 2. AI & AUTOMATION
    const aiTriggers = ["ai", "artificial intelligence", "automation", "ai agent", "ai agents", "autonomous agent", "chatbot", "chatbots", "voice bot", "voice assistant", "rag", "llm", "langchain", "n8n", "vector database"];
    if (hasMatch(q, aiTriggers)) {
      return {
        text: "We engineer <strong>production-grade AI & Automation systems</strong> with deterministic guarantees (zero brittle wrappers):<br><br>• <strong>Autonomous AI Agents:</strong> Multi-agent workflows with JSON Schema verification.<br>• <strong>Deterministic RAG:</strong> 1536-D vector search with strict source attribution.<br>• <strong>AI Voice & Chatbots:</strong> Sub-second conversational bots for customer service & sales.<br>• <strong>Workflow Automation:</strong> End-to-end operational pipeline orchestration with n8n & Python.",
        cta: {
          title: "AI & Automation Solutions",
          links: [
            { label: "🤖 AI & Automation Overview", url: basePath + "services/ai-automation.html", isPrimary: true },
            { label: "⚡ Autonomous AI Agents", url: basePath + "services/autonomous-ai-agents.html", isOutline: true },
            { label: "💬 AI Chatbots", url: basePath + "services/ai-chatbots.html", isOutline: true },
            { label: "🟢 Discuss AI on WhatsApp", url: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello UraanLabs, I am interested in your AI & Automation solutions."), isWA: true }
          ]
        },
        chips: [
          { label: "🛡️ Cybersecurity Audits", query: "Tell me about cybersecurity audits" },
          { label: "📱 Web & Mobile Apps", query: "Do you build web and mobile apps?" },
          { label: "💬 Connect on WhatsApp", query: "Connect me with someone on WhatsApp" }
        ]
      };
    }

    // 3. CYBERSECURITY & AUDITS
    const secTriggers = ["security", "cyber", "audit", "audits", "vapt", "penetration", "pentest", "hacker", "hacking", "soc 2", "iso 27001", "code review", "source code review", "owasp", "compliance"];
    if (hasMatch(q, secTriggers)) {
      return {
        text: "Our <strong>Cybersecurity & Code Audit practice</strong> hardens critical digital infrastructure against modern threats:<br><br>• <strong>Full-Scope VAPT:</strong> Web, API, mobile & network penetration testing.<br>• <strong>White-Box Source Code Review:</strong> Line-by-line manual & SAST vulnerability auditing.<br>• <strong>Zero-Trust Cloud Architecture:</strong> Hardened AWS/GCP IAM policies & network segmentation.<br>• <strong>Enterprise Compliance:</strong> ISO/IEC 27001, SOC 2 Type II & OWASP ASVS 4.0 audit readiness.",
        cta: {
          title: "Cybersecurity Audits",
          links: [
            { label: "🛡️ Cybersecurity Overview", url: basePath + "services/cybersecurity.html", isPrimary: true },
            { label: "🔍 Penetration Testing (VAPT)", url: basePath + "services/penetration-testing-vapt.html", isOutline: true },
            { label: "📜 Source Code Review", url: basePath + "services/source-code-review.html", isOutline: true },
            { label: "🟢 Request Audit via WhatsApp", url: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello UraanLabs, I need a security audit / VAPT consultation."), isWA: true }
          ]
        },
        chips: [
          { label: "🏢 Business Platforms", query: "Tell me about custom ERP and SaaS" },
          { label: "💬 Connect on WhatsApp", query: "I want to chat on WhatsApp" }
        ]
      };
    }

    // 4. WEB & MOBILE APPS
    const appTriggers = ["web", "website", "mobile", "app", "apps", "ios", "android", "flutter", "react", "nextjs", "next.js", "frontend", "backend", "pwa", "api integration"];
    if (hasMatch(q, appTriggers)) {
      return {
        text: "We build <strong>high-performance Web & Mobile Applications</strong> engineered for velocity, offline capability, and enterprise scale:<br><br>• <strong>Modern Web Apps:</strong> Next.js 15, React, Node.js, and edge computing with &lt;100ms TTFB.<br>• <strong>Native & Cross-Platform Mobile:</strong> Flutter, React Native, Swift (iOS) & Kotlin (Android).<br>• <strong>Progressive Web Apps (PWA):</strong> App-like speed, offline CRDT syncing, and installability.<br>• <strong>Scalable API Backends:</strong> RESTful, GraphQL & event-driven microservices.",
        cta: {
          title: "Web & Mobile Engineering",
          links: [
            { label: "📱 Web & Mobile Apps Overview", url: basePath + "services/web-mobile-apps.html", isPrimary: true },
            { label: "💻 Custom Web Apps", url: basePath + "services/custom-web-apps.html", isOutline: true },
            { label: "📲 Mobile App Development", url: basePath + "services/mobile-apps.html", isOutline: true },
            { label: "🟢 Talk to App Architect", url: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello UraanLabs, I would like to build a web or mobile app."), isWA: true }
          ]
        },
        chips: [
          { label: "🎨 UI/UX Design", query: "Tell me about UI/UX design and Figma" },
          { label: "🤖 AI & Automation", query: "Tell me about AI automation" },
          { label: "💬 Chat on WhatsApp", query: "Connect me with someone on WhatsApp" }
        ]
      };
    }

    // 5. BUSINESS PLATFORMS
    const platformTriggers = ["erp", "crm", "saas", "ecommerce", "e-commerce", "online store", "marketplace", "lms", "portal", "platform", "platforms", "inventory", "billing", "financial ledger"];
    if (hasMatch(q, platformTriggers)) {
      return {
        text: "We build <strong>Mission-Critical Custom Business Platforms</strong> designed to eliminate manual bottlenecks and scale operations:<br><br>• <strong>Custom ERP Systems:</strong> Multi-warehouse inventory, double-entry financial ledger & supply chain.<br>• <strong>Custom CRM Solutions:</strong> Lead scoring, omni-channel pipelines & automated follow-ups.<br>• <strong>Multi-Tenant SaaS:</strong> Subscription billing, role-based access control & tenant isolation.<br>• <strong>High-Throughput E-Commerce:</strong> Custom headless storefronts & B2B marketplace engines.",
        cta: {
          title: "Custom Business Platforms",
          links: [
            { label: "🏢 Business Platforms Overview", url: basePath + "services/business-platforms.html", isPrimary: true },
            { label: "⚙️ Custom ERP Systems", url: basePath + "services/custom-erp-systems.html", isOutline: true },
            { label: "🚀 SaaS Development", url: basePath + "services/saas-development.html", isOutline: true },
            { label: "🟢 Discuss Platform on WhatsApp", url: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello UraanLabs, I want to build a custom business platform / ERP."), isWA: true }
          ]
        },
        chips: [
          { label: "🛡️ Cybersecurity VAPT", query: "Can you perform a cybersecurity audit?" },
          { label: "📅 Book a Call", query: "I want to book an engineering call" }
        ]
      };
    }

    // 6. DESIGN & BRANDING
    const designTriggers = ["design", "ui", "ux", "figma", "branding", "brand", "logo", "prototype", "prototyping", "wireframe", "stationery"];
    if (hasMatch(q, designTriggers)) {
      return {
        text: "Our <strong>Design & Branding Studio</strong> pairs aesthetic mastery with systematic engineering rigor:<br><br>• <strong>High-Craft UI/UX Design:</strong> Scalable Figma design tokens, user journeys & micro-interactions.<br>• <strong>Interactive Prototyping:</strong> High-fidelity clickable prototypes tested for conversion.<br>• <strong>Brand Identity Systems:</strong> Comprehensive visual identity guidelines, palettes & typography.<br>• <strong>Corporate Collateral:</strong> Logo design, print stationery & digital brand kits.",
        cta: {
          title: "Design & Branding Services",
          links: [
            { label: "🎨 UI/UX Design & Branding", url: basePath + "services/design-branding.html", isPrimary: true },
            { label: "✨ UI/UX Product Design", url: basePath + "services/ui-ux-design.html", isOutline: true },
            { label: "💠 Brand Identity & Logos", url: basePath + "services/brand-identity.html", isOutline: true },
            { label: "🟢 Share Design Brief on WhatsApp", url: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello UraanLabs, I have a UI/UX or Branding design project."), isWA: true }
          ]
        },
        chips: [
          { label: "📱 Web & Mobile Apps", query: "Do you build web and mobile apps?" },
          { label: "💬 Chat on WhatsApp", query: "Chat with someone on WhatsApp" }
        ]
      };
    }

    // 7. ABOUT COMPANY / FOUNDER / HQ
    const aboutTriggers = ["about", "who are you", "uraanlabs", "usman", "founder", "team", "company", "location", "karachi", "office", "experience", "credentials", "story", "vision", "mission"];
    if (hasMatch(q, aboutTriggers)) {
      return {
        text: "<strong>UraanLabs</strong> is a venture engineering studio headquartered in Karachi, Pakistan, delivering mission-critical software globally across 6 international markets (US, UK, UAE, Saudi Arabia, Australia, and Canada).<br><br>Founded by <strong>Usman Ahmed</strong> (Principal Systems Architect), we operate with a strict <em>zero-sales-fluff</em> philosophy—putting senior engineers directly at the table with founders and business leaders from day zero.",
        cta: {
          title: "Learn More About Us",
          links: [
            { label: "🏢 Our Story, Vision & Accreditations", url: basePath + "about.html", isPrimary: true },
            { label: "✉️ Founder's Letter by Usman Ahmed", url: basePath + "about.html#founder-message", isOutline: true },
            { label: "🟢 Connect with Founder on WhatsApp", url: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello Usman & UraanLabs Team, I would like to connect."), isWA: true }
          ]
        },
        chips: [
          { label: "⚡ Explore Services", query: "What services do you offer?" },
          { label: "📅 Book a Call", query: "I want to schedule an engineering call" }
        ]
      };
    }

    // 8. SERVICES GENERAL
    const servicesTriggers = ["service", "services", "kya kaam", "kya krty", "capabilities", "what do you do", "solutions"];
    if (hasMatch(q, servicesTriggers)) {
      return {
        text: "UraanLabs delivers <strong>5 Core Engineering Pillars</strong> with zero agency bloat:<br><br>1️⃣ <strong>UI/UX Design & Branding</strong> (Figma Design Systems & Brand Kits)<br>2️⃣ <strong>Web & Mobile Apps</strong> (Next.js 15, Flutter, React Native, Swift)<br>3️⃣ <strong>Business Platforms</strong> (Custom ERP, CRM, SaaS & E-Commerce)<br>4️⃣ <strong>AI & Automation</strong> (Autonomous Agents, RAG & Voice Bots)<br>5️⃣ <strong>Cybersecurity & Audits</strong> (Full VAPT, Source Code Review & ISO/SOC 2)",
        cta: {
          title: "Browse Services",
          links: [
            { label: "🌐 All 34 Specialized Services", url: basePath + "services.html", isPrimary: true },
            { label: "💬 Quick WhatsApp Inquiry", url: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello UraanLabs, I want to learn more about your services."), isWA: true }
          ]
        },
        chips: [
          { label: "🤖 AI & Automation", query: "Tell me about AI Agents and automation" },
          { label: "🛡️ Cybersecurity", query: "Tell me about cybersecurity audits" },
          { label: "📱 Mobile Apps", query: "Do you build mobile apps?" }
        ]
      };
    }

    // 9. GREETINGS
    const greetTriggers = ["hi", "hello", "hey", "salam", "assalam", "kese ho", "kaise ho", "good morning", "good evening", "good afternoon"];
    if (hasMatch(q, greetTriggers)) {
      return {
        text: "Hello! 👋 Welcome to <strong>UraanLabs</strong>. I'm your AI Architectural Concierge.<br><br>How can I assist you today? You can ask me about our <strong>engineering services</strong>, <strong>pricing & timeline</strong>, <strong>founder & company credentials</strong>, or connect directly with our senior team.",
        cta: {
          title: "Quick Options",
          links: [
            { label: "⚡ Explore Our Services", url: basePath + "services.html", isPrimary: true },
            { label: "💬 Speak with Team on WhatsApp", url: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello UraanLabs Team, I am exploring your services."), isWA: true }
          ]
        },
        chips: defaultQuickChips
      };
    }

    // 10. THANKS
    const thanksTriggers = ["thank", "thanks", "shukriya", "jazakallah"];
    if (hasMatch(q, thanksTriggers)) {
      return {
        text: "You're very welcome! 😊 Feel free to ask if you have any more questions about our architecture, tech stack, or upcoming projects. Our team is always one message away!",
        cta: {
          title: "Connect with Us",
          links: [
            { label: "💬 Chat on WhatsApp", url: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello UraanLabs Team!"), isWA: true },
            { label: "📅 Book a Call", url: basePath + "contact.html", isOutline: true }
          ]
        },
        chips: defaultQuickChips
      };
    }

    // 11. FALLBACK / UNKNOWN
    return {
      text: "Thank you for your inquiry! While I can provide technical details on our 5 core pillars (Design, Web/Mobile Apps, Custom ERP/SaaS, AI Automation, Cybersecurity), for custom project scopes or extra details, our <strong>Senior Systems Architect</strong> can provide an instant direct answer:",
      cta: {
        title: "Speak with Our Engineering Team",
        links: [
          { label: "💬 Chat Directly on WhatsApp (+92 317 0128047)", url: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hello UraanLabs, I have an inquiry: " + rawQuery), isWA: true },
          { label: "📅 Book 30-Min Engineering Call", url: basePath + "contact.html", isPrimary: true },
          { label: "🌐 Browse Services Directory", url: basePath + "services.html", isOutline: true }
        ]
      },
      chips: defaultQuickChips
    };
  }

  function handleUserQuery(userText) {
    if (!userText || isTyping) return;
    isTyping = true;
    chatbotSendBtn.disabled = true;

    // 1. Render User Message
    const userTime = getTimeString();
    renderMessage("user", userText, null, userTime);

    // Save user message to history
    let history = [];
    try {
      history = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {}
    history.push({ role: "user", text: userText, cta: null, time: userTime });
    saveHistory(history);

    // 2. Show Typing Indicator
    showTypingIndicator();

    // 3. Resolve & Render Bot Response after natural delay
    setTimeout(() => {
      removeTypingIndicator();
      const botResponse = resolveBotResponse(userText);
      const botTime = getTimeString();
      renderMessage("bot", botResponse.text, botResponse.cta, botTime, botResponse.chips);

      // Save bot message to history
      history.push({ role: "bot", text: botResponse.text, cta: botResponse.cta, time: botTime, chips: botResponse.chips });
      saveHistory(history);

      isTyping = false;
      chatbotSendBtn.disabled = false;
      chatbotInput.focus();
    }, 450);
  }

  // Event Listeners
  launcher.addEventListener("click", () => {
    const isOpen = modal.classList.toggle("is-open");
    launcher.classList.toggle("is-active", isOpen);
    toast.classList.add("is-hidden");
    if (isOpen) {
      setTimeout(() => chatbotInput.focus(), 150);
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
  });

  toast.addEventListener("click", () => {
    modal.classList.add("is-open");
    launcher.classList.add("is-active");
    toast.classList.add("is-hidden");
    setTimeout(() => chatbotInput.focus(), 150);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  });

  chatbotCloseBtn.addEventListener("click", () => {
    modal.classList.remove("is-open");
    launcher.classList.remove("is-active");
  });

  chatbotResetBtn.addEventListener("click", () => {
    chatbotBody.innerHTML = "";
    sessionStorage.removeItem(STORAGE_KEY);
    initWelcomeMessage();
  });

  chatbotForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatbotInput.value.trim();
    if (text) {
      chatbotInput.value = "";
      handleUserQuery(text);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      modal.classList.remove("is-open");
      launcher.classList.remove("is-active");
    }
  });

  // Load existing history or start with greeting
  if (!loadHistory()) {
    initWelcomeMessage();
  }

  // Toast pill appearance (shows once after 3.5s)
  setTimeout(() => {
    if (!modal.classList.contains("is-open")) {
      toast.classList.remove("is-hidden");
      setTimeout(() => {
        toast.classList.add("is-hidden");
      }, 7000);
    }
  }, 3500);
}
