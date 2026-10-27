"use strict";
// ============================================================
//  Ayushman's Casino Night - app logic
// ============================================================

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

