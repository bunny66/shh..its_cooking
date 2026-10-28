"use strict";
  // Floating cards
  const floatingCards = $("#floatingCards");
  if (floatingCards) {
    const cards = ["A"];
    const cCount = window.matchMedia("(max-width: 480px)").matches ? 2 : 4;
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
    const iCount = window.matchMedia("(max-width: 480px)").matches ? 6 : 11;
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
    const dCount = window.matchMedia("(max-width: 480px)").matches ? 6 : 12;
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
