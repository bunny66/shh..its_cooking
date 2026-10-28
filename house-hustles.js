"use strict";
const HH_TASKS = [
  { id: "game_dealer", cat: "Game & Entertainment", icon: "🎰", name: "Game Dealer", desc: "Host one complete party game. Bring the chaos. Keep the players entertained.", reward: 20, slots: 3 },
  { id: "bet_boss", cat: "Game & Entertainment", icon: "🃏", name: "Bet Boss", desc: "Host one betting round and get guests placing their bets.", reward: 15, slots: 2 },
  { id: "scorekeeper", cat: "Game & Entertainment", icon: "📊", name: "Scorekeeper", desc: "Maintain the leaderboard or scores for one game.", reward: 15, slots: 2 },
  { id: "music_dealer", cat: "Game & Entertainment", icon: "🎵", name: "Music Dealer", desc: "Play 3 songs requested by guests.", reward: 15, slots: 2 },
  { id: "dance_recruiter", cat: "Game & Entertainment", icon: "💃", name: "Dance Recruiter", desc: "Get 3 guests onto the dance floor.", reward: 20, slots: 2 },
  { id: "mixologist", cat: "Food & Drinks", icon: "🍸", name: "Mixologist", desc: "Prepare or serve 5 drinks.", reward: 20, slots: 2 },
  { id: "food_runner", cat: "Food & Drinks", icon: "🍕", name: "Food Runner", desc: "Serve 5 food portions.", reward: 15, slots: 2 },
  { id: "cheers_captain", cat: "Food & Drinks", icon: "🥂", name: "Cheers Captain", desc: "Organize one group toast.", reward: 15, slots: 1 },
  { id: "cake_crew", cat: "Food & Drinks", icon: "🎂", name: "Cake Crew", desc: "Help with the birthday cake moment.", reward: 25, slots: 2 },
  { id: "paparazzi", cat: "Party & Chaos", icon: "📸", name: "Casino Paparazzi", desc: "Capture 5 fun candid photos during the party.", reward: 20, slots: 3 },
  { id: "decor_dealer", cat: "Party & Chaos", icon: "🎈", name: "Decor Dealer", desc: "Help set up or decorate one area.", reward: 15, slots: 2 },
  { id: "party_starter", cat: "Party & Chaos", icon: "🎉", name: "Party Starter", desc: "Help organize one surprise or group activity.", reward: 20, slots: 2 },
  { id: "wildcard", cat: "Party & Chaos", icon: "🃏", name: "Wildcard", desc: "Pitch your own helpful mini-task and complete it.", reward: 10, slots: null },
];
const HH_KEY = "house_hustles_claims";
function loadClaims() { try { return JSON.parse(localStorage.getItem(HH_KEY) || "[]"); } catch (e) { return []; } }
function saveClaims(c) { localStorage.setItem(HH_KEY, JSON.stringify(c)); }

const nameInput = document.getElementById("hhName");
const setNameBtn = document.getElementById("hhSetName");
const nameStatus = document.getElementById("hhNameStatus");
const balanceEl = document.getElementById("hhBalance");
const tasksEl = document.getElementById("hhTasks");
const myEl = document.getElementById("hhMy");
const adminPin = document.getElementById("hhAdminPin");
const adminBtn = document.getElementById("hhAdminBtn");
const adminPanel = document.getElementById("hhAdminPanel");
const adminList = document.getElementById("hhAdminList");

let guestName = localStorage.getItem("hh_guest_name") || "";
if (nameInput && guestName) nameInput.value = guestName;

