"use strict";
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
      const imgWidth = (window.matchMedia("(max-width: 480px)").matches) ? "100%" : (g.name === "Poker Hands" ? "60%" : "35%");
      if (g.image) mediaTop += '<div class="gm-media"><a href="' + esc(g.image) + '" target="_blank" rel="noopener"><img src="' + esc(g.image) + '" alt="rules" style="max-width:' + imgWidth + ';width:100%;border-radius:8px;cursor:pointer;" /></a><div style="margin-top:6px;"><a href="' + esc(g.image) + '" target="_blank" rel="noopener" class="btn btn-outline" style="display:inline-block;font-size:0.8rem;">Open image ↗</a></div></div>';
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


