// ============================================================
//  Atyshman's Casino Night - app logic
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
          (g.image ? '<p class="game-hint">Tap to view rules image ↗</p>' : "");
        if (g.image) {
          const open = () => openImageModal(g.image, g.name || "Rules");
          el.addEventListener("click", open);
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
    if (plMatch) {
      return "https://www.youtube-nocookie.com/embed/videoseries?list=" + plMatch[1];
    }
    const vMatch = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
    if (vMatch) return "https://www.youtube-nocookie.com/embed/" + vMatch[1];
    return "";
  }

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
  // Image modal (poker hands chart etc.)
  const imgModal = $("#imgModal");
  const imgModalImg = $("#imgModalImg");
  const imgModalCaption = $("#imgModalCaption");
  const imgClose = $("#imgClose");
  function openImageModal(src, caption) {
    if (!imgModal) return;
    imgModalImg.src = src;
    imgModalImg.alt = caption || "";
    imgModalCaption.textContent = caption || "";
    imgModal.classList.add("open");
    imgModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    imgClose.focus();
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