function esc(s){ return String(s||"").replace(/[&<>"']/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

function getClaimsByGuest(name) {
  return loadClaims().filter(c => c.guest === name);
}
function slotCount(taskId) {
  return loadClaims().filter(c => c.taskId === taskId && c.status !== "released").length;
}

function statusLabel(s) {
  if (s === "claimed") return "Claimed";
  if (s === "awaiting") return "Awaiting Verification";
  if (s === "completed") return "Completed";
  return "Available";
}
function renderTasks() {
  if (!tasksEl) return;
  const cats = [...new Set(HH_TASKS.map(t => t.cat))];
  tasksEl.innerHTML = cats.map(cat => {
    const items = HH_TASKS.filter(t => t.cat === cat);
    return '<div class="bet-block" style="margin-bottom:16px;"><h3 class="section-title" style="font-size:1.2rem;">' + esc(cat) + '</h3>' +
      items.map(t => {
        const claimed = slotCount(t.id);
        const full = t.slots !== null && claimed >= t.slots;
        const myClaim = guestName ? loadClaims().find(c => c.guest === guestName && c.taskId === t.id && c.status !== "released") : null;
        let status = "available";
        if (myClaim) status = myClaim.status;
        else if (full) status = "full";
        const badge = status === "full" ? "Fully Claimed" : statusLabel(status === "available" ? "available" : status);
        const canClaim = !myClaim && !full && !!guestName;
        return '<div class="hh-card" style="background:var(--card);border:1px solid var(--card-border);border-radius:var(--radius);padding:14px;margin-bottom:10px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">' +
          '<div><span style="font-size:1.4rem;">' + esc(t.icon) + '</span> <strong style="color:var(--gold);">' + esc(t.name) + '</strong>' +
          '<p style="margin:4px 0 0;font-size:0.85rem;opacity:0.9;">' + esc(t.desc) + '</p></div>' +
          '<div style="text-align:right;"><div style="font-weight:700;color:var(--gold-bright);">+' + t.reward + ' chips</div>' +
          (t.slots !== null ? '<div style="font-size:0.75rem;opacity:0.8;">' + (t.slots - claimed) + ' slot(s) left</div>' : '<div style="font-size:0.75rem;opacity:0.8;">Unlimited</div>') + '</div></div>' +
          '<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;">' +
          '<span class="hh-status" style="font-size:0.8rem;padding:2px 8px;border-radius:999px;border:1px solid var(--card-border);">' + badge + '</span>' +
          (canClaim ? '<button class="btn btn-gold hh-claim" data-task="' + t.id + '" style="font-size:0.8rem;padding:6px 12px;">Claim Hustle</button>' : '') +
          (myClaim && myClaim.status === "claimed" ? '<button class="btn btn-outline hh-complete" data-task="' + t.id + '" style="font-size:0.8rem;padding:6px 12px;">Mark as Completed</button>' : '') +
          '</div></div>';
      }).join("") + '</div>';
  }).join("");
  tasksEl.querySelectorAll(".hh-claim").forEach(btn => {
    btn.addEventListener("click", () => claimTask(btn.dataset.task));
  });
  tasksEl.querySelectorAll(".hh-complete").forEach(btn => {
    btn.addEventListener("click", () => completeTask(btn.dataset.task));
  });
}


function claimTask(taskId) {
  if (!guestName) { if (nameStatus) nameStatus.textContent = "Please set your name first."; return; }
  const task = HH_TASKS.find(t => t.id === taskId);
  if (!task) return;
  const claimed = slotCount(taskId);
  if (task.slots !== null && claimed >= task.slots) { renderTasks(); return; }
  const claims = loadClaims();
  if (claims.find(c => c.guest === guestName && c.taskId === taskId && c.status !== "released")) return;
  claims.push({ guest: guestName, taskId, taskName: task.name, reward: task.reward, status: "claimed", ts: Date.now() });
  saveClaims(claims);
  const endpoint = (window.CONFIG && window.CONFIG.birthdayBetsEndpoint) || "";
  if (endpoint) {
    fetch(endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "hhClaim", guest: guestName, taskId, taskName: task.name, reward: task.reward, ts: new Date().toISOString() }) });
  }
  renderTasks(); renderMy();
}

function completeTask(taskId) {
  const claims = loadClaims();
  const c = claims.find(cl => cl.guest === guestName && cl.taskId === taskId && cl.status === "claimed");
  if (!c) return;
  c.status = "awaiting";
  saveClaims(claims);
  const endpoint = (window.CONFIG && window.CONFIG.birthdayBetsEndpoint) || "";
  if (endpoint) {
    fetch(endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "hhComplete", guest: guestName, taskId, ts: new Date().toISOString() }) });
  }
  renderTasks(); renderMy();
}

