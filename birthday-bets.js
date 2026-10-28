"use strict";
const bbEnterBtn = document.querySelector("#bbEnterBtn");
const bbName = document.querySelector("#bbName");
const bbPin = document.querySelector("#bbPin");
const bbError = document.querySelector("#bbError");
const bbGate = document.querySelector("#birthdayGate");
const bbQuiz = document.querySelector("#bbQuiz");
const bbQuestion = document.querySelector("#bbQuestion");
const bbOptions = document.querySelector("#bbOptions");
const bbLockBtn = document.querySelector("#bbLockBtn");
const bbResult = document.querySelector("#bbResult");
const bbProgress = document.querySelector("#bbProgress");
const bbNextBtn = document.querySelector("#bbNextBtn");
const bbSubmitBtn = document.querySelector("#bbSubmitBtn");
const bbSummary = document.querySelector("#bbSummary");
const bbSummaryList = document.querySelector("#bbSummaryList");
const bbThanks = document.querySelector("#bbThanks");

const expectedBbPin = (window.CONFIG && window.CONFIG.birthdayPin) || "9999";
let bbQuestions = [];
let bbIndex = 0;
let bbAnswers = [];
let bbAnswered = false;

async function loadBbQuestions() {
  let data = [];
  if (location.protocol !== 'file:') {
    try {
      const res = await fetch('birthday-bets.json');
      if (res.ok) data = await res.json();
    } catch (e) {}
  }
  if (!data.length) data = window.FALLBACK_BIRTHDAY_BETS || [];
  return data;
}

function renderBbQuestion() {
  if (!bbQuestions.length) return;
  const q = bbQuestions[bbIndex];
  if (bbQuestion) bbQuestion.textContent = q.question;
  if (bbOptions) {
    bbOptions.innerHTML = "";
    const ul = document.createElement("ul");
    ul.className = "photo-checklist";
    ul.style.maxWidth = "100%";
    q.options.forEach((o, i) => {
      const li = document.createElement("li");
      const label = document.createElement("label");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = String(i);
      label.appendChild(cb);
      label.appendChild(document.createTextNode(" " + o));
      li.appendChild(label);
      ul.appendChild(li);
    });
    bbOptions.appendChild(ul);
  }
  if (bbResult) bbResult.textContent = "";
  bbAnswered = false;
  if (bbProgress) bbProgress.textContent = "Question " + (bbIndex + 1) + " of " + bbQuestions.length;
  if (bbNextBtn) bbNextBtn.style.display = "none";
  if (bbSubmitBtn) bbSubmitBtn.style.display = "none";
  if (bbLockBtn) bbLockBtn.style.display = "";
}

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
    bbQuestions = await loadBbQuestions();
    bbIndex = 0;
    bbAnswers = [];
    if (bbGate) bbGate.style.display = "none";
    if (bbQuiz) bbQuiz.style.display = "";
    renderBbQuestion();
  });
}

if (bbLockBtn) {
  bbLockBtn.addEventListener("click", () => {
    const checked = Array.from(bbOptions.querySelectorAll('input[type="checkbox"]:checked')).map((c) => parseInt(c.value, 10));
    if (!checked.length) {
      if (bbResult) bbResult.textContent = "Pick at least one option!";
      return;
    }
    bbAnswered = true;
    bbAnswers[bbIndex] = checked;
    bbOptions.querySelectorAll('input[type="checkbox"]').forEach((c) => { c.disabled = true; });
    if (bbResult) bbResult.textContent = "Locked: " + checked.map((i) => bbQuestions[bbIndex].options[i]).join(", ");
    if (bbLockBtn) bbLockBtn.style.display = "none";
    if (bbIndex >= bbQuestions.length - 1) {
      if (bbSubmitBtn) bbSubmitBtn.style.display = "";
    } else {
      if (bbNextBtn) bbNextBtn.style.display = "";
    }
  });
}

if (bbNextBtn) {
  bbNextBtn.addEventListener("click", () => {
    bbIndex++;
    if (bbIndex >= bbQuestions.length) return;
    renderBbQuestion();
  });
}

if (bbSubmitBtn) {
  bbSubmitBtn.addEventListener("click", () => {
    if (bbQuiz) bbQuiz.style.display = "none";
    if (bbSummary) bbSummary.style.display = "";
    if (bbSummaryList) {
      bbSummaryList.innerHTML = bbQuestions.map((q, i) => {
        const ans = (bbAnswers[i] && bbAnswers[i].length) ? bbAnswers[i].map((idx) => q.options[idx]).join(", ") : "—";
        return '<div style="margin-bottom:8px;"><strong>' + (i + 1) + '. ' + esc(q.question) + '</strong><br/><span style="opacity:0.85;">Your pick: ' + esc(ans) + '</span></div>';
      }).join("");
    }
    if (bbThanks) bbThanks.textContent = "Thanks for playing! Your predictions are locked in. 🎉";
  });
}