/**
 * UraanLabs - Main Interactions & Application Script
 * Precision-engineered for high performance & micro-interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileDrawer();
  initStickyHeader();
  initSmoothScrollAndSpy();
  initAccordion();
  initLeadForm();
  initLiveTelemetrySimulator();
});

/* ==========================================================================
   01. Mobile Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById("mobileToggle");
  const closeBtn = document.getElementById("mobileClose");
  const drawer = document.getElementById("mobileDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

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

  navLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
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
   03. Smooth Scroll & Active Nav Spy
   ========================================================================== */
function initSmoothScrollAndSpy() {
  const navLinks = document.querySelectorAll(".site-header .nav-link");
  const sections = document.querySelectorAll("section[id], header[id]");

  // Smooth scroll offset calculation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = 90;
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
          if (link.getAttribute("href") === `#${id}`) {
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
   04. Interactive FAQ Accordion
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
   05. Project Inquiry Lead Form with Math Captcha
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
   06. Live Telemetry Simulator (Hero Dashboard)
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
