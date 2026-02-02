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
              phone: "Phone",
              message: "Message",
              page: "Page",
              copied: "Copied. You can paste it into a text message.",
            }
          : {
              subject: "Demande de devis",
              project: "Type de projet",
              budget: "Budget estimé",
              name: "Nom",
              phone: "Téléphone",
              message: "Message",
              page: "Page",
              copied: "Copié. Vous pouvez le coller dans un SMS.",
            };

      const project = get("project-type");
      const subject = `${labels.subject}${project ? ` — ${project}` : ""}`;

      const lines = [
        `${labels.project}: ${project || "-"}`,
        `${labels.budget}: ${get("budget") || "-"}`,
        "",
        `${labels.name}: ${get("name") || "-"}`,
        `${labels.phone}: ${get("phone") || "-"}`,
        "",
        `${labels.message}:`,
        get("message") || "-",
        "",
        `${labels.page}: ${window.location.href}`,
      ];

      const body = lines.join("\n");

      const copyToClipboard = async (text) => {
        try {
          if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
            await navigator.clipboard.writeText(text);
            return true;
          }
        } catch (_) {
          // ignore
        }
        try {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "true");
          ta.style.position = "fixed";
          ta.style.top = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          const ok = document.execCommand("copy");
          document.body.removeChild(ta);
          return ok;
        } catch (_) {
          return false;
        }
      };

      // Prefer SMS (when configured). Fallback to mailto when provided.
      const sms = (form.getAttribute("data-sms") || "").trim();
      const mailto = (form.getAttribute("data-mailto") || "").trim();

      if (sms) {
        copyToClipboard(body).then((ok) => {
          if (ok) window.alert(labels.copied);
        });

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const sep = isIOS ? "&" : "?";
        const smsUrl = `sms:${encodeURIComponent(sms)}${sep}body=${encodeURIComponent(body)}`;
        window.location.href = smsUrl;
        return;
      }

      if (mailto) {
        const url = `mailto:${encodeURIComponent(mailto)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
      }
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    setupNav();
    setupQuoteForm();
  });
})();

