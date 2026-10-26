(function () {
  const form = document.getElementById("rsvpForm");
  const msg = document.getElementById("rsvpMsg");
  const drinkSel = document.getElementById("rsvpDrink");
  const prefs = document.getElementById("drinkPrefs");

  if (drinkSel && prefs) {
    const toggle = () => { prefs.style.display = drinkSel.value === "yes" ? "block" : "none"; };
    drinkSel.addEventListener("change", toggle);
    toggle();
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("rsvpName").value.trim();
      if (!name) return;
      const attending = document.getElementById("rsvpAttending").value;
      const drink = document.getElementById("rsvpDrink").value;
      const prefVals = Array.from(prefs.querySelectorAll("input:checked")).map((x) => x.value);
      const notes = document.getElementById("rsvpNotes").value.trim();
      const entry = { name, attending, drink, prefs: prefVals, notes, ts: new Date().toISOString() };

      const endpoint = (window.CONTENT && window.CONTENT.rsvpEndpoint) || "";
      if (endpoint) {
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(entry),
        }).then(() => {
          msg.textContent = "Thanks, " + name + "! RSVP sent to the sheet. 🎉 No gifts, please — your presence is the present.";
          form.reset();
          if (prefs) prefs.style.display = "none";
        }).catch(() => {
          msg.textContent = "Failed to send to sheet. Please use the Google Sheet link below. 🎉";
        });
      } else {
        msg.textContent = "RSVP not stored (no backend). Please submit via the Google Sheet link below. 🎉 No gifts, please — your presence is the present.";
        form.reset();
        if (prefs) prefs.style.display = "none";
      }
    });
  }

  const sheetUrl = (window.CONTENT && window.CONTENT.guestSheetUrl) || "";
  const sl = document.getElementById("sheetLink");
  if (sl && sheetUrl) sl.href = sheetUrl;
})();
