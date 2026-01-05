// DOM Elements (will be initialized after DOM loads)
let themeToggle,
  hamburger,
  navMenu,
  navLinks,
  contactModal,
  openModalBtn,
  closeModalBtn,
  contactForm;

// Theme Management
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || "dark";
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.bindEvents();
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.currentTheme = theme;
    localStorage.setItem("theme", theme);
    this.updateThemeIcon();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.setTheme(newTheme);
  }

  updateThemeIcon() {
    const themeToggle = document.getElementById("theme-toggle");
    const icon = themeToggle?.querySelector("i");
    if (icon) {
      if (this.currentTheme === "dark") {
        icon.className = "fas fa-sun";
      } else {
        icon.className = "fas fa-moon";
      }
    }
  }

  bindEvents() {
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme());
    }
  }
}

// Mobile Navigation
class MobileNav {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    this.hamburger = document.querySelector(".hamburger");
    this.navMenu = document.querySelector(".nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.bindEvents();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.navMenu.classList.toggle("active");
    this.animateHamburger();
  }

  close() {
    this.isOpen = false;
    this.navMenu.classList.remove("active");
    this.animateHamburger();
  }

  animateHamburger() {
    const bars = this.hamburger.querySelectorAll(".bar");
    if (this.isOpen) {
      bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
      bars[1].style.opacity = "0";
      bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
    } else {
      bars[0].style.transform = "none";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "none";
    }
  }

  bindEvents() {
    if (this.hamburger) {
      this.hamburger.addEventListener("click", () => this.toggle());
    }

    // Close menu when clicking on nav links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.close());
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !this.navMenu?.contains(e.target) &&
        !this.hamburger?.contains(e.target)
      ) {
        this.close();
      }
    });
  }
}

// Smooth Scrolling
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  scrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
      const offsetTop = element.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  bindEvents() {
    // Handle navigation links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("href");
        this.scrollTo(target);
      });
    });
  }
}

// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll(".scroll-animate");
    this.init();
  }

  init() {
    this.setupObserver();
    this.addAnimationClasses();
  }

  addAnimationClasses() {
    // Add scroll-animate class to elements that should animate on scroll
    const animateElements = [
      ".service-card",
      ".tech-category",
    ];

    animateElements.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add("scroll-animate");
      });
    });

    // Update elements list
    this.elements = document.querySelectorAll(".scroll-animate");
  }

  setupObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, options);

    this.elements.forEach((el) => {
      this.observer.observe(el);
    });
  }
}

// Navbar Scroll Effect
class NavbarScroll {
  constructor() {
    this.navbar = document.querySelector(".navbar");
    this.init();
  }

  init() {
    this.bindEvents();
  }

  updateNavbar() {
    if (window.scrollY > 100) {
      this.navbar.style.background = "rgba(255, 255, 255, 0.98)";
      this.navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      this.navbar.style.background = "rgba(255, 255, 255, 0.95)";
      this.navbar.style.boxShadow = "none";
    }

    // Update for dark theme
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      if (window.scrollY > 100) {
        this.navbar.style.background = "rgba(17, 24, 39, 0.98)";
      } else {
        this.navbar.style.background = "rgba(17, 24, 39, 0.95)";
      }
    }
  }

  bindEvents() {
    window.addEventListener("scroll", () => this.updateNavbar());
  }
}

// Contact Modal Handler
class ContactModal {
  constructor() {
    this.modal = document.getElementById("contactModal");
    this.openBtn = document.querySelector(".open-contact-modal");
    this.closeBtn = document.querySelector(".close-modal");
    this.form = document.getElementById("contactForm");
    this.init();
  }

  init() {
    if (this.modal && this.openBtn && this.closeBtn && this.form) {
      this.bindModalEvents();
    }
  }

  open() {
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
    const firstInput = this.form.querySelector("input");
    if (firstInput) {
      firstInput.focus();
    }
  }

  close() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  bindModalEvents() {
    if (this.openBtn) {
      this.openBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.open();
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    // Close on background click
    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });
    }

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal?.classList.contains("active")) {
        this.close();
      }
    });
  }
}

// Contact Form Handler
class ContactForm {
  constructor(modal) {
    this.form = document.getElementById("contactForm");
    this.modal = modal;
    this.lastSubmissionTime = 0;
    this.submissionCount = 0;
    this.rateLimitWindow = 60000; // 1 minute
    this.maxSubmissions = 3; // Max 3 submissions per minute
    this.init();
  }

  init() {
    if (this.form) {
      this.bindEvents();
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Rate limiting check
    if (!this.checkRateLimit()) {
      this.showRateLimitError();
      return;
    }

    // Input validation and sanitization
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    if (!this.validateInput(data)) {
      this.showValidationError();
      return;
    }

    // Show loading state
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      // Send email using EmailJS
      await this.sendEmail(data);
      this.updateRateLimit();
      this.showSuccess();
      this.form.reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      this.showError();
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  async sendEmail(data) {
    // EmailJS configuration - you need to create a template in EmailJS dashboard
    const SERVICE_ID = "service_xbu3fj7"; // Your EmailJS service ID
    const TEMPLATE_ID = "template_ly8mzkn"; // Replace with your EmailJS template ID
    const PUBLIC_KEY = "xeI85NfU_pVidToc6"; // Your public key is already in HTML

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    };

    return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  }

  checkRateLimit() {
    const now = Date.now();

    // Reset counter if window has passed
    if (now - this.lastSubmissionTime > this.rateLimitWindow) {
      this.submissionCount = 0;
    }

    return this.submissionCount < this.maxSubmissions;
  }

  updateRateLimit() {
    const now = Date.now();

    if (now - this.lastSubmissionTime > this.rateLimitWindow) {
      this.submissionCount = 1;
    } else {
      this.submissionCount++;
    }

    this.lastSubmissionTime = now;
  }

  validateInput(data) {
    // Check for required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return false;
    }

    // Length validation
    if (
      data.name.length > 100 ||
      data.subject.length > 200 ||
      data.message.length > 2000
    ) {
      return false;
    }

    // Spam detection - check for suspicious patterns
    const spamPatterns = [
      /https?:\/\/[^\s]+/gi, // URLs
      /\b(viagra|casino|lottery|winner|congratulations|click here|free money)\b/gi,
      /(.)\1{10,}/, // Repeated characters
      /[^\w\s@.-]/g, // Suspicious characters (allow basic punctuation)
    ];

    const fullText =
      `${data.name} ${data.subject} ${data.message}`.toLowerCase();

    // Check for URLs (allow 1 max)
    const urlMatches = fullText.match(spamPatterns[0]);
    if (urlMatches && urlMatches.length > 1) {
      return false;
    }

    // Check for spam keywords
    if (spamPatterns[1].test(fullText)) {
      return false;
    }

    // Check for repeated characters
    if (spamPatterns[2].test(fullText)) {
      return false;
    }

    return true;
  }

