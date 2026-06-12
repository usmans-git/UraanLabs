const initSiteScripts = () => {
  initServiceReveal();
  initWebBuildReveal();
  initCounters();
  initFaqTabs();
  initFaqAccordions();
  initBlogSlider();
  initLeadForm();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSiteScripts);
} else {
  initSiteScripts();
}

function initServiceReveal() {
  const serviceCards = Array.from(document.querySelectorAll(".service-card"));

  if (!serviceCards.length) return;

  const getCenterStaggerDelay = (card) => {
    const grid = card.closest(".services-grid");
    if (!grid) return 0;

    const gridRect = grid.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const gridCenterX = gridRect.left + gridRect.width / 2;
    const gridCenterY = gridRect.top + gridRect.height / 2;
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const distanceFromCenter = Math.hypot(cardCenterX - gridCenterX, cardCenterY - gridCenterY);

    return distanceFromCenter * 0.0012;
  };

  serviceCards.forEach((card) => {
    card.style.transitionDelay = `${getCenterStaggerDelay(card)}s`;
    card.classList.add("reveal-ready");
  });

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".services .section-heading > *", {
      scrollTrigger: {
        trigger: ".services",
        start: "top 75%"
      },
      y: 24,
      opacity: 0,
      duration: 0.65,
      stagger: 0.1,
      ease: "power3.out"
    });

    gsap.to(".service-card", {
      scrollTrigger: {
        trigger: ".services-grid",
        start: "top 78%"
      },
      opacity: 1,
      y: 0,
      rotate: 0,
      duration: 0.7,
      stagger: (index, target) => getCenterStaggerDelay(target),
      ease: "power3.out",
      onComplete: () => {
        serviceCards.forEach((card) => {
          card.classList.add("reveal-in");
          card.classList.remove("reveal-ready");
          card.style.transitionDelay = "";
        });
      }
    });
  } else if ("IntersectionObserver" in window) {
    const serviceRevealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            serviceRevealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18
      }
    );

    serviceCards.forEach((card) => {
      serviceRevealObserver.observe(card);
    });
  } else {
    serviceCards.forEach((card) => {
      card.classList.add("reveal-in");
    });
  }
}

function initWebBuildReveal() {
  const webBuildCards = document.querySelectorAll(".web-build-card");

  if (!webBuildCards.length) return;

  if (!("IntersectionObserver" in window)) {
    webBuildCards.forEach((card) => {
      card.classList.add("reveal-in");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  webBuildCards.forEach((card) => {
    observer.observe(card);
  });
}

function initCounters() {
  const counters = document.querySelectorAll(".counter");

  if (!counters.length) return;

  const startCounter = (counter) => {
    const target = Number(counter.getAttribute("data-target"));
    const duration = 1800;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    let current = 0;

    const updateCounter = setInterval(() => {
      current += increment;

      if (current >= target) {
        counter.textContent = target;
        clearInterval(updateCounter);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, stepTime);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(startCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
          entry.target.classList.add("counted");
          startCounter(entry.target);
        }
      });
    },
    {
      threshold: 0.6
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

function initFaqTabs() {
  const faqTabs = document.querySelectorAll(".faq-tab");
  const faqCategories = document.querySelectorAll(".faq-category");

  if (!faqTabs.length || !faqCategories.length) return;

  faqTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selectedCategory = tab.getAttribute("data-category");

      faqTabs.forEach((item) => {
        item.classList.remove("active");
      });

      tab.classList.add("active");

      faqCategories.forEach((category) => {
        category.classList.toggle("active", category.id === selectedCategory);
      });
    });
  });
}

function initFaqAccordions() {
  const faqItems = document.querySelectorAll(".faq-item");

  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      const parentWrapper =
        item.closest(".faq-category") ||
        item.closest(".faq-wrapper") ||
        item.closest(".faq-list") ||
        document;
      const siblingFaqItems = parentWrapper.querySelectorAll(".faq-item");

      siblingFaqItems.forEach((faq) => {
        if (faq !== item) {
          faq.classList.remove("active");
        }
      });

      item.classList.toggle("active");
    });
  });
}

function initBlogSlider() {
  const blogSliders = document.querySelectorAll(".blog-slider");

  if (!blogSliders.length) return;

  blogSliders.forEach((slider) => {
    const track = slider.querySelector(".blog-slider-track");
    const previousButton = slider.querySelector(".blog-slider-prev");
    const nextButton = slider.querySelector(".blog-slider-next");

    if (!track || !previousButton || !nextButton) return;

    const getScrollAmount = () => {
      const card = track.querySelector(".blog-card");
      if (!card) return track.clientWidth;

      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 24;
      return card.getBoundingClientRect().width + gap;
    };

    const updateButtons = () => {
      const maxScrollLeft = track.scrollWidth - track.clientWidth - 2;

      previousButton.disabled = track.scrollLeft <= 2;
      nextButton.disabled = track.scrollLeft >= maxScrollLeft;
    };

    previousButton.addEventListener("click", () => {
      track.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });
    });

    nextButton.addEventListener("click", () => {
      track.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });
    });

    track.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);
    updateButtons();
  });
}

