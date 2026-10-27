"use strict";
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

