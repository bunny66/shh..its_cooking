"use strict";
  // KBC background image with fallback
  (function () {
    const primary = "https://static.wikia.nocookie.net/millionaire/images/a/a4/KBC16_2024.png/revision/latest?cb=20241001050334";
    const fallback = "https://static.langimg.com/nbt/thumb/69355236/kbc.jpg?imgsize=428966&width=400&height=225&resizemode=75";
    const el = document.querySelector(".bet-block.bet-jackpot");
    if (!el) return;
    const img = new Image();
    img.onload = () => { el.style.backgroundImage = 'url("' + primary + '")'; };
    img.onerror = () => { el.style.backgroundImage = 'url("' + fallback + '")'; };
    img.src = primary;
  })();


"use strict";
  // Place Your Bet - fun quiz
  const betChips = $("#betChips");
  const betSelected = $("#betSelected");
  const placeBetBtn = $("#placeBetBtn");
  const betResult = $("#betResult");
  const betQuestion = $("#betQuestion");
  const betOptions = $("#betOptions");
  const betScore = $("#betScore");
  const nextQBtn = $("#nextQBtn");

  const FALLBACK_QUESTIONS = [
    { question: "How many cards are there in a standard deck, without jokers?", options: ["48", "50", "52", "54"], answer: 2, prize: "₹1,000", explanation: "A standard deck has 52 cards: 4 suits, with 13 cards in each." },
    { question: "In Ludo, what do you need to roll to move a token out of the starting area?", options: ["A 1", "A 4", "A 5", "A 6"], answer: 3, prize: "₹2,000", explanation: "In standard Ludo rules, rolling a six lets you bring a token out of its starting area." },
    { question: "A player plays their second-to-last card in UNO but forgets to say 'UNO.' When can another player catch them?", options: ["Before the next player begins their turn", "Only after the game ends", "Only if they have a Wild card", "They cannot be penalized"], answer: 0, prize: "₹5,000", explanation: "Under the official rules, a player can be caught before the next player begins their turn." },
    { question: "In chess, which piece can jump over other pieces?", options: ["Bishop", "Knight", "Rook", "Queen"], answer: 1, prize: "₹10,000", explanation: "The knight moves in an L-shape and is the only chess piece that can jump over others." },
    { question: "In Monopoly, what happens when you land on an unowned property?", options: ["You must buy it", "You may buy it or it goes to auction", "You get it for free", "You pay rent to the bank"], answer: 1, prize: "₹20,000", explanation: "You can buy the property at its listed price; if you decline, it goes to auction." },
    { question: "In Tambola, how many numbers are printed on a standard ticket?", options: ["12", "15", "18", "20"], answer: 1, prize: "₹50,000", explanation: "A standard Tambola ticket contains 15 numbers arranged across 3 rows and 9 columns." },
    { question: "In poker, which hand beats a Flush?", options: ["Three of a Kind", "Straight", "Full House", "Two Pair"], answer: 2, prize: "₹1 lakh", explanation: "A Full House beats a Flush because it ranks higher in standard poker hand rankings." },
    { question: "In chess, what is it called when a pawn reaches the opposite end of the board?", options: ["Castling", "En passant", "Promotion", "Stalemate"], answer: 2, prize: "₹10 lakh", explanation: "A pawn reaching the last rank is promoted, usually to a queen." },
    { question: "In Monopoly, how many houses can you build on a property before upgrading to a hotel?", options: ["3", "4", "5", "6"], answer: 1, prize: "₹1 crore", explanation: "You can build up to four houses on each property before upgrading to a hotel." },
    { question: "In Scrabble, what is the maximum number of points a blank tile can score?", options: ["0", "1", "5", "10"], answer: 0, prize: "₹7 crore", explanation: "Blank tiles are worth zero points, even when placed on a premium square." },
  ];
  let questions = FALLBACK_QUESTIONS;
  let qIndex = 0;
  let selectedBet = null;
  let score = 0;
  let answered = false;
  let selectedOption = null;

  function renderQuestion() {
    const q = questions[qIndex % questions.length];
    if (betQuestion) betQuestion.textContent = q.question;
    if (betOptions) {
      betOptions.innerHTML = "";
      q.options.forEach((o, i) => {
        const b = document.createElement("button");
        b.className = "kbc-option";
        const label = String.fromCharCode(65 + i);
        b.innerHTML = '<span class="kbc-label">' + label + '</span><span>' + esc(o) + '</span>';
        b.addEventListener("click", () => {
          if (answered) return;
          betOptions.querySelectorAll(".kbc-option").forEach((x) => x.classList.remove("selected"));
          b.classList.add("selected");
          selectedOption = i;
        });
        betOptions.appendChild(b);
      });
    }
    if (betResult) betResult.textContent = "";
    answered = false;
    selectedOption = null;
  }

  if (betChips) {
    betChips.querySelectorAll(".bet-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        betChips.querySelectorAll(".bet-chip").forEach((c) => c.classList.remove("selected"));
        chip.classList.add("selected");
        selectedBet = parseInt(chip.getAttribute("data-val"), 10);
        if (betSelected) betSelected.textContent = "Selected: " + selectedBet;
      });
    });
  }
  // prize won so far (value of last correctly answered question)
  let prizeWon = 0;

  if (placeBetBtn) {
    placeBetBtn.addEventListener("click", () => {
      if (selectedOption === null) { if (betResult) betResult.textContent = "Pick an answer!"; return; }
      if (answered) return;
      answered = true;
      const q = questions[qIndex % questions.length];
      const opts = betOptions.querySelectorAll (".kbc-option");
      opts[q.answer].classList.add("correct");
      if (selectedOption !== q.answer) opts[selectedOption].classList.add("wrong");
      if (selectedOption === q.answer) {
        prizeWon = prizeValue(q.prize);
        if (betResult) betResult.textContent = playerName + ": Correct! Prize: " + (q.prize || "") + "  " + (q.explanation || "");
        if (qIndex >= questions.length - 1) {
          // completed all questions
          const finalWin = prizeWon;
          if (betResult) betResult.textContent = "🎉 " + playerName + " won " + (q.prize || "") + "!  " + (q.explanation || "");
          if (betScore) betScore.textContent = "Final: " + finalWin.toLocaleString("en-IN");
          if (nextQBtn) nextQBtn.style.display = "none";
        } else {
          if (nextQBtn) nextQBtn.style.display = "";
        }
        // confetti
        for (let i = 0; i < 6; i++) {
          const conf = document.createElement("span");
          conf.textContent = ["🎉","✨","💰","♠","♥","♦","♣"][Math.floor(Math.random()*7)];
          conf.style.cssText = "position:fixed;left:50%;top:50%;font-size:1.4rem;pointer-events:none;z-index:9999;animation:confetti 1.2s ease-out forwards;";
          const angle = Math.random() * Math.PI * 2;
          const dist = 80 + Math.random() * 120;
          conf.style.setProperty("--dx", Math.cos(angle)*dist + "px");
          conf.style.setProperty("--dy", Math.sin(angle)*dist + "px");
          document.body.appendChild(conf);
          setTimeout(() => conf.remove(), 1300);
        }
        const st = document.createElement("style");
        if (!document.getElementById("confettiStyle")) {
          st.id = "confettiStyle";
          st.textContent = "@keyframes confetti { 0% { transform: translate(0,0) rotate(0deg); opacity:1; } 100% { transform: translate(var(--dx), var(--dy)) rotate(360deg); opacity:0; } }";
          document.head.appendChild(st);
        }
      } else {
        // wrong answer: apply bet rule
        const finalWin = (prizeWon >= (selectedBet || 0)) ? prizeWon : 0;
        if (betResult) betResult.textContent = playerName + ": Wrong! (correct: " + q.options[q.answer] + ")  " + (q.explanation || "") +
          "  → You " + (finalWin > 0 ? "win " + finalWin.toLocaleString("en-IN") : "win 0 (your bet was higher than your prize so far)");
        if (betScore) betScore.textContent = "Final: " + finalWin.toLocaleString("en-IN");
        if (nextQBtn) nextQBtn.style.display = "none";
      }
      if (betScore && selectedOption === q.answer && qIndex < questions.length - 1) {
        if (betScore) betScore.textContent = "Score: " + prizeWon.toLocaleString("en-IN");
      }
    });
  }
  if (nextQBtn) {
    nextQBtn.style.display = "none";
    nextQBtn.addEventListener("click", () => {
      qIndex++;
      if (qIndex >= questions.length) return;
      renderQuestion();
      if (nextQBtn) nextQBtn.style.display = "none";
    });
  }
  // KBC intro: prize ladder + bet + enter game
  const kbcIntro = $("#kbcIntro");
  const betQuiz = $("#betQuiz");
  const introChips = $("#introChips");
  const introSelected = $("#introSelected");
  const enterGameBtn = $("#enterGameBtn");
  const playerNameInput = $("#playerNameInput");
  const pinInput = $("#pinInput");
  const pinError = $("#pinError");
  let introBet = null;
  let playerName = "";
  (async () => {
    if (location.protocol !== 'file:') {
      try {
        const res = await fetch('bet-questions.json');
        if (res.ok) questions = await res.json();
      } catch (e) {}
    }
    renderQuestion();
    if (introChips) makeChips(introChips, (v) => { introBet = v; if (introSelected) introSelected.textContent = "Your Bet: " + v.toLocaleString("en-IN"); });
    if (betChips) makeChips(betChips, (v) => { selectedBet = v; if (betSelected) betSelected.textContent = "Selected: " + v.toLocaleString("en-IN"); });
  })();



  function prizeValue(str) {
    if (!str) return 0;
    const s = String(str).replace(/[₹,\s]/g, "").toLowerCase();
    const m = s.match(/^([\d.]+)(lakh|crore)?$/);
    if (!m) return 0;
    const num = parseFloat(m[1]);
    if (m[2] === "lakh") return Math.round(num * 100000);
    if (m[2] === "crore") return Math.round(num * 10000000);
    return Math.round(num);
  }

  function shortPrize(str) {
    const v = prizeValue(str);
    if (v >= 10000000) return (v / 10000000) + "Cr";
    if (v >= 100000) return (v / 100000) + "L";
    if (v >= 1000) return (v / 1000) + "k";
    return String(v);
  }

  function makeChips(container, onSelect) {
    if (!container) return;
    container.innerHTML = "";
    const seen = new Set();
    const colors = ["chip-red","chip-green","chip-blue","chip-white","chip-black","chip-gold","chip-purple","chip-red","chip-green","chip-blue"];
    let ci = 0;
    questions.forEach((q) => {
      const v = prizeValue(q.prize);
      if (seen.has(v)) return;
      seen.add(v);
      const btn = document.createElement("button");
      btn.className = "bet-chip " + colors[ci % colors.length];
      ci++;
      btn.setAttribute("data-val", String(v));
      btn.textContent = shortPrize(q.prize);
      btn.addEventListener("click", () => {
        container.querySelectorAll(".bet-chip").forEach((c) => c.classList.remove("selected"));
        btn.classList.add("selected");
        onSelect(v);
      });
      container.appendChild(btn);
    });
  }

  if (introChips) {
    makeChips(introChips, (v) => {
      introBet = v;
      if (introSelected) introSelected.textContent = "Your Bet: " + v.toLocaleString("en-IN");
    });
  }
  if (betChips) {
    makeChips(betChips, (v) => {
      selectedBet = v;
      if (betSelected) betSelected.textContent = "Selected: " + v.toLocaleString("en-IN");
    });
  }
  if (enterGameBtn) {
    enterGameBtn.addEventListener("click", () => {
      const expectedPin = (window.CONFIG && window.CONFIG.pin) || "2025";
      const pin = (pinInput && pinInput.value.trim()) || "";
      const name = (playerNameInput && playerNameInput.value.trim()) || "";
      const missing = [];
      if (pin !== expectedPin) missing.push("correct PIN");
      if (!name) missing.push("name");
      if (introBet === null) missing.push("bet chip");
      if (missing.length) {
        if (pinError) pinError.textContent = "Missing/invalid: " + missing.join(", ") + ".";
        return;
      }
      if (pinError) pinError.textContent = "";
      playerName = name;
      if (kbcIntro) kbcIntro.style.display = "none";
      if (betQuiz) betQuiz.style.display = "";
      selectedBet = introBet;
      if (betSelected) betSelected.textContent = "Selected: " + (selectedBet || "none");
      renderQuestion();
    });
  }

  // render ladder after questions load
  // (handled by main async block above)


