 /* =========================================================
   OPTIMIZED JS (SMOOTH + FAST)
========================================================= */
      const $ = (q) => document.querySelector(q);
      const $$ = (q) => document.querySelectorAll(q);

      const desktopNavBtns = $$(".nav-links button");
      const allNavBtns = $$("[data-target]");
      const sections = $$("section[id]");

      const mobileMenu = $("#mobileMenu");
      const menuToggle = $("#menuToggle");

      function setActiveNav(targetId) {
        desktopNavBtns.forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.target === targetId);
        });
      }

      /* NAV CLICK */
      allNavBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = btn.dataset.target;
          if (!target) return;

          $(target).scrollIntoView({ behavior: "smooth" });
          setActiveNav(target);
          mobileMenu.classList.remove("show");
        });
      });

      /* ACTIVE NAV ON SCROLL */
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveNav("#" + entry.target.id);
            }
          });
        },
        { threshold: 0.55 },
      );

      sections.forEach((sec) => observer.observe(sec));

      /* MOBILE MENU */
      menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("show");
      });

      /* LOGO CLICK */
      $("#logoBtn").addEventListener("click", () => {
        $("#home").scrollIntoView({ behavior: "smooth" });
      });

      /* HERO BUTTONS */
      $("#hireBtn").addEventListener("click", () =>
        $("#contact").scrollIntoView({ behavior: "smooth" }),
      );
      $("#navHireBtn").addEventListener("click", () =>
        $("#contact").scrollIntoView({ behavior: "smooth" }),
      );

      /* HERO IMAGE */
      const heroImg = $(".hero-right img");
      heroImg.addEventListener(
        "mouseenter",
        () => (heroImg.style.transform = "scale(1.04)"),
      );
      heroImg.addEventListener(
        "mouseleave",
        () => (heroImg.style.transform = "scale(1)"),
      );

      /* SKILL CLICK EFFECT */
      $$(".skill").forEach((skill) => {
        skill.addEventListener("click", () => {
          skill.style.transform = "scale(0.95)";
          setTimeout(() => (skill.style.transform = "scale(1)"), 220);
        });
      });

      /* PROJECT MODAL */
      const modal = $("#modal");
      const closeModal = $("#closeModal");
      const modalTitle = $("#modalTitle");
      const modalDesc = $("#modalDesc");
      const modalLink = $("#modalLink");

      function openModal(title, desc, link) {
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalLink.href = link;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        closeModal.focus();
      }

      function closeModalFn() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
      }

      $$(".project-card").forEach((card) => {
        card.addEventListener("click", (e) => {
          if (e.target.tagName.toLowerCase() === "a") return;

          openModal(card.dataset.title, card.dataset.desc, card.dataset.link);
        });
      });

      closeModal.addEventListener("click", closeModalFn);

      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModalFn();
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
          closeModalFn();
        }
      });

     /* CONTACT FORM + WHATSAPP */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    formStatus.style.display = "block";
    formStatus.textContent = "Please fill all fields ❌";
    return;
  }

  formStatus.style.display = "block";
  formStatus.textContent = "Opening WhatsApp... 🚀";

  const phoneNumber = "919342638550";

  const text = encodeURIComponent(
    `New Contact Message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
  );

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;

  window.open(whatsappURL, "_blank");

  contactForm.reset();

  setTimeout(() => {
    formStatus.style.display = "none";
  }, 3000);
});