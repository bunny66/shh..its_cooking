"use strict";
  const spinChaosBtn = $("#spinChaosBtn");
  const chaosResult = $("#chaosResult");
  if (chaosResult) chaosResult.style.display = "none";
  const chaosWheel = $("#chaosWheel");
  const outcomes = [
    "Double Your Chips",
    "Choose the Next Song",
    "Choose the Next Game",
    "One Extra Shot",
    "Steal 50 Chips",
    "Swap Coins",
    "Share the Luck",
    "Challenge Another Guest",
    "Lucky You!",
    "Birthday Boy’s Choice"
  ];
  const outcomeDesc = [
    "Double the chips you just won.",
    "Take over the playlist.",
    "Your pick. Everyone else plays along.",
    "A little victory toast.",
    "Take 50 chips from anyone you choose.",
    "Swap your chip balance with another guest.",
    "Gift 50 chips to a guest of your choice.",
    "Pick someone for a dance-off, sing-off, or comedy showdown. Let the battle begin!",
    "Take another spin.",
    "Ayushman gets to decide your fate."
  ];
  const colors = ["#c0392b","#d4af37","#0f5132","#1a3a7a","#9c7a1a","#e74c3c","#27ae60","#8e44ad","#f39c12","#0a1f44"];
  const n = outcomes.length;
  const angle = 360 / n;

  function buildWheel() {
    if (!chaosWheel) return;
    const grad = outcomes.map((_, i) => colors[i % colors.length] + " " + (i * angle) + "deg " + ((i + 1) * angle) + "deg").join(", ");
    chaosWheel.style.background = "conic-gradient(" + grad + ")";
    chaosWheel.querySelectorAll(".chaos-label").forEach((e) => e.remove());
    const r = Math.max(60, (chaosWheel.clientWidth || 320) / 2 * 0.68);
    outcomes.forEach((label, i) => {
      const span = document.createElement("span");
      span.className = "chaos-label";
      span.textContent = label;
      const mid = i * angle + angle / 2;
      const rad = (mid - 90) * Math.PI / 180;
      const x = Math.cos(rad) * r;
      const y = Math.sin(rad) * r;
      span.style.left = "calc(50% + " + x + "px)";
      span.style.top = "calc(50% + " + y + "px)";
      span.style.transform = "translate(-50%, -50%) rotate(" + mid + "deg)";
      chaosWheel.appendChild(span);
    });
    const wrap = chaosWheel.parentElement;
    if (wrap) {
      wrap.querySelectorAll(".chaos-light").forEach((e) => e.remove());
      const lightR = Math.max(100, ((chaosWheel.parentElement && chaosWheel.parentElement.clientWidth) || 340) / 2 - 4);
      const lightCount = 12;
      for (let i = 0; i < lightCount; i++) {
        const light = document.createElement("span");
        light.className = "chaos-light";
        const a = (i / lightCount) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(a) * lightR;
        const y = Math.sin(a) * lightR;
        light.style.left = "calc(50% + " + x + "px)";
        light.style.top = "calc(50% + " + y + "px)";
        light.style.animationDelay = (i * 0.08) + "s";
        wrap.appendChild(light);
      }
    }
  }
  buildWheel();

  let spinning = false;
  let rotation = 0;
  if (spinChaosBtn) {
    spinChaosBtn.addEventListener("click", () => {
      if (spinning) return;
      spinning = true;
      spinChaosBtn.disabled = true;
      const idx = Math.floor(Math.random() * n);
      const spins = 5 + Math.floor(Math.random() * 3);
      const target = rotation + spins * 360 + (360 - (idx * angle + angle / 2));
      chaosWheel.style.transform = "rotate(" + target + "deg)";
      rotation = target;
      setTimeout(() => {
        if (chaosResult) { chaosResult.style.display = "block"; chaosResult.innerHTML = "<span class='chaos-win'>🎡 " + outcomes[idx] + "!</span><br><span class='chaos-desc'>" + outcomeDesc[idx] + "</span>"; }
        spinning = false;
        spinChaosBtn.disabled = false;
        for (let i = 0; i < 12; i++) {
          const conf = document.createElement("span");
          conf.textContent = ["🎉","✨","♠","♥","♦","♣"][Math.floor(Math.random() * 6)];
          conf.style.cssText = "position:fixed;left:50%;top:50%;font-size:1.4rem;pointer-events:none;z-index:9999;animation:confetti 1.2s ease-out forwards;";
          const a = Math.random() * Math.PI * 2;
          const dist = 80 + Math.random() * 120;
          conf.style.setProperty("--dx", Math.cos(a) * dist + "px");
          conf.style.setProperty("--dy", Math.sin(a) * dist + "px");
          document.body.appendChild(conf);
          setTimeout(() => conf.remove(), 1300);
        }
        if (!document.getElementById("confettiStyle")) {
          const st = document.createElement("style");
          st.id = "confettiStyle";
          st.textContent = "@keyframes confetti { 0% { transform: translate(0,0) rotate(0deg); opacity:1; } 100% { transform: translate(var(--dx), var(--dy)) rotate(360deg); opacity:0; } }";
          document.head.appendChild(st);
        }
      }, 4200);
    });
  }

