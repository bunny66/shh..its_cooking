// ============================================================
//  Ayushman's Casino Night - app logic
// ============================================================

(function () {
  "use strict";

  const C = window.CONTENT || {};

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

  // Mobile menu
  const menuBtn = $("#menuBtn");
  const nav = $(".nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    $$(".nav-link").forEach((l) => l.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }));
  }

  // Particles
  const particles = $("#particles");
  if (particles) {
    const count = window.matchMedia("(max-width: 480px)").matches ? 18 : 36;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      const size = 2 + Math.random() * 4;
      p.style.cssText = "position:absolute;width:" + size + "px;height:" + size + "px;left:" + (Math.random()*100) + "%;top:" + (Math.random()*100) + "%;background:" + (Math.random()>0.5?"#d4af37":"#e74c3c") + ";border-radius:50%;opacity:" + (0.3+Math.random()*0.5) + ";animation:float " + (6+Math.random()*8) + "s ease-in-out infinite;animation-delay:" + (Math.random()*6) + "s;";
      particles.appendChild(p);
    }
    const style = document.createElement("style");
    style.textContent = "@keyframes float { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-20px); } }";
    document.head.appendChild(style);
  }

  // Balloons
  const balloons = $("#balloons");
  if (balloons) {
    const bCount = window.matchMedia("(max-width: 480px)").matches ? 8 : 14;
    for (let i = 0; i < bCount; i++) {
      const b = document.createElement("span");
      b.className = "balloon";
      b.textContent = "🎈";
      const left = Math.random() * 100;
      const dur = 12 + Math.random() * 14;
      const delay = Math.random() * 12;
      const hue = Math.random() * 360;
      b.style.cssText = "left:" + left + "%;animation-duration:" + dur + "s;animation-delay:" + delay + "s;filter:hue-rotate(" + hue + "deg);";
      balloons.appendChild(b);
    }
  }

  // Floating cards
  const floatingCards = $("#floatingCards");
  if (floatingCards) {
    const cards = ["♠", "♥", "♦", "♣", "A", "K", "Q", "J", "10"];
    const cCount = window.matchMedia("(max-width: 480px)").matches ? 10 : 18;
    for (let i = 0; i < cCount; i++) {
      const c = document.createElement("span");
      c.className = "fcard";
      c.textContent = cards[Math.floor(Math.random() * cards.length)];
      const left = Math.random() * 100;
      const dur = 14 + Math.random() * 16;
      const delay = Math.random() * 14;
      c.style.cssText = "left:" + left + "%;animation-duration:" + dur + "s;animation-delay:" + delay + "s;color:" + (Math.random() > 0.5 ? "#d4af37" : "#e74c3c") + ";";
      floatingCards.appendChild(c);
    }
  }

  // Floating icons
  const floatingIcons = $("#floatingIcons");
  if (floatingIcons) {
    const icons = ["🎲", "🃏", "🪙", "🎰", "🎡", "👑", "🎯", "♠", "♥", "♦", "♣", "⭐", "✨", "💃", "🎂", "🥂"];
    const iCount = window.matchMedia("(max-width: 480px)").matches ? 12 : 22;
    for (let i = 0; i < iCount; i++) {
      const el = document.createElement("span");
      el.className = "ficon";
      el.textContent = icons[Math.floor(Math.random() * icons.length)];
      const left = Math.random() * 100;
      const dur = 16 + Math.random() * 18;
      const delay = Math.random() * 16;
      el.style.cssText = "left:" + left + "%;animation-duration:" + dur + "s;animation-delay:" + delay + "s;";
      floatingIcons.appendChild(el);
    }
  }

  // Star dust
  const starDust = $("#starDust");
  if (starDust) {
    const dCount = window.matchMedia("(max-width: 480px)").matches ? 25 : 50;
    for (let i = 0; i < dCount; i++) {
      const d = document.createElement("span");
      d.className = "stardust";
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const dur = 2 + Math.random() * 4;
      const delay = Math.random() * 4;
      d.style.cssText = "left:" + left + "%;top:" + top + "%;animation-duration:" + dur + "s;animation-delay:" + delay + "s;";
      starDust.appendChild(d);
    }
  }
  // Image modal
  const imgModal = $("#imgModal");
  const imgModalImg = $("#imgModalImg");
  const imgModalCaption = $("#imgModalCaption");
  const imgClose = $("#imgClose");
  function openImageModal(src, caption) {
    if (!imgModal) { window.open(src, "_blank"); return; }
    if (imgModalImg) { imgModalImg.src = src; imgModalImg.alt = caption || ""; }
    if (imgModalCaption) imgModalCaption.textContent = caption || "";
    imgModal.classList.add("open");
    imgModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    try { if (imgClose) imgClose.focus(); } catch (e) {}
  }
  function closeImageModal() {
    if (!imgModal) return;
    imgModal.classList.remove("open");
    imgModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  if (imgModal) {
    imgClose.addEventListener("click", closeImageModal);
    imgModal.addEventListener("click", (e) => { if (e.target === imgModal) closeImageModal(); });
    document.addEventListener("keydown", (e) => {
      if (!imgModal.classList.contains("open")) return;
      if (e.key === "Escape") closeImageModal();
    });
  }

  // Agenda
  const agendaGrid = $("#agendaGrid");
  const agendaItems = Array.isArray(C.agenda) && C.agenda.length ? C.agenda : [
    { icon: "🤝", label: "Meet & Greet" },
    { icon: "🍽️", label: "Eat" },
    { icon: "🥂", label: "Drink" },
    { icon: "🎰", label: "Games" },
    { icon: "💃", label: "Dance" },
    { icon: "📸", label: "Clicking Photos" },
    { icon: "🎂", label: "Cake" },
  ];
  if (agendaGrid) {
    agendaItems.forEach((a) => {
      const el = document.createElement(a.image ? "button" : "div");
      el.className = "agenda-item" + (a.image ? " agenda-clickable" : "");
      if (a.image) {
        el.type = "button";
        el.setAttribute("aria-label", (a.label || "") + " - view picture");
      }
      el.innerHTML = '<span class="agenda-icon">' + esc(a.icon || "🎉") + '</span><span class="agenda-label">' + esc(a.label || "") + '</span>' +
        (a.image ? '<span class="agenda-hint">Tap for picture ↗</span>' : "");
      if (a.image) {
        const open = () => openImageModal(a.image, a.label || "Agenda");
        el.addEventListener("click", open);
        el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
      }
      agendaGrid.appendChild(el);
    });
  }

  // Photos
  const gallery = $("#gallery");
  const photosEmpty = $("#photosEmpty");
  const photos = Array.isArray(C.photos) ? C.photos : [];
  if (gallery) {
    if (photos.length === 0) {
      if (photosEmpty) photosEmpty.hidden = false;
    } else {
      photos.forEach((p, i) => {
        const item = document.createElement("button");
        item.className = "gallery-item";
        item.type = "button";
        item.setAttribute("aria-label", p.caption || ("Photo " + (i + 1)));
        item.innerHTML = '<img src="' + esc(p.src) + '" alt="' + esc(p.caption || "") + '" loading="lazy" /><div class="gallery-caption">' + esc(p.caption || "") + '</div>';
        item.addEventListener("click", () => openLightbox(i));
        gallery.appendChild(item);
      });
    }
  }

  // Artifacts
  const artifactsGrid = $("#artifactsGrid");
  const artifactsEmpty = $("#artifactsEmpty");
  const artifacts = Array.isArray(C.artifacts) ? C.artifacts : [];
  if (artifactsGrid) {
    if (artifacts.length === 0) {
      if (artifactsEmpty) artifactsEmpty.hidden = false;
    } else {
      artifacts.forEach((a) => {
        const el = document.createElement("div");
        el.className = "artifact";
        el.innerHTML = '<div class="artifact-icon" aria-hidden="true">' + esc(a.icon || "🎲") + '</div><h3 class="artifact-name">' + esc(a.name || "") + '</h3><p class="artifact-desc">' + esc(a.desc || "") + '</p>';
        artifactsGrid.appendChild(el);
      });
    }
  }

  // Games
  const gamesGrid = $("#gamesGrid");
  const gamesEmpty = $("#gamesEmpty");
  const games = Array.isArray(C.games) ? C.games : [];
  if (gamesGrid) {
    if (games.length === 0) {
      if (gamesEmpty) gamesEmpty.hidden = false;
    } else {
      games.forEach((g) => {
        const el = document.createElement("article");
        el.className = "game" + (g.featured ? " game-featured" : "") + (g.image ? " game-clickable" : "");
        if (g.image) {
          el.setAttribute("role", "button");
          el.setAttribute("tabindex", "0");
          el.setAttribute("aria-label", (g.name || "") + " - view rules image");
        }
        const rules = Array.isArray(g.rules) ? g.rules : [];
        el.innerHTML = '<div class="game-head"><span class="game-icon" aria-hidden="true">' + esc(g.icon || "🃏") + '</span><h3 class="game-name">' + esc(g.name || "") + '</h3></div>' +
          '<div class="game-meta">' + (g.players ? '<span class="game-tag">Players: ' + esc(g.players) + '</span>' : "") + (g.time ? '<span class="game-tag">' + esc(g.time) + '</span>' : "") + '</div>' +
          '<ul class="game-rules">' + rules.map((r) => "<li>" + esc(r) + "</li>").join("") + '</ul>' +
          (g.image ? '<button type="button" class="view-rules-btn">View rules image ↗</button>' : "");
        if (g.image) {
          const open = () => openImageModal(g.image, g.name || "Rules");
          el.addEventListener("click", open);
          const btn = el.querySelector(".view-rules-btn");
          if (btn) btn.addEventListener("click", (e) => { e.stopPropagation(); open(); });
          el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
        }
        gamesGrid.appendChild(el);
      });
    }
  }


  // Playlists
  const playlistsGrid = $("#playlistsGrid");
  const musicEmpty = $("#musicEmpty");
  const playlists = Array.isArray(C.playlists) ? C.playlists : [];
  if (playlistsGrid) {
    if (playlists.length === 0) {
      if (musicEmpty) musicEmpty.hidden = false;
    } else {
      playlists.forEach((pl) => {
        const el = document.createElement("div");
        el.className = "playlist";
        const embed = toEmbedUrl(pl.url || "");
        el.innerHTML = '<h3 class="playlist-title">' + esc(pl.title || "Playlist") + '</h3>' +
          (embed ? '<div class="playlist-frame"><iframe src="' + esc(embed) + '" title="' + esc(pl.title || "") + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>' : "") +
          (pl.url ? '<a class="playlist-link" href="' + esc(pl.url) + '" target="_blank" rel="noopener">Open on YouTube ↗</a>' : "");
        playlistsGrid.appendChild(el);
      });
    }
  }

  function toEmbedUrl(url) {
    if (!url) return "";
    const plMatch = url.match(/[?&]list=([^&]+)/);
    const vMatch = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
    const listId = plMatch ? plMatch[1] : "";
    const videoId = vMatch ? vMatch[1] : "";
    if (videoId && listId) {
      return "https://www.youtube.com/embed/" + videoId + "?list=" + listId;
    }
    if (videoId) {
      return "https://www.youtube.com/embed/" + videoId;
    }
    if (listId) {
      return "https://www.youtube.com/embed/videoseries?list=" + listId;
    }
    return "";
  }
  window.toEmbedUrl = toEmbedUrl;

  // Lightbox
  const lightbox = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCaption = $("#lbCaption");
  const lbClose = $("#lbClose");
  const lbPrev = $("#lbPrev");
  const lbNext = $("#lbNext");
  let currentIndex = 0;

  function openLightbox(i) {
    if (!photos.length) return;
    currentIndex = i;
    renderLb();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function renderLb() {
    const p = photos[currentIndex];
    lbImg.src = p.src;
    lbImg.alt = p.caption || "";
    lbCaption.textContent = p.caption || "";
  }
  function next() { currentIndex = (currentIndex + 1) % photos.length; renderLb(); }
  function prev() { currentIndex = (currentIndex - 1 + photos.length) % photos.length; renderLb(); }

  if (lightbox) {
    lbClose.addEventListener("click", closeLightbox);
    lbNext.addEventListener("click", next);
    lbPrev.addEventListener("click", prev);
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    });
  }

  // Focus scroll for TV
  document.addEventListener("focusin", (e) => {
    const t = e.target;
    if (t && typeof t.scrollIntoView === "function") {
      const rect = t.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < 80 || rect.bottom > vh - 40) {
        t.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  });
})();
