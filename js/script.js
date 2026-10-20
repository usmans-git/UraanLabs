/**
 * UraanLabs - Clean Landing Page Scripts
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Header scroll effect
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });

  // 2. Mobile Menu Toggle
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    // Close when clicking mobile links
    mobileNav.querySelectorAll(".mobile-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3. Smooth scrolling for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: targetPos,
          behavior: "smooth"
        });
      }
    });
  });

  // 4. Clean Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const serviceInput = document.getElementById("service");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const serviceError = document.getElementById("serviceError");
    const messageError = document.getElementById("messageError");
    const formSuccess = document.getElementById("formSuccess");
    const submitBtn = document.getElementById("submitBtn");

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Clear errors
      nameError.textContent = "";
      emailError.textContent = "";
      serviceError.textContent = "";
      messageError.textContent = "";
      if (formSuccess) formSuccess.style.display = "none";

      let valid = true;

      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameError.textContent = "Please enter your name.";
        valid = false;
      }

      const emailVal = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        emailError.textContent = "Please enter a valid email address.";
        valid = false;
      }

      if (!serviceInput.value) {
        serviceError.textContent = "Please select a service.";
        valid = false;
      }

      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageError.textContent = "Please write a brief note (at least 10 characters).";
        valid = false;
      }

      if (!valid) return;

      // Simulate sending
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Inquiry →";
        if (formSuccess) formSuccess.style.display = "block";

        setTimeout(() => {
          if (formSuccess) formSuccess.style.display = "none";
        }, 6000);
      }, 700);
    });
  }
});