function renderMy() {
  if (!myEl || !guestName) { if (myEl) myEl.innerHTML = "<p class='empty-hint'>Set your name to see your hustles.</p>"; return; }
  const mine = getClaimsByGuest(guestName);
  if (!mine.length) { myEl.innerHTML = "<p class='empty-hint'>No hustles claimed yet.</p>"; return; }
  myEl.innerHTML = mine.map(c => {
    const task = HH_TASKS.find(t => t.id === c.taskId);
    return '<div style="background:var(--card);border:1px solid var(--card-border);border-radius:var(--radius);padding:12px;margin-bottom:8px;">' +
      '<strong style="color:var(--gold);">' + esc(c.taskName) + '</strong> — ' + statusLabel(c.status) +
      '<div style="font-size:0.85rem;opacity:0.9;margin-top:4px;">Reward: +' + c.reward + ' chips</div>' +
      (c.status === "claimed" ? '<div style="font-size:0.8rem;opacity:0.8;margin-top:4px;">Complete it during the party, then mark as completed.</div>' : '') +
      (c.status === "awaiting" ? '<div style="font-size:0.8rem;opacity:0.8;margin-top:4px;">Awaiting host verification.</div>' : '') +
      (c.status === "completed" ? '<div style="font-size:0.8rem;color:var(--gold-bright);margin-top:4px;">+' + c.reward + ' chips awarded!</div>' : '') +
      '</div>';
  }).join("");
function updateBalance() {
  if (!balanceEl) return;
  if (!guestName) { balanceEl.textContent = ""; return; }
  const endpoint = (window.CONFIG && window.CONFIG.birthdayBetsEndpoint) || "";
  if (!endpoint) { balanceEl.textContent = "Your chips: —"; return; }
  const cbName = "hh_bal_" + Date.now();
  const script = document.createElement("script");
  window[cbName] = function (res) {
    delete window[cbName];
    if (script.parentNode) script.parentNode.removeChild(script);
    try {
      const rows = (res && res.rows) ? res.rows : [];
      const mine = rows.filter(r => String(r.player || r.name || "").toLowerCase() === guestName.toLowerCase());
      const chips = mine.reduce((s, r) => s + Number(r.chips || 0), 0);
      balanceEl.textContent = "Your chips: " + chips;
    } catch (e) { balanceEl.textContent = "Your chips: —"; }
  };
  script.onerror = function () { delete window[cbName]; if (script.parentNode) script.parentNode.removeChild(script); };
  script.src = endpoint + (endpoint.indexOf("?") > -1 ? "&" : "?") + "sheet=leaderboard&callback=" + cbName;
  document.body.appendChild(script);
  setTimeout(() => { if (window[cbName]) { delete window[cbName]; if (script.parentNode) script.parentNode.removeChild(script); } }, 8000);
}

if (adminBtn) {
  adminBtn.addEventListener("click", () => {
    const pin = (adminPin && adminPin.value.trim()) || "";
    if (pin !== "9999") { if (adminPanel) adminPanel.style.display = "none"; return; }
    if (adminPanel) adminPanel.style.display = "block";
    renderAdmin();
  });
}
function renderAdmin() {
  if (!adminList) return;
  const claims = loadClaims().filter(c => c.status === "awaiting");
  if (!claims.length) { adminList.innerHTML = "<p class='empty-hint'>No pending verifications.</p>"; return; }
  adminList.innerHTML = claims.map(c =>
    '<div style="background:var(--card);border:1px solid var(--card-border);border-radius:var(--radius);padding:10px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">' +
    '<div><strong>' + esc(c.guest) + '</strong> — ' + esc(c.taskName) + ' (+' + c.reward + ' chips)</div>' +
    '<button class="btn btn-gold hh-verify" data-guest="' + esc(c.guest) + '" data-task="' + esc(c.taskId) + '" style="font-size:0.8rem;padding:6px 12px;">Verify & Award</button></div>'
  ).join("");
  adminList.querySelectorAll(".hh-verify").forEach(btn => {
    btn.addEventListener("click", () => verifyTask(btn.dataset.guest, btn.dataset.task));
  });
}
function verifyTask(guest, taskId) {
  const claims = loadClaims();
  const c = claims.find(cl => cl.guest === guest && cl.taskId === taskId);
  if (!c || c.status !== "awaiting") return;
  c.status = "completed";
  saveClaims(claims);
  const endpoint = (window.CONFIG && window.CONFIG.birthdayBetsEndpoint) || "";
  if (endpoint) {
    fetch(endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "hhAward", guest, taskId, taskName: c.taskName, reward: c.reward, ts: new Date().toISOString() }) });
  }
  renderAdmin(); renderTasks(); renderMy();
}

if (setNameBtn) {
  setNameBtn.addEventListener("click", () => {
    const name = (nameInput && nameInput.value.trim()) || "";
    if (!name) { if (nameStatus) nameStatus.textContent = "Please enter your name."; return; }
    guestName = name;
    localStorage.setItem("hh_guest_name", name);
    if (nameStatus) nameStatus.textContent = "Welcome, " + name + "!";
    renderTasks(); renderMy(); updateBalance();
  });
}
if (guestName) { if (nameStatus) nameStatus.textContent = "Welcome back, " + guestName + "!"; }
renderTasks(); renderMy(); updateBalance();
}