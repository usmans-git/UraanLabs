"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. FAQ Accordions
    const accordions = document.querySelectorAll(
      "#faqAccordion, .accordion-wrapper, .faq-modern-list"
    );
    const cleanups = [];

    accordions.forEach((accordion) => {
      const items = accordion.querySelectorAll(".accordion-item");
      items.forEach((item) => {
        const header = item.querySelector(".accordion-header");
        if (!header) return;

        const clickHandler = () => {
          const isOpen = item.classList.contains("is-open");
          items.forEach((other) => {
            if (other !== item) {
              other.classList.remove("is-open");
              const otherHeader = other.querySelector(".accordion-header");
              if (otherHeader) otherHeader.setAttribute("aria-expanded", "false");
            }
          });

          if (isOpen) {
            item.classList.remove("is-open");
            header.setAttribute("aria-expanded", "false");
          } else {
            item.classList.add("is-open");
            header.setAttribute("aria-expanded", "true");
          }
        };

        header.addEventListener("click", clickHandler);
        cleanups.push(() => header.removeEventListener("click", clickHandler));
      });
    });

    // 2. Interactive Lead Form with Math Challenge
    const form = document.getElementById("leadForm");
    if (form) {
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

      let expectedAnswer = 0;
      const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        expectedAnswer = num1 + num2;
        if (captchaQuestion) captchaQuestion.textContent = `${num1} + ${num2}`;
        if (captchaInput) captchaInput.value = "";
      };

      generateCaptcha();
      if (refreshBtn) refreshBtn.addEventListener("click", generateCaptcha);

      const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      const submitHandler = async (e) => {
        e.preventDefault();

        if (nameError) nameError.textContent = "";
        if (emailError) emailError.textContent = "";
        if (serviceError) serviceError.textContent = "";
        if (messageError) messageError.textContent = "";
        if (captchaError) captchaError.textContent = "";
        if (formFail) formFail.style.display = "none";
        if (formSuccess) formSuccess.style.display = "none";

        const hasMaliciousChars = (str) => /<[^>]*>|javascript:|vbscript:|data:text\/html|on\w+\s*=/i.test(str);

        let isValid = true;
        const nameVal = nameInput ? nameInput.value.trim() : "";
        if (!nameVal || nameVal.length < 3) {
          if (nameError) nameError.textContent = "Please enter your full name (minimum 3 characters).";
          isValid = false;
        } else if (hasMaliciousChars(nameVal)) {
          if (nameError) nameError.textContent = "HTML tags or script characters are not allowed.";
          isValid = false;
        }

        const emailVal = emailInput ? emailInput.value.trim() : "";
        if (!emailVal || !isValidEmail(emailVal)) {
          if (emailError) emailError.textContent = "Please enter a valid business email address.";
          isValid = false;
        }

        const serviceVal = serviceInput ? serviceInput.value : "";
        if (!serviceVal) {
          if (serviceError) serviceError.textContent = "Please choose a primary capability.";
          isValid = false;
        }

        const msgVal = messageInput ? messageInput.value.trim() : "";
        if (!msgVal || msgVal.length < 10) {
          if (messageError) messageError.textContent = "Please share a few details about your project.";
          isValid = false;
        } else if (hasMaliciousChars(msgVal)) {
          if (messageError) messageError.textContent = "HTML tags or script characters are not allowed.";
          isValid = false;
        }

        const captchaVal = captchaInput ? parseInt(captchaInput.value.trim(), 10) : NaN;
        if (isNaN(captchaVal) || captchaVal !== expectedAnswer) {
          if (captchaError) captchaError.textContent = "Incorrect verification answer. Please try again.";
          isValid = false;
        }

        if (!isValid) {
          if (formFail) formFail.style.display = "block";
          return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Saving to Google Sheet...</span> <span style="display:inline-block; animation: spin 1s linear infinite;">⏳</span>`;
        }

        const phoneVal = phoneInput ? phoneInput.value.trim() : "";

        try {
          // Direct submission to Next.js API route (saves directly to Google Sheet)
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: nameVal,
              email: emailVal,
              phone: phoneVal,
              service: serviceVal,
              message: msgVal,
              source: typeof window !== "undefined" ? window.location.href : "https://uraantech.vercel.app",
            }),
          });

          if (!res.ok) {
            throw new Error(`Server returned ${res.status}`);
          }

          // Show prominent success feedback
          if (formSuccess) {
            formSuccess.style.display = "block";
            formSuccess.innerHTML = `
              <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 10px; padding: 18px 20px; color: #FFFFFF; text-align: left; margin-top: 14px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                  <span style="font-size: 1.25rem; color: #34D399;">✔</span>
                  <strong style="color: #34D399; font-size: 1.05rem;">Inquiry Recorded Successfully!</strong>
                </div>
                <p style="font-size: 0.88rem; color: #E2E8F0; line-height: 1.5; margin: 0;">
                  Thank you, <strong>${nameVal}</strong>. Your project details have been recorded in our Google Sheet. Redirecting to Homepage...
                </p>
              </div>
            `;
          }

          form.reset();
          generateCaptcha();

          // Redirect to Homepage
          setTimeout(() => {
            window.location.href = "/";
          }, 1200);
        } catch (err) {
          console.error("Submission error:", err);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
          }
          if (formFail) {
            formFail.style.display = "block";
            formFail.innerHTML = `
              <div style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 10px; padding: 14px 18px; color: #FCA5A5; text-align: left; margin-top: 14px;">
                <strong>Submission Error:</strong> Unable to record inquiry right now. Please try again.
              </div>
            `;
          }
        }
      };

      form.addEventListener("submit", submitHandler);
      cleanups.push(() => form.removeEventListener("submit", submitHandler));
    }

    // 3. Live Telemetry Pulse (Sparklines)
    const sparklineSpans = document.querySelectorAll(".metric-sparkline span");
    let telemetryInterval = null;
    if (sparklineSpans.length > 0) {
      telemetryInterval = setInterval(() => {
        sparklineSpans.forEach((span) => {
          const randomHeight = Math.floor(Math.random() * 65) + 30;
          span.style.height = `${randomHeight}%`;
        });
      }, 2800);
      cleanups.push(() => clearInterval(telemetryInterval));
    }

    // 4. Hero 3D Parallax Tilt (High Performance Idle-Paused Animation)
    const heroSection = document.querySelector(".hero-section");
    const scene = document.getElementById("cyber3DScene");
    if (heroSection && scene) {
      let currentX = 0, currentY = 0;
      let targetX = 0, targetY = 0;
      let animFrameId = null;

      const animateTilt = () => {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        scene.style.transform = `rotateY(${currentX.toFixed(2)}deg) rotateX(${currentY.toFixed(2)}deg)`;
        if (Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02) {
          animFrameId = requestAnimationFrame(animateTilt);
        } else {
          animFrameId = null;
          if (targetX === 0 && targetY === 0) {
            scene.style.transform = "";
          }
        }
      };

      const handleMove = (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetX = x * 22;
        targetY = -y * 18;
        if (!animFrameId) {
          animFrameId = requestAnimationFrame(animateTilt);
        }
      };

      const handleLeave = () => {
        targetX = 0;
        targetY = 0;
        if (!animFrameId) {
          animFrameId = requestAnimationFrame(animateTilt);
        }
      };

      heroSection.addEventListener("mousemove", handleMove, { passive: true });
      heroSection.addEventListener("mouseleave", handleLeave);

      cleanups.push(() => {
        heroSection.removeEventListener("mousemove", handleMove);
        heroSection.removeEventListener("mouseleave", handleLeave);
        if (animFrameId) cancelAnimationFrame(animFrameId);
      });
    }

    // 5. Pillars 3D Parallax Tilt (High Performance Idle-Paused Animation)
    const pillarCards = document.querySelectorAll(".pillar-card-wrapper");
    pillarCards.forEach((card) => {
      const cardScene = card.querySelector(".pillar-3d-scene");
      if (!cardScene) return;

      let currentX = 0, currentY = 0;
      let targetX = 0, targetY = 0;
      let animId = null;

      const animatePillar = () => {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        cardScene.style.transform = `rotateY(${currentX.toFixed(2)}deg) rotateX(${currentY.toFixed(2)}deg)`;
        if (Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02) {
          animId = requestAnimationFrame(animatePillar);
        } else {
          animId = null;
          if (targetX === 0 && targetY === 0) {
            cardScene.style.transform = "";
          }
        }
      };

      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetX = x * 20;
        targetY = -y * 16;
        if (!animId) {
          animId = requestAnimationFrame(animatePillar);
        }
      };

      const onMouseLeave = () => {
        targetX = 0;
        targetY = 0;
        if (!animId) {
          animId = requestAnimationFrame(animatePillar);
        }
      };

      card.addEventListener("mousemove", onMouseMove, { passive: true });
      card.addEventListener("mouseleave", onMouseLeave);

      cleanups.push(() => {
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseleave", onMouseLeave);
        if (animId) cancelAnimationFrame(animId);
      });
    });

    // 6. Mobile Card Swipers
    const swiperSelectors = [
      ".bento-grid",
      ".workflow-steps-grid",
      ".accreditations-grid",
      ".vision-mission-grid",
      ".pillar-card-wrapper .panel-grid"
    ];

    swiperSelectors.forEach((sel) => {
      const containers = document.querySelectorAll(sel);
      containers.forEach((container) => {
        if (!container || (container.nextElementSibling && container.nextElementSibling.classList.contains("swiper-nav-bar"))) {
          return;
        }
        const items = Array.from(container.children).filter(el => !el.classList.contains("swiper-nav-bar"));
        if (items.length <= 1) return;

        const navBar = document.createElement("div");
        navBar.className = "swiper-nav-bar";
        navBar.innerHTML = `
          <div class="swiper-hint">
            <span class="swiper-hint-icon">👈👉</span>
            <span class="swiper-hint-text">Swipe to explore</span>
          </div>
          <div class="swiper-dots-container"></div>
        `;
        const dotsWrap = navBar.querySelector(".swiper-dots-container");
        items.forEach((_, idx) => {
          const dot = document.createElement("button");
          dot.className = `swiper-dot-btn ${idx === 0 ? "active" : ""}`;
          dot.setAttribute("type", "button");
          dot.setAttribute("aria-label", `Slide ${idx + 1}`);
          dot.addEventListener("click", () => {
            items[idx].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          });
          dotsWrap.appendChild(dot);
        });

        container.parentNode.insertBefore(navBar, container.nextSibling);

        const onScroll = () => {
          const scrollLeft = container.scrollLeft;
          const width = container.offsetWidth || 300;
          const activeIdx = Math.round(scrollLeft / width);
          const dots = dotsWrap.querySelectorAll(".swiper-dot-btn");
          dots.forEach((d, i) => {
            d.classList.toggle("active", i === activeIdx);
          });
        };

        container.addEventListener("scroll", onScroll, { passive: true });
        cleanups.push(() => {
          container.removeEventListener("scroll", onScroll);
          if (navBar && navBar.parentNode) navBar.parentNode.removeChild(navBar);
        });
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