  showRateLimitError() {
    this.showMessage(
      "Too many submissions. Please wait a minute before trying again.",
      "error"
    );
  }

  showValidationError() {
    this.showMessage(
      "Please check your input. Make sure all fields are filled correctly and avoid suspicious content.",
      "error"
    );
  }

  async simulateSubmission(data) {
    // Keep this as fallback - remove when EmailJS is fully configured
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Form submitted:", data);
        resolve();
      }, 1000);
    });
  }

  showSuccess() {
    this.showMessage(
      "Thanks for connecting! I’ll follow up with you shortly.",
      "success"
    );
  }

  showError() {
    this.showMessage(
      "Sorry, there was an error sending your message. Please try again.",
      "error"
    );
  }

  showMessage(text, type) {
    // Remove existing toast messages
    const existingToast = document.querySelector(".toast-message");
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector(".toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.className = "toast-container";
      toastContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                pointer-events: none;
            `;
      document.body.appendChild(toastContainer);
    }

    // Create toast message
    const toast = document.createElement("div");
    toast.className = `toast-message ${type}`;
    toast.textContent = text;
    toast.style.cssText = `
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 500;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            pointer-events: auto;
            max-width: 400px;
            ${
              type === "success"
                ? "background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;"
                : "background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5;"
            }
        `;

    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = "translateX(0)";
    }, 10);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      toast.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300);
    }, 4000);

    // Close modal after successful submission
    if (type === "success" && this.modal) {
      setTimeout(() => {
        this.modal.close();
      }, 2000);
    }
  }

  bindEvents() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }
}

// Floating Cards Animation
class FloatingCards {
  constructor() {
    this.cards = document.querySelectorAll(".floating-card");
    this.init();
  }

  init() {
    this.addMouseInteraction();
  }

  addMouseInteraction() {
    this.cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.animationPlayState = "paused";
        card.style.transform = "translateY(-10px) scale(1.05)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.animationPlayState = "running";
        card.style.transform = "";
      });
    });
  }
}

// Typing Animation for Hero Title
class TypingAnimation {
  constructor() {
    this.element = document.querySelector(".gradient-text");
    this.text = "Intelligent Systems";
    this.init();
  }

  init() {
    if (this.element) {
      this.startTyping();
    }
  }

  async startTyping() {
    this.element.textContent = "";

    for (let i = 0; i <= this.text.length; i++) {
      this.element.textContent = this.text.slice(0, i);
      await this.delay(100);
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Performance Optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.optimizeScrollEvents();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  optimizeScrollEvents() {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll-based animations go here
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
  }
}

// Initialize all components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize DOM elements
  themeToggle = document.getElementById("theme-toggle");
  hamburger = document.querySelector(".hamburger");
  navMenu = document.querySelector(".nav-menu");
  navLinks = document.querySelectorAll(".nav-link");
  contactModal = document.getElementById("contactModal");
  openModalBtn = document.querySelector(".open-contact-modal");
  closeModalBtn = document.querySelector(".close-modal");
  contactForm = document.getElementById("contactForm");

  // Initialize all components
  new ThemeManager();
  new MobileNav();
  new SmoothScroll();
  new ScrollAnimations();
  new NavbarScroll();

  // Initialize modal and form together
  const modal = new ContactModal();
  new ContactForm(modal);

  new FloatingCards();
  new TypingAnimation();
  new PerformanceOptimizer();

  // Add fade-in animation to hero section
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.classList.add("fade-in-up");
  }

  // Preload critical resources
  const criticalResources = [
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  ];

  criticalResources.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "style";
    link.href = url;
    document.head.appendChild(link);
  });
});

// Handle page visibility changes for performance
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.querySelectorAll(".floating-card").forEach((card) => {
      card.style.animationPlayState = "paused";
    });
  } else {
    // Resume animations when page becomes visible
    document.querySelectorAll(".floating-card").forEach((card) => {
      card.style.animationPlayState = "running";
    });
  }
});

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    const mobileNav = document.querySelector(".nav-menu.active");
    if (mobileNav) {
      mobileNav.classList.remove("active");
    }

    // ESC key also closes contact modal (handled in ContactModal class)
  }
});

// Smooth scroll polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const smoothScrollPolyfill = document.createElement("script");
  smoothScrollPolyfill.src =
    "https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js";
  document.head.appendChild(smoothScrollPolyfill);
}

// Export for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ThemeManager,
    MobileNav,
    SmoothScroll,
    ScrollAnimations,
    ContactForm,
    ContactModal,
  };
}
