(function () {
  const form = document.getElementById("rsvpForm");
  const msg = document.getElementById("rsvpMsg");
  const drinkSel = document.getElementById("rsvpDrink");
  const prefs = document.getElementById("drinkPrefs");
  const drinkSection = document.getElementById("drinkSection");
  const attendingSel = document.getElementById("rsvpAttending");

  function toggleDrinkSection() {
    if (!drinkSection) return;
    const attending = attendingSel ? attendingSel.value : "yes";
    drinkSection.style.display = attending === "no" ? "none" : "block";
  }
  if (attendingSel) {
    attendingSel.addEventListener("change", toggleDrinkSection);
    toggleDrinkSection();
  }

  let togglePrefs = null;
  if (drinkSel && prefs) {
    togglePrefs = () => { prefs.style.display = drinkSel.value === "yes" ? "block" : "none"; };
    drinkSel.addEventListener("change", togglePrefs);
    togglePrefs();
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("rsvpName").value.trim();
      if (!name) return;
      const attending = document.getElementById("rsvpAttending").value;
      const drink = attending === "no" ? "no" : document.getElementById("rsvpDrink").value;
      const prefVals = attending === "no" ? [] : Array.from(prefs.querySelectorAll("input:checked")).map((x) => x.value);
      const notes = document.getElementById("rsvpNotes").value.trim();
      const entry = { name, attending, drink, prefs: prefVals, notes, ts: new Date().toISOString() };

      const endpoint = (window.CONTENT && window.CONTENT.rsvpEndpoint) || "";
      if (endpoint) {
        fetch(endpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(entry),
        }).then(() => {
          msg.textContent = "Thanks, " + name + "! RSVP submitted. Please check your Google Sheet to confirm it was recorded. 🎉 No gifts, please — your presence is the present.";
          form.reset();
          if (togglePrefs) togglePrefs();
        }).catch(() => {
          msg.textContent = "Failed to send to sheet. Please use the Google Sheet link below. 🎉";
        });
      } else {
        msg.textContent = "RSVP not stored (no backend). Please submit via the Google Sheet link below. 🎉 No gifts, please — your presence is the present.";
        form.reset();
        if (togglePrefs) togglePrefs();
      }
    });
  }

  const endpoint = (window.CONTENT && window.CONTENT.rsvpEndpoint) || "";
  const warn = document.getElementById("rsvpWarn");
  if (warn && !endpoint) warn.style.display = "block";

  const sheetUrl = (window.CONTENT && window.CONTENT.guestSheetUrl) || "";
  const sl = document.getElementById("sheetLink");
  if (sl && sheetUrl) sl.href = sheetUrl;
})();
