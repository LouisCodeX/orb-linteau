"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const accessScreen = document.querySelector("#access-screen");
  const accessMessage = document.querySelector("#access-message");
  const accessStatus = document.querySelector("#access-status");
  const retryButton = document.querySelector("#retry-button");
  const guideShell = document.querySelector("#guide-shell");
  const guideContent = document.querySelector("#guide-content");
  const guideNav = document.querySelector("#guide-nav");
  const menuButton = document.querySelector("#menu-button");
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const additionalData = encoder.encode("rose-guide-v1");

  const decodeBase64Url = (value) => {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const binary = atob(padded);
    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  };

  const getFragmentKey = () => {
    const fragment = window.location.hash.slice(1);
    if (!fragment) return "";
    const params = new URLSearchParams(fragment);
    return params.get("key") || "";
  };

  const appendText = (parent, tagName, text, className) => {
    const element = document.createElement(tagName);
    element.textContent = text;
    if (className) element.className = className;
    parent.append(element);
    return element;
  };

  const appendActions = (parent, actions = []) => {
    if (!actions.length) return;
    const row = document.createElement("div");
    row.className = "action-row";

    actions.forEach((action) => {
      const protocol = action.href.split(":")[0].toLowerCase();
      if (!["https", "mailto", "tel"].includes(protocol)) return;
      const link = document.createElement("a");
      link.className = "action-link";
      link.href = action.href;
      link.textContent = action.label;
      if (protocol === "https") {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      row.append(link);
    });

    parent.append(row);
  };

  const appendWifi = (parent, wifi) => {
    if (!wifi?.rows?.length) return;
    const panel = document.createElement("div");
    panel.className = "wifi-panel";

    wifi.rows.forEach((row) => {
      const wrapper = document.createElement("div");
      wrapper.className = "wifi-row";
      appendText(wrapper, "span", row.label);
      appendText(wrapper, "code", row.value);

      if (row.copy) {
        const copyButton = document.createElement("button");
        copyButton.type = "button";
        copyButton.className = "copy-button";
        copyButton.textContent = "Copier";
        copyButton.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(row.value);
            copyButton.textContent = "Copié";
            window.setTimeout(() => {
              copyButton.textContent = "Copier";
            }, 1800);
          } catch {
            copyButton.textContent = "Sélectionnez le texte";
          }
        });
        wrapper.append(copyButton);
      }

      panel.append(wrapper);
    });

    parent.append(panel);
  };

  const appendCard = (grid, card, index) => {
    const article = document.createElement("article");
    article.className = "guide-card";
    appendText(article, "span", String(index + 1).padStart(2, "0"), "card-number");
    appendText(article, "h3", card.title);

    (card.paragraphs || []).forEach((paragraph) => {
      appendText(article, "p", paragraph, "card-copy");
    });

    if (card.items?.length) {
      const list = document.createElement("ul");
      list.className = "detail-list";
      card.items.forEach((item) => appendText(list, "li", item));
      article.append(list);
    }

    appendWifi(article, card.wifi);
    if (card.notice) appendText(article, "p", card.notice, "notice");
    appendActions(article, card.actions);
    grid.append(article);
  };

  const renderGuide = (guide) => {
    document.title = guide.meta?.documentTitle || "Guide voyageurs | Rose des Orpellières";
    guideContent.replaceChildren();
    guideNav.replaceChildren();

    const hero = document.createElement("section");
    hero.className = "guide-hero";
    hero.id = "welcome";
    const heroInner = document.createElement("div");
    heroInner.className = "hero-inner";
    appendText(heroInner, "p", guide.hero.eyebrow, "eyebrow");
    appendText(heroInner, "h1", guide.hero.title);
    appendText(heroInner, "p", guide.hero.lead, "hero-lead");
    const heroNote = document.createElement("div");
    heroNote.className = "hero-note";
    appendText(heroNote, "b", guide.hero.noteMark);
    appendText(heroNote, "span", guide.hero.note);
    heroInner.append(heroNote);
    hero.append(heroInner);
    guideContent.append(hero);

    const facts = document.createElement("section");
    facts.className = "quick-facts";
    facts.setAttribute("aria-label", "Informations essentielles");
    guide.facts.forEach((fact) => {
      const article = document.createElement("article");
      article.className = "quick-fact";
      appendText(article, "strong", fact.value);
      appendText(article, "span", fact.label);
      facts.append(article);
    });
    guideContent.append(facts);

    guide.sections.forEach((section, sectionIndex) => {
      const wrapper = document.createElement("section");
      wrapper.className = `guide-section${section.dark ? " is-dark" : ""}`;
      wrapper.id = section.id;
      const inner = document.createElement("div");
      inner.className = "section-inner";
      const heading = document.createElement("header");
      heading.className = "section-heading";
      const titleBlock = document.createElement("div");
      appendText(titleBlock, "span", String(sectionIndex + 1).padStart(2, "0"), "section-index");
      appendText(titleBlock, "p", section.eyebrow, "eyebrow");
      appendText(titleBlock, "h2", section.title);
      heading.append(titleBlock);
      appendText(heading, "p", section.intro, "section-intro");
      inner.append(heading);

      const grid = document.createElement("div");
      grid.className = `card-grid${section.columns === 3 ? " is-three" : ""}`;
      section.cards.forEach((card, cardIndex) => appendCard(grid, card, cardIndex));
      inner.append(grid);
      wrapper.append(inner);
      guideContent.append(wrapper);

      const navLink = document.createElement("a");
      navLink.href = `#${section.id}`;
      navLink.textContent = section.nav;
      navLink.addEventListener("click", () => closeMenu());
      guideNav.append(navLink);
    });

    const navSections = Array.from(document.querySelectorAll(".guide-section"));
    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        guideNav.querySelectorAll("a").forEach((link) => {
          link.toggleAttribute("aria-current", link.getAttribute("href") === `#${visible.target.id}`);
        });
      }, { rootMargin: "-20% 0px -65%", threshold: [0, 0.2, 0.6] });
      navSections.forEach((section) => sectionObserver.observe(section));
    }
  };

  const closeMenu = () => {
    guideNav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    guideNav.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  });

  const decryptGuide = async (fragmentKey) => {
    const keyBytes = decodeBase64Url(fragmentKey);
    if (keyBytes.byteLength !== 32) throw new Error("Invalid key");

    const response = await fetch("guide.enc.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Encrypted guide unavailable");
    const payload = await response.json();
    if (payload.version !== 1) throw new Error("Unsupported guide version");

    const key = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );
    const plaintext = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: decodeBase64Url(payload.iv),
        additionalData
      },
      key,
      decodeBase64Url(payload.ciphertext)
    );
    return JSON.parse(decoder.decode(plaintext));
  };

  const openGuide = async () => {
    const fragmentKey = getFragmentKey();
    if (!fragmentKey) {
      accessStatus.hidden = true;
      retryButton.hidden = true;
      return;
    }

    accessMessage.textContent = "Votre QR a été reconnu. Le guide est déchiffré uniquement dans ce navigateur.";
    accessStatus.hidden = false;
    retryButton.hidden = true;

    try {
      const guide = await decryptGuide(fragmentKey);
      renderGuide(guide);
      accessScreen.hidden = true;
      guideShell.hidden = false;
    } catch {
      accessStatus.hidden = true;
      retryButton.hidden = false;
      accessMessage.textContent = "Ce lien est incomplet ou n’est plus valable. Scannez à nouveau le QR code présent dans l’appartement.";
    }
  };

  retryButton.addEventListener("click", openGuide);
  window.addEventListener("hashchange", () => {
    closeMenu();
    openGuide();
  });

  openGuide();
});
