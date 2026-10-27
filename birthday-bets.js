"use strict";
  // Birthday Boy gate
  const bbEnterBtn = $("#bbEnterBtn");
  const bbName = $("#bbName");
  const bbPin = $("#bbPin");
  const bbError = $("#bbError");
  const bbList = $("#birthdayBetList");
  const bbGate = $("#birthdayGate");
  const expectedBbPin = (window.CONFIG && window.CONFIG.birthdayPin) || "9999";
  if (bbEnterBtn) {
    bbEnterBtn.addEventListener("click", async () => {
      const pin = (bbPin && bbPin.value.trim()) || "";
      const name = (bbName && bbName.value.trim()) || "";
      if (pin !== expectedBbPin) {
        if (bbError) bbError.textContent = "Wrong PIN. Try again.";
        return;
      }
      if (!name) {
        if (bbError) bbError.textContent = "Please enter your name.";
        return;
      }
      if (bbError) bbError.textContent = "";
      // render questions now
      if (bbList) {
        let data = [];
        if (location.protocol !== 'file:') {
          try {
            const res = await fetch('birthday-bets.json');
            if (res.ok) data = await res.json();
          } catch (e) {}
        }
        if (!data.length) data = (window.FALLBACK_BIRTHDAY_BETS || []);
        bbList.innerHTML = data.map((q, i) => {
          const opts = (q.options || []).map((o) => '<li class="bet-option-item">' + esc(o) + '</li>').join("");
          return '<li class="birthday-bet-item"><strong>' + (i + 1) + '. ' + esc(q.question) + '</strong><ul class="bet-sublist">' + opts + '</ul></li>';
        }).join("");
      }
      if (bbGate) bbGate.style.display = "none";
      if (bbList) bbList.style.display = "";
    });
  }
})();
