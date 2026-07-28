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
  const brand = document.querySelector(".brand");
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const additionalData = encoder.encode("rose-guide-v1");

  const iconPaths = {
    location: "M12 21s7-6.1 7-12A7 7 0 0 0 5 9c0 5.9 7 12 7 12Zm0-9.2A2.8 2.8 0 1 0 12 6a2.8 2.8 0 0 0 0 5.8Z",
    key: "M15.5 7.5a5 5 0 1 0-4.2 7.8L13 17h2v2h2v2h3v-3.2l-6-6a5 5 0 0 0 1.5-4.3Z",
    stairs: "M4 19h4v-4h4v-4h4V7h4M5 5h4v4",
    clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3 2",
    garage: "M3 21V8l9-5 9 5v13M6 21V10h12v11M6 14h12M6 18h12",
    phone: "M7.2 3H4.8C3.8 3 3 3.8 3 4.8 3 13.7 10.3 21 19.2 21c1 0 1.8-.8 1.8-1.8v-2.4l-4.6-1-1.2 2.1a15.3 15.3 0 0 1-9.1-9.1l2.1-1.2-1-4.6Z",
    wifi: "M3 9.5a13.5 13.5 0 0 1 18 0M6.5 13a8.2 8.2 0 0 1 11 0M10 16.5a3 3 0 0 1 4 0M12 20h.01",
    bed: "M3 20V8M21 20V12H3v8M7 12V8h5a3 3 0 0 1 3 3v1",
    climate: "M12 2v20M4.2 6.5l15.6 11M19.8 6.5l-15.6 11M8.5 4 12 7l3.5-3M8.5 20l3.5-3 3.5 3",
    terrace: "M4 12h16M6 12v8M18 12v8M8 12V8a4 4 0 0 1 8 0v4M3 20h18",
    tv: "M3 5h18v13H3zM8 22h8M12 18v4",
    hob: "M4 3h16v18H4zM8.5 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm-7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
    oven: "M4 3h16v18H4zM4 8h16M8 5.5h.01M12 5.5h.01M16 5.5h.01M12 18a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z",
    microwave: "M3 5h18v14H3zM6 8h10v8H6zM18.5 9h.01M18.5 12h.01M18.5 15h.01",
    dishwasher: "M4 3h16v18H4zM4 8h16M8 5.5h.01M12 5.5h.01M16 5.5h.01M8 13c1 1 1 3 0 4M12 13c1 1 1 3 0 4M16 13c1 1 1 3 0 4",
    coffee: "M5 8h11v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Zm11 2h2a3 3 0 0 1 0 6h-2M8 4c0 1 1 1.5 1 3M12 4c0 1 1 1.5 1 3",
    washer: "M4 3h16v18H4zM7 6h.01M10 6h.01M12 18a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z",
    dryer: "M4 3h16v18H4zM7 6h.01M10 6h.01M12 18a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-2-6c2 0 2 3 4 3",
    barbecue: "M5 4c0 2 2 2 2 4M10 4c0 2 2 2 2 4M15 4c0 2 2 2 2 4M4 11h16a8 8 0 0 1-16 0Zm5 7-2 4M15 18l2 4",
    rules: "M5 3h14v18H5zM8 8l1.5 1.5L12 7M8 13l1.5 1.5L12 12M14 8h2M14 13h2",
    checkout: "M4 3h11v18H4zM15 12h6M18 9l3 3-3 3M8 12h.01",
    waste: "M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6",
    market: "M3 9l2-5h14l2 5M4 9v11h16V9M8 20v-6h8v6M3 9c0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0",
    beach: "M3 17c3-2 6-2 9 0s6 2 9 0M3 21c3-2 6-2 9 0s6 2 9 0M16 4a4 4 0 0 1 4 4M5 13c2-5 5-8 10-9",
    compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3-12-2 4-4 2 2-4 4-2Z",
    sun: "M12 4V2M12 22v-2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5 19 19M19 5l1.5-1.5M3.5 20.5 5 19M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
    emergency: "M12 3 2.5 20h19L12 3Zm0 6v5M12 17h.01",
    power: "M13 2 5 13h6l-1 9 8-12h-6l1-8Z",
    water: "M12 2s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12Zm-3 12a3 3 0 0 0 3 3"
  };

  const decodeBase64Url = (value) => {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const binary = atob(padded);
    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  };

  const getFragmentKey = () => {
    const fragment = window.location.hash.slice(1);
    if (!fragment) return "";
    return new URLSearchParams(fragment).get("key") || "";
  };

  const appendText = (parent, tagName, text, className) => {
    const element = document.createElement(tagName);
    element.textContent = text;
    if (className) element.className = className;
    parent.append(element);
    return element;
  };

  const appendIcon = (parent, name, className = "line-icon") => {
    const wrapper = document.createElement("span");
    wrapper.className = className;
    wrapper.setAttribute("aria-hidden", "true");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.45");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", iconPaths[name] || iconPaths.compass);
    svg.append(path);
    wrapper.append(svg);
    parent.append(wrapper);
    return wrapper;
  };

  const closeMenu = (returnFocus = false) => {
    guideNav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    if (returnFocus) menuButton.focus();
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMenu();
  };

  const appendActions = (parent, actions = []) => {
    if (!actions.length) return;
    const row = document.createElement("div");
    row.className = "action-row";

    actions.forEach((action) => {
      const isLocal = action.href.startsWith("#");
      const protocol = isLocal ? "local" : action.href.split(":")[0].toLowerCase();
      if (!["local", "https", "mailto", "tel"].includes(protocol)) return;
      const link = document.createElement("a");
      link.className = "action-link";
      link.href = isLocal ? "" : action.href;
      link.textContent = action.label;
      if (isLocal) {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          scrollToSection(action.href.slice(1));
        });
      } else if (protocol === "https") {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      row.append(link);
    });

    parent.append(row);
  };

  const copyValue = async (value) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  };

  const openWifiSettings = () => {
    const userAgent = navigator.userAgent;
    let settingsUrl = "";
    if (/Android/i.test(userAgent)) {
      settingsUrl = "intent:#Intent;action=android.settings.WIFI_SETTINGS;end";
    }
    if (!settingsUrl) return false;
    const link = document.createElement("a");
    link.href = settingsUrl;
    link.style.display = "none";
    document.body.append(link);
    link.click();
    link.remove();
    return true;
  };

  const addCopyButton = (parent, value) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-button";
    button.textContent = "Copier";
    button.addEventListener("click", async () => {
      try {
        await copyValue(value);
        button.textContent = "Copié";
        window.setTimeout(() => {
          button.textContent = "Copier";
        }, 1800);
      } catch {
        button.textContent = "Sélectionnez";
      }
    });
    parent.append(button);
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
      if (row.copy) addCopyButton(wrapper, row.value);
      panel.append(wrapper);
    });

    const network = wifi.rows.find((row) => /réseau|network/i.test(row.label))?.value;
    const password = wifi.rows.find((row) => /mot de passe|password/i.test(row.label))?.value;
    if (network && password) {
      const helper = document.createElement("div");
      helper.className = "wifi-connect-helper";
      const status = document.createElement("div");
      status.className = "wifi-connect-status";
      status.hidden = true;
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      appendText(status, "strong", "Mot de passe copié");
      appendText(status, "span", `Choisissez ${network}, puis collez le mot de passe.`);

      const connectButton = document.createElement("button");
      connectButton.type = "button";
      connectButton.className = "wifi-connect-button";
      appendIcon(connectButton, "wifi", "wifi-button-icon");
      appendText(connectButton, "span", "Se connecter au Wi-Fi");
      connectButton.addEventListener("click", () => {
        copyValue(password).catch(() => {
          status.querySelector("strong").textContent = "Copiez le mot de passe ci-dessus";
        });
        status.hidden = false;
        connectButton.classList.add("is-done");
        connectButton.querySelector("span:last-child").textContent = "Mot de passe copié";
        openWifiSettings();
      });

      helper.append(connectButton, status);
      panel.append(helper);
    }
    parent.append(panel);
  };

  const appendCodes = (parent, codes = []) => {
    if (!codes.length) return;
    const visual = document.createElement("div");
    visual.className = "key-code-visual";
    codes.forEach((entry, index) => {
      const step = document.createElement("div");
      step.className = "key-code-step";
      appendText(step, "span", entry.floor, "key-floor");
      const codeRow = document.createElement("div");
      appendText(codeRow, "strong", entry.code);
      addCopyButton(codeRow, entry.code);
      step.append(codeRow);
      appendText(step, "small", entry.label);
      visual.append(step);
      if (index < codes.length - 1) appendIcon(visual, "stairs", "key-connector");
    });
    parent.append(visual);
  };

  const appendList = (parent, items = [], className = "detail-list") => {
    if (!items.length) return;
    const list = document.createElement("ul");
    list.className = className;
    items.forEach((item) => appendText(list, "li", item));
    parent.append(list);
  };

  const appendCard = (grid, card, index) => {
    const article = document.createElement("article");
    article.className = "guide-card";
    const top = document.createElement("div");
    top.className = "card-topline";
    appendIcon(top, card.icon);
    appendText(top, "span", String(index + 1).padStart(2, "0"), "card-number");
    article.append(top);
    appendText(article, "h3", card.title);
    (card.paragraphs || []).forEach((paragraph) => appendText(article, "p", paragraph, "card-copy"));
    appendCodes(article, card.codes);
    appendList(article, card.items);
    appendWifi(article, card.wifi);
    if (card.notice) appendText(article, "p", card.notice, "notice");
    appendActions(article, card.actions);
    grid.append(article);
  };

  const appendManual = (list, card) => {
    const details = document.createElement("details");
    details.className = "manual-item";
    details.id = card.id;
    const summary = document.createElement("summary");
    appendIcon(summary, card.icon, "manual-icon");
    const heading = document.createElement("span");
    appendText(heading, "strong", card.title);
    appendText(heading, "small", card.model);
    summary.append(heading);
    appendText(summary, "i", "+", "manual-toggle");
    details.append(summary);

    const body = document.createElement("div");
    body.className = "manual-body";
    appendText(body, "p", card.intro, "manual-intro");
    if (card.quick?.length) {
      const quick = document.createElement("section");
      quick.className = "manual-quick";
      appendText(quick, "h4", "Démarrage rapide");
      appendList(quick, card.quick, "numbered-list");
      body.append(quick);
    }
    (card.groups || []).forEach((group) => {
      const section = document.createElement("section");
      section.className = "manual-group";
      appendText(section, "h4", group.title);
      (group.paragraphs || []).forEach((paragraph) => appendText(section, "p", paragraph));
      appendList(section, group.items);
      body.append(section);
    });
    if (card.notice) appendText(body, "p", card.notice, "notice");
    details.append(body);

    details.addEventListener("toggle", () => {
      if (!details.open) return;
      list.querySelectorAll("details[open]").forEach((other) => {
        if (other !== details) other.open = false;
      });
      window.setTimeout(() => {
        details.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    });
    list.append(details);
  };

  const appendHeroImage = (hero, data) => {
    if (!data.image || data.image.includes("..") || !/^[a-z0-9._/-]+$/i.test(data.image)) return;
    const figure = document.createElement("figure");
    figure.className = "hero-visual";
    const image = document.createElement("img");
    image.src = data.image;
    image.alt = data.imageAlt || "";
    image.width = 768;
    image.height = 1024;
    image.fetchPriority = "high";
    figure.append(image);
    if (data.imageCaption) appendText(figure, "figcaption", data.imageCaption);
    hero.append(figure);
  };

  const appendFloatingContact = (contact) => {
    guideShell.querySelector(".floating-whatsapp")?.remove();
    if (!contact?.href?.startsWith("https://wa.me/")) return;
    const link = document.createElement("a");
    link.className = "floating-whatsapp";
    link.href = contact.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${contact.label} sur WhatsApp au ${contact.number}`);
    appendIcon(link, "phone");
    const text = document.createElement("span");
    appendText(text, "b", contact.label);
    appendText(text, "small", "WhatsApp");
    link.append(text);
    guideShell.append(link);
  };

  const renderGuide = (guide) => {
    document.title = guide.meta?.documentTitle || "Guide voyageurs | Rose des Orpellières";
    guideContent.replaceChildren();
    guideNav.replaceChildren();

    if (guide.priorityWifi) {
      const wifiSection = document.createElement("section");
      wifiSection.className = "wifi-priority";
      wifiSection.id = "wifi-start";
      const wifiInner = document.createElement("div");
      wifiInner.className = "wifi-priority-inner";
      const wifiCopy = document.createElement("div");
      wifiCopy.className = "wifi-priority-copy";
      appendIcon(wifiCopy, "wifi", "wifi-priority-icon");
      appendText(wifiCopy, "p", guide.priorityWifi.eyebrow, "eyebrow");
      appendText(wifiCopy, "h1", guide.priorityWifi.title);
      appendText(wifiCopy, "p", guide.priorityWifi.intro, "wifi-priority-intro");
      const wifiCard = document.createElement("div");
      wifiCard.className = "wifi-priority-card";
      appendWifi(wifiCard, guide.priorityWifi.wifi);
      if (guide.priorityWifi.notice) appendText(wifiCard, "p", guide.priorityWifi.notice, "notice");
      wifiInner.append(wifiCopy, wifiCard);
      wifiSection.append(wifiInner);
      guideContent.append(wifiSection);

      const wifiNavButton = document.createElement("button");
      wifiNavButton.type = "button";
      wifiNavButton.dataset.target = "wifi-start";
      wifiNavButton.textContent = "Wi-Fi";
      wifiNavButton.addEventListener("click", () => scrollToSection("wifi-start"));
      guideNav.append(wifiNavButton);
    }

    const hero = document.createElement("section");
    hero.className = "guide-hero";
    hero.id = "welcome";
    const heroCopy = document.createElement("div");
    heroCopy.className = "hero-copy";
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
    heroCopy.append(heroInner);
    hero.append(heroCopy);
    appendHeroImage(hero, guide.hero);
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
      wrapper.className = `guide-section${section.dark ? " is-dark" : ""}${section.kind === "manual" ? " is-manual" : ""}`;
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

      if (section.kind === "manual") {
        const manualList = document.createElement("div");
        manualList.className = "manual-list";
        section.cards.forEach((card) => appendManual(manualList, card));
        inner.append(manualList);
      } else {
        const grid = document.createElement("div");
        grid.className = `card-grid${section.columns === 3 ? " is-three" : ""}`;
        section.cards.forEach((card, cardIndex) => appendCard(grid, card, cardIndex));
        inner.append(grid);
      }
      wrapper.append(inner);
      guideContent.append(wrapper);

      const navButton = document.createElement("button");
      navButton.type = "button";
      navButton.dataset.target = section.id;
      navButton.textContent = section.nav;
      navButton.addEventListener("click", () => scrollToSection(section.id));
      guideNav.append(navButton);
    });

    const navSections = Array.from(document.querySelectorAll(".wifi-priority, .guide-section"));
    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        guideNav.querySelectorAll("button").forEach((button) => {
          button.toggleAttribute("aria-current", button.dataset.target === visible.target.id);
        });
      }, { rootMargin: "-20% 0px -65%", threshold: [0, 0.2, 0.6] });
      navSections.forEach((section) => sectionObserver.observe(section));
    }

    appendFloatingContact(guide.meta?.whatsapp);
  };

  menuButton.addEventListener("click", () => {
    const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(willOpen));
    guideNav.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
    if (willOpen) window.setTimeout(() => guideNav.querySelector("button")?.focus(), 180);
  });

  brand.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToSection(document.getElementById("wifi-start") ? "wifi-start" : "welcome");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && guideNav.classList.contains("is-open")) closeMenu(true);
  });

  const decryptGuide = async (fragmentKey) => {
    const keyBytes = decodeBase64Url(fragmentKey);
    if (keyBytes.byteLength !== 32) throw new Error("Invalid key");
    const response = await fetch("guide.enc.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Encrypted guide unavailable");
    const payload = await response.json();
    if (payload.version !== 1) throw new Error("Unsupported guide version");
    const key = await crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, ["decrypt"]);
    const plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: decodeBase64Url(payload.iv), additionalData },
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
  openGuide();
});
