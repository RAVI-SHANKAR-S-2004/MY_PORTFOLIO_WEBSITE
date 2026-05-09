/* =========================================================
   OPTIMIZED JS (SMOOTH + FAST + SAFE)
========================================================= */
(() => {
  "use strict";

  const $ = (q, root = document) => root.querySelector(q);
  const $$ = (q, root = document) => Array.from(root.querySelectorAll(q));

  document.addEventListener("DOMContentLoaded", () => {
    const desktopNavBtns = $$(".nav-links button");
    const mobileNavBtns = $$(".mobile-menu button");
    const allNavBtns = $$("[data-target]");
    const sections = $$("section[id]");
    const mobileMenu = $("#mobileMenu");
    const menuToggle = $("#menuToggle");

    function setActiveNav(targetId) {
      [...desktopNavBtns, ...mobileNavBtns].forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.target === targetId);
      });
    }

    function scrollToSection(target) {
      const section = $(target);
      if (!section) return;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveNav(target);
      if (mobileMenu) mobileMenu.classList.remove("show");
      if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    }

    allNavBtns.forEach((btn) => {
      btn.addEventListener("click", () => scrollToSection(btn.dataset.target));
    });

    if ("IntersectionObserver" in window && sections.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveNav("#" + entry.target.id);
          });
        },
        { root: null, rootMargin: "-35% 0px -55% 0px", threshold: 0 }
      );
      sections.forEach((sec) => observer.observe(sec));
    }

    if (menuToggle && mobileMenu) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("show");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
      });

      document.addEventListener("click", (e) => {
        if (!mobileMenu.classList.contains("show")) return;
        if (mobileMenu.contains(e.target) || menuToggle.contains(e.target)) return;
        mobileMenu.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    }

    const logoBtn = $("#logoBtn");
    if (logoBtn) logoBtn.addEventListener("click", () => scrollToSection("#home"));

    const hireBtn = $("#hireBtn");
    const navHireBtn = $("#navHireBtn");
    if (hireBtn) hireBtn.addEventListener("click", () => scrollToSection("#contact"));
    if (navHireBtn) navHireBtn.addEventListener("click", () => scrollToSection("#contact"));

    const heroImg = $(".hero-image-wrapper > img");
    if (heroImg) {
      heroImg.addEventListener("mouseenter", () => (heroImg.style.transform = "scale(1.04)"));
      heroImg.addEventListener("mouseleave", () => (heroImg.style.transform = "scale(1)"));
    }

    $$(".skill").forEach((skill) => {
      skill.addEventListener("click", () => {
        skill.style.transform = "scale(0.95)";
        window.setTimeout(() => (skill.style.transform = "scale(1)"), 220);
      });
    });

    const modal = $("#modal");
    const closeModal = $("#closeModal");
    const modalTitle = $("#modalTitle");
    const modalDesc = $("#modalDesc");
    const modalLink = $("#modalLink");

    function openModal(title, desc, link) {
      if (!modal || !modalTitle || !modalDesc || !modalLink) return;
      modalTitle.textContent = title || "Project";
      modalDesc.textContent = desc || "Project details";
      modalLink.href = link || "#";
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      if (closeModal) closeModal.focus();
    }

    function closeModalFn() {
      if (!modal) return;
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    }

    $$(".project-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return;
        openModal(card.dataset.title, card.dataset.desc, card.dataset.link);
      });
    });

    if (closeModal) closeModal.addEventListener("click", closeModalFn);
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModalFn();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && modal.classList.contains("active")) closeModalFn();
    });

    /* CONTACT FORM + WHATSAPP */
    const contactForm = $("#contactForm");
    const formStatus = $("#formStatus");

    function showStatus(message, isError = false) {
      if (!formStatus) return;
      formStatus.style.display = "block";
      formStatus.textContent = message;
      formStatus.classList.toggle("error", isError);
    }

    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = $("#name")?.value.trim() || "";
        const email = $("#email")?.value.trim() || "";
        const subject = $("#subject")?.value.trim() || "";
        const message = $("#message")?.value.trim() || "";
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!name || !email || !subject || !message) {
          showStatus("Please fill all fields ❌", true);
          return;
        }

        if (!validEmail) {
          showStatus("Please enter a valid email address ❌", true);
          return;
        }

        showStatus("Opening WhatsApp... 🚀");

        const phoneNumber = "919342638550";
        const text = encodeURIComponent(
          `New Contact Message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
        );

        window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank", "noopener,noreferrer");
        contactForm.reset();

        window.setTimeout(() => {
          if (formStatus) formStatus.style.display = "none";
        }, 3000);
      });
    }
  });
})();
