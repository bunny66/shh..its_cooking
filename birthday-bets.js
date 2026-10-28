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
let bbSelected = null;

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
    q.options.forEach((o, i) => {
      const b = document.createElement("button");
      b.className = "kbc-option";
      const label = String.fromCharCode(65 + i);
      b.innerHTML = '<span class="kbc-label">' + label + '</span><span>' + esc(o) + '</span>';
      b.addEventListener("click", () => {
        if (bbAnswered) return;
        bbOptions.querySelectorAll(".kbc-option").forEach((x) => x.classList.remove("selected"));
        b.classList.add("selected");
        bbSelected = i;
      });
      bbOptions.appendChild(b);
    });
  }
  if (bbResult) bbResult.textContent = "";
  bbAnswered = false;
  bbSelected = null;
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
    if (bbSelected === null) {
      if (bbResult) bbResult.textContent = "Pick an answer!";
      return;
    }
    bbAnswered = true;
    bbAnswers[bbIndex] = bbSelected;
    const opts = bbOptions.querySelectorAll(".kbc-option");
    opts[bbSelected].classList.add("selected");
    if (bbResult) bbResult.textContent = "Locked: " + bbQuestions[bbIndex].options[bbSelected];
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
        const ans = (bbAnswers[i] !== undefined) ? q.options[bbAnswers[i]] : "—";
        return '<div style="margin-bottom:8px;"><strong>' + (i + 1) + '. ' + esc(q.question) + '</strong><br/><span style="opacity:0.85;">Your pick: ' + esc(ans) + '</span></div>';
      }).join("");
    }
    if (bbThanks) bbThanks.textContent = "Thanks for playing! Your predictions are locked in. 🎉";
  });
}