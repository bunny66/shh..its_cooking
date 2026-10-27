"use strict";
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
    { icon: "📸", label: "Photobooth" },
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
  const photosAll = Array.isArray(C.photos) ? C.photos : [];
  const photoLimitAttr = gallery ? gallery.getAttribute("data-limit") : null;
  const photos = photoLimitAttr ? photosAll.slice(0, parseInt(photoLimitAttr, 10)) : photosAll;
  if (gallery) {
    if (photosAll.length === 0) {
      gallery.style.display = "none";
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
  const gamesAll = Array.isArray(C.games) ? C.games : [];
  const featuredOnly = gamesGrid && gamesGrid.getAttribute("data-featured-only") === "true";
  const games = featuredOnly ? gamesAll.filter((g) => g.featured) : gamesAll;
  if (gamesGrid) {
    if (games.length === 0) {
      if (gamesEmpty) gamesEmpty.hidden = false;
    } else {
      games.forEach((g) => {
        const el = document.createElement("article");
        el.className = "game game-compact" + (g.featured ? " game-featured" : "") + (g.image ? " game-clickable" : "");
        const rules = Array.isArray(g.rules) ? g.rules : [];
        el.innerHTML = '<div class="game-head"><span class="game-icon" aria-hidden="true">' + esc(g.icon || "🃏") + '</span><h3 class="game-name">' + esc(g.name || "") + '</h3></div>' +
          '<div class="game-meta">' + (g.category ? '<span class="game-tag game-cat">' + esc(g.category) + '</span>' : "") + (g.players ? '<span class="game-tag">Players: ' + esc(g.players) + '</span>' : "") + '<button type="button" class="read-more-btn" style="background:var(--gold,#d4af37);color:#1a1400;border:1px solid #d4af37;padding:4px 10px;border-radius:999px;font-size:0.8rem;cursor:pointer;margin-left:auto;white-space:nowrap;font-weight:600;">Read more →</button></div>';
        const openDetails = () => openGameModal(g);
        el.querySelector(".read-more-btn").addEventListener("click", (e) => { e.stopPropagation(); openDetails(); });
        el.addEventListener("click", (e) => { if (!e.target.classList.contains("read-more-btn")) openDetails(); });
        el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDetails(); } });
        gamesGrid.appendChild(el);
      });
    }
  }


  // Playlists
  const playlistsGrid = $("#playlistsGrid");
  const musicEmpty = $("#musicEmpty");
  const playlistsAll = Array.isArray(C.playlists) ? C.playlists : [];
  const limitAttr = playlistsGrid ? playlistsGrid.getAttribute("data-limit") : null;
  const playlists = limitAttr ? playlistsAll.slice(0, parseInt(limitAttr, 10)) : playlistsAll;
  if (playlistsGrid) {
    if (playlists.length === 0) {
      if (musicEmpty) musicEmpty.hidden = false;
    } else {
      playlists.forEach((pl) => {
        const el = document.createElement("div");
        el.className = "playlist";
        const embed = toEmbedUrl(pl.url || "");
        el.innerHTML = (embed ? '<div class="playlist-frame"><iframe src="' + esc(embed) + '" title="' + esc(pl.title || "") + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>' : "");
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

