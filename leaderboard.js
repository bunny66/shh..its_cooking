(function () {
  const SHEET_ID = "1i2jMxx5CVeGnoat2cgX0f4qlbvH4ZxCpFpeEBSx8POM";
  const body = document.getElementById("leaderboardBody");
  const status = document.getElementById("leaderboardStatus");
  if (!body) return;

  function escapeHtml(s) { return String(s || "").replace(/[&<>\"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  function loadFromEndpoint() {
    if (status) status.textContent = "Loading leaderboard...";
    var endpoint = (window.CONFIG && window.CONFIG.birthdayBetsEndpoint) || "";
    if (!endpoint) { if (status) status.textContent = "No endpoint configured."; return; }
    var cbName = "lb_cb_" + Date.now();
    var script = document.createElement("script");
    window[cbName] = function (res) {
      delete window[cbName];
      if (script.parentNode) script.parentNode.removeChild(script);
      try {
        var rows = (res && res.rows) ? res.rows : [];
        var mapped = rows.map(function (r) {
          var out = {};
          Object.keys(r || {}).forEach(function (k) { out[String(k).toLowerCase().trim()] = r[k]; });
          return {
            player: out.player || out.name || "Guest",
            chips: Number(out.chips || out.chip || 0),
            remarks: out.remarks || out.remark || out.note || ""
          };
        });
        mapped.sort(function (a, b) { return b.chips - a.chips; });
        if (!mapped.length) {
          body.innerHTML = "<tr><td colspan='4' style='padding:10px;text-align:center;'>No leaderboard data yet.</td></tr>";
          if (status) status.textContent = "";
          return;
        }
        body.innerHTML = mapped.map(function (r, i) {
          var medal = i === 0 ? "🥇 " : i === 1 ? "🥈 " : i === 2 ? "🥉 " : "";
          return "<tr style='border-bottom:1px solid rgba(255,255,255,0.08);'>" +
            "<td style='padding:10px;'>" + (i + 1) + "</td>" +
            "<td style='padding:10px;'>" + medal + escapeHtml(r.player) + "</td>" +
            "<td style='padding:10px;text-align:right;font-weight:600;'>" + r.chips + "</td>" +
            "<td style='padding:10px;'>" + escapeHtml(r.remarks) + "</td>" +
            "</tr>";
        }).join("");
        if (status) {
      if (/index\.html$|^\/$/.test(location.pathname)) status.textContent = "";
      else status.textContent = "Live from Google Sheet.";
    }
      } catch (e) {
        if (status) status.textContent = "Could not load leaderboard.";
        body.innerHTML = "<tr><td colspan='4' style='padding:10px;text-align:center;'>Failed to load data.</td></tr>";
      }
    };
    script.onerror = function () {
      delete window[cbName];
      if (script.parentNode) script.parentNode.removeChild(script);
      if (status) status.textContent = "Could not load leaderboard.";
    };
    var url = endpoint + (endpoint.indexOf("?") > -1 ? "&" : "?") + "sheet=leaderboard&callback=" + cbName;
    script.src = url;
    document.body.appendChild(script);
    setTimeout(function () {
      if (window[cbName]) {
        delete window[cbName];
        if (script.parentNode) script.parentNode.removeChild(script);
        if (status) status.textContent = "Timed out loading leaderboard.";
      }
    }, 10000);
  }


  function load() {
    var endpoint = (window.CONFIG && window.CONFIG.birthdayBetsEndpoint) || "";
    if (endpoint) { loadFromEndpoint(); return; }
  }
  load();
})();