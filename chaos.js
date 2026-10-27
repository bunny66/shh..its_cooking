"use strict";
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

