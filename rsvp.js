(function () {
  const STORAGE_KEY = "ayushman_rsvp_list";
  const form = document.getElementById("rsvpForm");
  const listEl = document.getElementById("rsvpList");
  const msg = document.getElementById("rsvpMsg");
  const drinkSel = document.getElementById("rsvpDrink");
  const prefs = document.getElementById("drinkPrefs");

  function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch (e) { return []; } }
  function save(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
  function renderList() {
    const list = load();
    if (!list.length) { listEl.innerHTML = "<p class='empty-hint'>No RSVPs yet.</p>"; if (document.getElementById("rsvpSummary")) document.getElementById("rsvpSummary").textContent = ""; return; }
    const attending = list.filter((r) => r.attending === "yes").length;
    const drinkers = list.filter((r) => r.drink === "yes").length;
    const drinkCounts = {};
    list.forEach((r) => (r.prefs || []).forEach((p) => { drinkCounts[p] = (drinkCounts[p] || 0) + 1; }));
    const drinkSummary = Object.entries(drinkCounts).map(([k,v]) => k + ": " + v).join(", ") || "—";
    const summaryEl = document.getElementById("rsvpSummary");
    if (summaryEl) summaryEl.textContent = "Total: " + list.length + " | Attending: " + attending + " | Drinkers: " + drinkers + " | " + drinkSummary;
    listEl.innerHTML = list.map((r) => {
      const prefs = (r.prefs || []).join(", ") || "—";
      return '<div class="artifact" style="text-align:left;margin-bottom:8px;">' +
        '<strong>' + escapeHtml(r.name) + '</strong> — ' + (r.attending === "yes" ? "Attending ✅" : "Not attending") +
        '<br/>Drinks: ' + (r.drink === "yes" ? "Yes (" + escapeHtml(prefs) + ")" : "No") +
        (r.notes ? '<br/>Comments: ' + escapeHtml(r.notes) : '') +
        '</div>';
    }).join("");
  }
  function escapeHtml(s){ return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

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
      const list = load();
      list.push(entry);
      save(list);
      renderList();
      msg.textContent = "Thanks, " + name + "! RSVP saved. 🎉 No gifts, please — your presence is the present.";
      form.reset();
      if (prefs) prefs.style.display = "none";

      const endpoint = (window.CONTENT && window.CONTENT.rsvpEndpoint) || "";
      if (endpoint) {
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(entry),
        }).then(() => {
          msg.textContent = "Thanks, " + name + "! RSVP saved & sent. 🎉 No gifts, please — your presence is the present.";
        }).catch(() => {
          msg.textContent = "Saved locally, but failed to send to sheet. 🎉";
        });
      }
    });
  }
  renderList();
})();
