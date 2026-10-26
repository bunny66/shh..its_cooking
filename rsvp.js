(function () {
  const form = document.getElementById("rsvpForm");
  const msg = document.getElementById("rsvpMsg");
  const drinkSel = document.getElementById("rsvpDrink");
  const prefs = document.getElementById("drinkPrefs");
  const listEl = document.getElementById("rsvpList");
  const summaryEl = document.getElementById("rsvpSummary");

  if (drinkSel && prefs) {
    const togglePrefs = () => { prefs.style.display = drinkSel.value === "yes" ? "block" : "none"; };
    drinkSel.addEventListener("change", togglePrefs);
    togglePrefs();
  }

  const attendingSel = document.getElementById("rsvpAttending");
  const drinkSection = document.getElementById("drinkSection");
  const volunteerSection = document.getElementById("volunteerSection");
  function toggleSections() {
    const attending = attendingSel ? attendingSel.value : "yes";
    const hide = attending === "no";
    if (drinkSection) drinkSection.style.display = hide ? "none" : "block";
    if (volunteerSection) volunteerSection.style.display = hide ? "none" : "block";
  }
  if (attendingSel) {
    attendingSel.addEventListener("change", toggleSections);
    toggleSections();
  }

  const volSel = document.getElementById("rsvpVolunteer");
  const volRoles = document.getElementById("volunteerRoles");
  function toggleVolRoles() {
    if (!volRoles) return;
    const v = volSel ? volSel.value : "no";
    volRoles.style.display = v === "yes" ? "block" : "none";
  }
  if (volSel && volRoles) {
    volSel.addEventListener("change", toggleVolRoles);
    toggleVolRoles();
  }

  const endpoint = (window.CONTENT && window.CONTENT.rsvpEndpoint) || "";

  function escapeHtml(s){ return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

  function loadGuestList() {
    if (!endpoint || !listEl) return;
    const cbName = "cb_" + Date.now();
    const script = document.createElement("script");
    window[cbName] = function (data) {
      delete window[cbName];
      if (script.parentNode) script.parentNode.removeChild(script);
      const rows = (data && data.rows) || [];
      if (!rows.length) { listEl.innerHTML = "<p class='empty-hint'>No RSVPs yet.</p>"; if (summaryEl) summaryEl.textContent = ""; return; }
      const norm = (o) => { const out = {}; Object.keys(o || {}).forEach((k) => { out[String(k).toLowerCase().trim()] = o[k]; }); return out; };
      const mapped = rows.map(norm);
      const attending = mapped.filter((r) => String(r.attending || r.attend || "").toLowerCase().startsWith("y")).length;
      const drinkers = mapped.filter((r) => String(r.drink || r.drinks || "").toLowerCase().startsWith("y")).length;
      const drinkCounts = {};
      mapped.forEach((r) => {
        const prefs = r.prefs || r["drink preference"] || r.preferences || "";
        String(prefs).split(",").map((x) => x.trim()).filter(Boolean).forEach((p) => { drinkCounts[p] = (drinkCounts[p] || 0) + 1; });
      });
      const drinkSummary = Object.entries(drinkCounts).map(([k,v]) => k + ": " + v).join(", ") || "—";
      if (summaryEl) summaryEl.textContent = "Total: " + mapped.length + " | Attending: " + attending + " | Drinkers: " + drinkers + " | " + drinkSummary;
      listEl.innerHTML = mapped.map((r) => {
        const name = r.name || r["what should we call you"] || r["your name"] || "Guest";
        const att = String(r.attending || "").toLowerCase().startsWith("y") ? "Attending ✅" : "Not attending";
        const drink = String(r.drink || r.drinks || "").toLowerCase().startsWith("y");
        const prefs = r.prefs || r["drink preference"] || r.preferences || "—";
        const comments = r.notes || r.comments || r.comment || "";
        const vol = r.volunteer || r.volunteering || "";
        const volRoles = r["volunteer roles"] || r.volunteerroles || "";
        return '<div class="artifact" style="text-align:left;margin-bottom:8px;">' +
          '<strong>' + escapeHtml(name) + '</strong> — ' + att +
          '<br/>Drinks: ' + (drink ? "Yes (" + escapeHtml(String(prefs)) + ")" : "No") +
          (vol === "yes" ? '<br/>Volunteer: ' + escapeHtml(String(volRoles) || "Yes") : '') +
          (comments ? '<br/>Comments: ' + escapeHtml(String(comments)) : '') +
          '</div>';
      }).join("");
    };
    script.src = endpoint + (endpoint.indexOf("?") > -1 ? "&" : "?") + "callback=" + cbName;
    document.body.appendChild(script);
    setTimeout(() => { if (window[cbName]) { delete window[cbName]; if (script.parentNode) script.parentNode.removeChild(script); } }, 10000);
  }
  function submitViaForm(entry) {
    const f = document.createElement("form");
    f.method = "POST";
    f.action = endpoint;
    f.target = "hidden_iframe";
    f.style.display = "none";
    Object.keys(entry).forEach((k) => {
      const v = (k === "prefs" || k === "volunteerRoles") ? (entry[k] || []).join(", ") : entry[k];
      const inp = document.createElement("input");
      inp.type = "hidden";
      inp.name = k;
      inp.value = v == null ? "" : v;
      f.appendChild(inp);
    });
    document.body.appendChild(f);
    f.submit();
    setTimeout(() => f.remove(), 1000);
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
      const volunteer = volSel ? volSel.value : "no";
      const volunteerRolesVals = volunteer === "yes" && volRoles ? Array.from(volRoles.querySelectorAll("input:checked")).map((x) => x.value) : [];
      const entry = { name, attending, drink, prefs: prefVals, volunteer, volunteerRoles: volunteerRolesVals, notes, ts: new Date().toISOString() };

      const msg = document.getElementById("rsvpMsg");
      if (endpoint) {
        submitViaForm(entry);
        if (msg) {
          if (attending === "no") {
            msg.textContent = "Sorry you can't make it, " + name + ". Thanks for letting us know! 🙏";
          } else {
            msg.textContent = "Thanks, " + name + "! RSVP submitted. Please check the sheet to confirm. 🎉 No gifts, please — your presence is the present.";
          }
        }
        form.reset();
        if (drinkSel && prefs) { const t = () => { prefs.style.display = drinkSel.value === "yes" ? "block" : "none"; }; t(); }
        toggleSections();
        toggleVolRoles();
        setTimeout(loadGuestList, 2000);
      } else {
        if (msg) msg.textContent = "No backend configured. Please submit via the Google Sheet link. 🎉 No gifts, please — your presence is the present.";
        form.reset();
        if (drinkSel && prefs) { const t = () => { prefs.style.display = drinkSel.value === "yes" ? "block" : "none"; }; t(); }
        toggleSections();
        toggleVolRoles();
      }
    });
  }

  const sheetUrl = (window.CONTENT && window.CONTENT.guestSheetUrl) || "";
  const sl = document.getElementById("sheetLink");
  if (sl && sheetUrl) sl.href = sheetUrl;

  loadGuestList();
})();

