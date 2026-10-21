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

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  }, { passive: true });
}

/* ==========================================================================
   03. Desktop Mega Menu Tab Switcher (5 Pillars)
   ========================================================================== */
function initMegaMenuTabs() {
  const tabs = document.querySelectorAll(".mega-tab");
  const panels = document.querySelectorAll(".mega-panel");
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
    "design": "1. Design & Branding",
    "logo-design": "1. Design & Branding",
    "brand-identity": "1. Design & Branding",
    "print-stationery": "1. Design & Branding",
    "ui-ux-design": "1. Design & Branding",
    "product-prototyping": "1. Design & Branding",
    "social-creatives": "1. Design & Branding",
    // Web & Mobile Apps
    "app-dev": "2. Web & Mobile Apps",
    "business-websites": "2. Web & Mobile Apps",
    "custom-web-apps": "2. Web & Mobile Apps",
    "mobile-apps": "2. Web & Mobile Apps",
    "pwa": "2. Web & Mobile Apps",
    "api-integrations": "2. Web & Mobile Apps",
    "maintenance": "2. Web & Mobile Apps",
    // Business Platforms
    "platforms": "3. Business Platforms",
    "ecommerce": "3. Business Platforms",
    "lms": "3. Business Platforms",
    "custom-erp": "3. Business Platforms",
    "custom-crm": "3. Business Platforms",
    "marketplaces": "3. Business Platforms",
    "saas-dev": "3. Business Platforms",
    // AI & Automation
    "ai-automation": "4. AI & Automation",
    "workflow-automation": "4. AI & Automation",
    "ai-chatbots": "4. AI & Automation",
    "autonomous-agents": "4. AI & Automation",
    "voice-assistants": "4. AI & Automation",
    "custom-llm": "4. AI & Automation",
    "predictive-ai": "4. AI & Automation",
    "nlp-ai": "4. AI & Automation",
    "vision-document-ai": "4. AI & Automation",
    // Cybersecurity
    "cybersecurity": "5. Cybersecurity",
    "vapt": "5. Cybersecurity",
    "code-review": "5. Cybersecurity",
    "web-app-security": "5. Cybersecurity",
    "cloud-security": "5. Cybersecurity",
    "network-audits": "5. Cybersecurity",
    "api-security": "5. Cybersecurity",
    "devsecops": "5. Cybersecurity",
    "compliance": "5. Cybersecurity"
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
  const accordion = document.getElementById("faqAccordion");
  if (!accordion) return;

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

  // Auto-preselect service or careers intent from URL query params
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get("service");
    const intentParam = urlParams.get("intent");

    const paramMap = {
      "design": "1. Design & Branding",
      "logo-design": "1. Design & Branding",
      "brand-identity": "1. Design & Branding",
      "app-dev": "2. Web & Mobile Apps",
      "business-websites": "2. Web & Mobile Apps",
      "platforms": "3. Business Platforms",
      "ecommerce": "3. Business Platforms",
      "custom-erp": "3. Business Platforms",
      "ai-automation": "4. AI & Automation",
      "workflow-automation": "4. AI & Automation",
      "cybersecurity": "5. Cybersecurity",
      "vapt": "5. Cybersecurity"
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