function initLeadForm() {
  const leadForm = document.getElementById("leadForm");

  if (!leadForm) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const serviceInput = document.getElementById("service");
  const budgetInput = document.getElementById("budget");
  const messageInput = document.getElementById("message");
  const captchaInput = document.getElementById("captchaInput");
  const captchaQuestion = document.getElementById("captchaQuestion");
  const refreshCaptcha = document.getElementById("refreshCaptcha");
  const formSuccess = document.getElementById("formSuccess");

  if (
    !nameInput ||
    !emailInput ||
    !phoneInput ||
    !serviceInput ||
    !budgetInput ||
    !messageInput ||
    !captchaInput ||
    !captchaQuestion ||
    !refreshCaptcha ||
    !formSuccess
  ) {
    return;
  }

  let captchaAnswer = 0;

  const generateCaptcha = () => {
    const numberOne = Math.floor(Math.random() * 9) + 1;
    const numberTwo = Math.floor(Math.random() * 9) + 1;

    captchaAnswer = numberOne + numberTwo;
    captchaQuestion.textContent = `${numberOne} + ${numberTwo}`;
    captchaInput.value = "";
  };

  const showError = (input, message) => {
    const formGroup = input.closest(".form-group");
    if (!formGroup) return;

    const errorMessage = formGroup.querySelector(".error-message");

    formGroup.classList.remove("success");
    formGroup.classList.add("error");

    if (errorMessage) {
      errorMessage.textContent = message;
    }
  };

  const showSuccess = (input) => {
    const formGroup = input.closest(".form-group");
    if (!formGroup) return;

    const errorMessage = formGroup.querySelector(".error-message");

    formGroup.classList.remove("error");
    formGroup.classList.add("success");

    if (errorMessage) {
      errorMessage.textContent = "";
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone) => {
    const phonePattern = /^[0-9+\-\s()]{7,20}$/;
    return phonePattern.test(phone);
  };

  const validateForm = () => {
    let isValid = true;

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const serviceValue = serviceInput.value.trim();
    const budgetValue = budgetInput.value.trim();
    const messageValue = messageInput.value.trim();
    const captchaValue = captchaInput.value.trim();

    if (nameValue === "") {
      showError(nameInput, "Full name is required.");
      isValid = false;
    } else if (nameValue.length < 3) {
      showError(nameInput, "Name must be at least 3 characters.");
      isValid = false;
    } else {
      showSuccess(nameInput);
    }

    if (emailValue === "") {
      showError(emailInput, "Email address is required.");
      isValid = false;
    } else if (!validateEmail(emailValue)) {
      showError(emailInput, "Please enter a valid email address.");
      isValid = false;
    } else {
      showSuccess(emailInput);
    }

    if (phoneValue === "") {
      showError(phoneInput, "Phone number is required.");
      isValid = false;
    } else if (!validatePhone(phoneValue)) {
      showError(phoneInput, "Please enter a valid phone number.");
      isValid = false;
    } else {
      showSuccess(phoneInput);
    }

    if (serviceValue === "") {
      showError(serviceInput, "Please select a service.");
      isValid = false;
    } else {
      showSuccess(serviceInput);
    }

    if (budgetValue === "") {
      showError(budgetInput, "Please select your budget.");
      isValid = false;
    } else {
      showSuccess(budgetInput);
    }

    if (messageValue === "") {
      showError(messageInput, "Project details are required.");
      isValid = false;
    } else if (messageValue.length < 20) {
      showError(messageInput, "Please write at least 20 characters.");
      isValid = false;
    } else {
      showSuccess(messageInput);
    }

    if (captchaValue === "") {
      showError(captchaInput, "Captcha is required.");
      isValid = false;
    } else if (Number(captchaValue) !== captchaAnswer) {
      showError(captchaInput, "Captcha answer is incorrect.");
      isValid = false;
    } else {
      showSuccess(captchaInput);
    }

    return isValid;
  };

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (validateForm()) {
      formSuccess.style.display = "block";

      leadForm.reset();
      generateCaptcha();

      const formGroups = document.querySelectorAll(".form-group");

      formGroups.forEach((group) => {
        group.classList.remove("success");
        group.classList.remove("error");
      });

      setTimeout(() => {
        formSuccess.style.display = "none";
      }, 5000);
    }
  });

  refreshCaptcha.addEventListener("click", generateCaptcha);

  generateCaptcha();
}
