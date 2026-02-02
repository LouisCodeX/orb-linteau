(() => {
  const setYear = () => {
    const el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  };

  const setupNav = () => {
    const navToggle = /** @type {HTMLInputElement | null} */ (document.getElementById("nav-toggle"));
    if (!navToggle) return;

    const close = () => {
      navToggle.checked = false;
    };

    document.querySelectorAll(".nav-menu a").forEach((a) => {
      a.addEventListener("click", () => close());
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  };

  const setupQuoteForm = () => {
    const form = /** @type {HTMLFormElement | null} */ (document.getElementById("quote-form"));
    if (!form) return;

    const step1 = form.querySelector(".form-step-1");
    const step2 = form.querySelector(".form-step-2");
    const nextBtn = document.getElementById("next-step");
    const prevBtn = document.getElementById("prev-step");

    const showStep = (stepNumber) => {
      if (!step1 || !step2) return;
      if (stepNumber === 1) {
        step1.style.display = "";
        step2.style.display = "none";
      } else {
        step1.style.display = "none";
        step2.style.display = "";
      }
    };

    const requiredFieldsOk = (scopeEl) => {
      if (!scopeEl) return true;
      const required = scopeEl.querySelectorAll("[required]");
      for (const el of required) {
        // @ts-ignore - reportValidity exists on form controls
        if (typeof el.reportValidity === "function") {
          // @ts-ignore
          if (!el.reportValidity()) return false;
        }
      }
      return true;
    };

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (!requiredFieldsOk(step1)) return;
        showStep(2);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => showStep(1));
    }

    form.addEventListener("submit", (e) => {
      const mailto = form.getAttribute("data-mailto");
      if (!mailto) return;

      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = new FormData(form);
      const get = (key) => String(data.get(key) ?? "").trim();
      const lang = (form.getAttribute("data-lang") || document.documentElement.lang || "fr").toLowerCase();

      const labels =
        lang.startsWith("en")
          ? {
              subject: "Quote request",
              project: "Project type",
              budget: "Estimated budget",
              name: "Name",
              email: "Email",
              phone: "Phone",
              message: "Message",
              page: "Page",
            }
          : {
              subject: "Demande de devis",
              project: "Type de projet",
              budget: "Budget estimé",
              name: "Nom",
              email: "Email",
              phone: "Téléphone",
              message: "Message",
              page: "Page",
            };

      const project = get("project-type");
      const subject = `${labels.subject}${project ? ` — ${project}` : ""}`;

      const lines = [
        `${labels.project}: ${project || "-"}`,
        `${labels.budget}: ${get("budget") || "-"}`,
        "",
        `${labels.name}: ${get("name") || "-"}`,
        `${labels.email}: ${get("email") || "-"}`,
        `${labels.phone}: ${get("phone") || "-"}`,
        "",
        `${labels.message}:`,
        get("message") || "-",
        "",
        `${labels.page}: ${window.location.href}`,
      ];

      const url = `mailto:${encodeURIComponent(mailto)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        lines.join("\n")
      )}`;

      // Opens user's mail client with a prefilled email.
      window.location.href = url;
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    setupNav();
    setupQuoteForm();
  });
})();

