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
  // Photo upload links
  const photoUploadBtn = $("#photoUploadBtn");
  const photoFolderBtn = $("#photoFolderBtn");
  if (photoUploadBtn) {
    if (C.photoUploadFormUrl) photoUploadBtn.href = C.photoUploadFormUrl;
    else if (C.photoFolderUrl) photoUploadBtn.href = C.photoFolderUrl;
    else photoUploadBtn.style.display = "none";
  }
  if (photoFolderBtn) {
    if (C.photoFolderUrl) photoFolderBtn.href = C.photoFolderUrl;
    else photoFolderBtn.style.display = "none";
  }
  // Google Drive folder embed
  const driveWrap = $("#driveGalleryWrap");
  const driveFrame = $("#driveGallery");
  function toDriveEmbedUrl(url) {
    if (!url) return "";
    const m = url.match(/folders\/([^/?]+)/);
    if (!m) return "";
    return "https://drive.google.com/embeddedfolderview?id=" + m[1] + "#grid";
  }
  if (driveWrap && driveFrame && C.photoFolderUrl) {
    const embedUrl = toDriveEmbedUrl(C.photoFolderUrl);
    if (embedUrl) {
      driveFrame.src = embedUrl;
      driveWrap.style.display = "block";
    }
  }
  window.toDriveEmbedUrl = toDriveEmbedUrl;


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

  // Focus scroll for TV
  // Photo challenge checklist
  const photoChecklist = $("#photoChecklist");
  const photoProgress = $("#photoProgress");
  if (photoChecklist) {
    const KEY = "photo_challenge_checks";
    let state = [];
    try { state = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { state = []; }
    const items = photoChecklist.querySelectorAll("li");
    items.forEach((li, i) => {
      const cb = li.querySelector("input[type='checkbox']");
      if (!cb) return;
      cb.checked = !!state[i];
      if (cb.checked) li.classList.add("done");
      cb.addEventListener("change", () => {
        state[i] = cb.checked;
        localStorage.setItem(KEY, JSON.stringify(state));
        li.classList.toggle("done", cb.checked);
        updateProgress();
      });
    });
    function updateProgress() {
      const done = Array.from(items).filter((li) => li.querySelector("input") && li.querySelector("input").checked).length;
      if (photoProgress) photoProgress.textContent = done + " / " + items.length + " collected";
    }
    updateProgress();
  }

  // Game details modal
  const gameModal = $("#gameModal");
  const gameModalTitle = $("#gameModalTitle");
  const gameModalMeta = $("#gameModalMeta");
  const gameModalRules = $("#gameModalRules");
  const gameClose = $("#gameClose");
  function openGameModal(g) {
    if (!gameModal) return;
    if (gameModalTitle) gameModalTitle.textContent = (g.icon || "") + " " + (g.name || "");
    if (gameModalMeta) gameModalMeta.textContent = (g.players ? "Players: " + g.players : "");
    if (gameModalRules) {
      const rules = Array.isArray(g.rules) ? g.rules : [];
      let html = "";
      // media (image + reference video) on top
      let mediaTop = "";
      const imgWidth = (g.name === "Poker Hands") ? "60%" : "35%";
      if (g.image) mediaTop += '<div class="gm-media"><img src="' + esc(g.image) + '" alt="rules" style="max-width:' + imgWidth + ';border-radius:8px;" /></div>';
      if (g.link) mediaTop += '<div class="gm-media"><a href="' + esc(g.link) + '" target="_blank" rel="noopener" class="btn btn-outline" style="display:inline-block;">Watch reference video ↗</a></div>';
      if (Array.isArray(g.sections)) {
        html = mediaTop + g.sections.map((s) => {
          let out = '<div class="gm-section">';
          out += '<h3 class="gm-section-title">' + esc(s.title || "") + '</h3>';
          if (Array.isArray(s.items)) {
            out += '<ul class="game-rules">' + s.items.map((r) => "<li>" + esc(r) + "</li>").join("") + '</ul>';
          }
          if (Array.isArray(s.ranks)) {
            out += '<div class="gm-ranks">' + s.ranks.map((r, i) => '<span class="gm-rank"><span class="gm-rank-num">' + (i + 1) + '</span>' + esc(r) + '</span>').join("") + '</div>';
          }
          out += '</div>';
          return out;
        }).join("");
      } else {
        html = mediaTop +
          '<ul class="game-rules">' + rules.map((r) => "<li>" + esc(r) + "</li>").join("") + '</ul>';
      }
      gameModalRules.innerHTML = html;
    }
    gameModal.style.display = "flex";
    gameModal.classList.add("open");
    gameModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    try { if (gameClose) gameClose.focus(); } catch (e) {}
  }
  function closeGameModal() {
    if (!gameModal) return;
    gameModal.classList.remove("open");
    gameModal.style.display = "none";
    gameModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  if (gameModal) {
    gameClose.addEventListener("click", closeGameModal);
    gameModal.addEventListener("click", (e) => { if (e.target === gameModal) closeGameModal(); });
    document.addEventListener("keydown", (e) => {
      if (!gameModal.classList.contains("open")) return;
      if (e.key === "Escape") closeGameModal();
    });
  }


  // Spin the Wheel of Chaos
  const spinChaosBtn = $("#spinChaosBtn");
  const chaosResult = $("#chaosResult");
  const chaosOutcomes = ["Double your chips!", "Challenge another guest!", "Best dance move!", "Tell a funny story about Ayushman!", "Choose the next song!", "Steal 50 chips from a willing opponent!", "Everyone at your table does a group pose!"];
  if (spinChaosBtn) {
    spinChaosBtn.addEventListener("click", () => {
      const res = chaosOutcomes[Math.floor(Math.random() * chaosOutcomes.length)];
      if (chaosResult) chaosResult.textContent = "🎡 " + res;
      // confetti
      for (let i = 0; i < 25; i++) {
        const conf = document.createElement("span");
        conf.textContent = ["🎉","✨","♠","♥","♦","♣"][Math.floor(Math.random()*6)];
        conf.style.cssText = "position:fixed;left:50%;top:50%;font-size:1.4rem;pointer-events:none;z-index:9999;animation:confetti 1.2s ease-out forwards;";
        const angle = Math.random() * Math.PI * 2;
        const dist = 80 + Math.random() * 120;
        conf.style.setProperty("--dx", Math.cos(angle)*dist + "px");
        conf.style.setProperty("--dy", Math.sin(angle)*dist + "px");
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 1300);
      }
      if (!document.getElementById("confettiStyle")) {
        const st = document.createElement("style");
        st.id = "confettiStyle";
        st.textContent = "@keyframes confetti { 0% { transform: translate(0,0) rotate(0deg); opacity:1; } 100% { transform: translate(var(--dx), var(--dy)) rotate(360deg); opacity:0; } }";
        document.head.appendChild(st);
      }
    });
  }

  // Place Your Bet - fun quiz
  const betChips = $("#betChips");
  const betSelected = $("#betSelected");
  const placeBetBtn = $("#placeBetBtn");
  const betResult = $("#betResult");
  const betQuestion = $("#betQuestion");
  const betOptions = $("#betOptions");
  const betScore = $("#betScore");
  const nextQBtn = $("#nextQBtn");

  const FALLBACK_QUESTIONS = [
    { q: "What does 'Blackjack' pay for a natural 21?", opts: ["1:1", "3:2", "2:1", "5:1"], ans: 1 },
    { q: "In Roulette, what pays 35:1?", opts: ["Red/Black", "Straight up number", "Odd/Even", "Dozen"], ans: 1 },
    { q: "How many cards in a standard deck?", opts: ["50", "52", "54", "48"], ans: 1 },
    { q: "Best poker hand?", opts: ["Four of a Kind", "Full House", "Royal Flush", "Straight Flush"], ans: 2 },
    { q: "Ayushman's birthday theme?", opts: ["Hollywood", "Casino Night", "Beach", "Retro"], ans: 1 },
    { q: "What is 'Bluff' also called?", opts: ["Cheat", "Poker", "Rummy", "Bridge"], ans: 0 },
    { q: "Monopoly Deal: sets to win?", opts: ["2", "3", "4", "5"], ans: 1 },
    { q: "Tambola full house wins?", opts: ["Line prize", "Jackpot", "Nothing", "Re-roll"], ans: 1 },
  ];
  let questions = FALLBACK_QUESTIONS;
  let qIndex = 0;
  let selectedBet = null;
  let score = 0;
  let answered = false;
  let selectedOption = null;

  function renderQuestion() {
    const q = questions[qIndex % questions.length];
    if (betQuestion) betQuestion.textContent = q.q;
    if (betOptions) {
      betOptions.innerHTML = "";
      q.opts.forEach((o, i) => {
        const b = document.createElement("button");
        b.className = "bet-option";
        b.textContent = o;
        b.addEventListener("click", () => {
          if (answered) return;
          betOptions.querySelectorAll(".bet-option").forEach((x) => x.classList.remove("selected"));
          b.classList.add("selected");
          selectedOption = i;
        });
        betOptions.appendChild(b);
      });
    }
    if (betResult) betResult.textContent = "";
    answered = false;
    selectedOption = null;
  }

  if (betChips) {
    betChips.querySelectorAll(".bet-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        betChips.querySelectorAll(".bet-chip").forEach((c) => c.classList.remove("selected"));
        chip.classList.add("selected");
        selectedBet = parseInt(chip.getAttribute("data-val"), 10);
        if (betSelected) betSelected.textContent = "Selected: " + selectedBet;
      });
    });
  }
  if (placeBetBtn) {
    placeBetBtn.addEventListener("click", () => {
      if (selectedBet === null) { if (betResult) betResult.textContent = "Pick a chip first!"; return; }
      if (selectedOption === null) { if (betResult) betResult.textContent = "Pick an answer!"; return; }
      if (answered) return;
      answered = true;
      const q = questions[qIndex % questions.length];
      const opts = betOptions.querySelectorAll(".bet-option");
      opts[q.ans].classList.add("correct");
      if (selectedOption !== q.ans) opts[selectedOption].classList.add("wrong");
      if (selectedOption === q.ans) {
        score += selectedBet;
        if (betResult) betResult.textContent = "Correct! +" + selectedBet + " points 🎉";
        // confetti
        for (let i = 0; i < 30; i++) {
          const conf = document.createElement("span");
          conf.textContent = ["🎉","✨","💰","♠","♥","♦","♣"][Math.floor(Math.random()*7)];
          conf.style.cssText = "position:fixed;left:50%;top:50%;font-size:1.4rem;pointer-events:none;z-index:9999;animation:confetti 1.2s ease-out forwards;";
          const angle = Math.random() * Math.PI * 2;
          const dist = 80 + Math.random() * 120;
          conf.style.setProperty("--dx", Math.cos(angle)*dist + "px");
          conf.style.setProperty("--dy", Math.sin(angle)*dist + "px");
          document.body.appendChild(conf);
          setTimeout(() => conf.remove(), 1300);
        }
        const st = document.createElement("style");
        if (!document.getElementById("confettiStyle")) {
          st.id = "confettiStyle";
          st.textContent = "@keyframes confetti { 0% { transform: translate(0,0) rotate(0deg); opacity:1; } 100% { transform: translate(var(--dx), var(--dy)) rotate(360deg); opacity:0; } }";
          document.head.appendChild(st);
        }
      } else {
        if (betResult) betResult.textContent = "Wrong! -" + selectedBet + " (correct: " + q.opts[q.ans] + ")";
      }
      if (betScore) betScore.textContent = "Score: " + score;
    });
  }
  if (nextQBtn) {
    nextQBtn.addEventListener("click", () => {
      qIndex++;
      renderQuestion();
    });
  }
  (async () => {
    if (location.protocol !== 'file:') {
      try {
        const res = await fetch('bet-questions.json');
        if (res.ok) questions = await res.json();
      } catch (e) {}
    }
    renderQuestion();
  })();


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
