// ============================================================
//  EDIT THIS FILE to add your content for Ayushman's Casino Night
//  Photos, artifacts, games (+rules), and YouTube playlists.
//  Image paths: put files in an "assets/" folder and reference
//  like "assets/photo1.jpg", or use full URLs.
// ============================================================

window.CONTENT = {
  photos: [
    // { src: "assets/photo1.jpg", caption: "The birthday boy" },
    // { src: "assets/photo2.jpg", caption: "Vegas vibes" },
  ],

  photoUploadFormUrl: "", // Google Form with File upload question -> uploads to Google Drive
  photoFolderUrl: "", // Google Drive folder link to view uploaded photos
  googleFormUrl: "", // paste Google Form embed URL here to collect RSVPs centrally (export to CSV)
  guestSheetUrl: "https://docs.google.com/spreadsheets/d/1dXKP1Fd2B7ZcXXR1-eQ_svPrDJj_fy8eIAg6aJPGlwY/edit?usp=sharing", // guest list sheet
  rsvpEndpoint: "https://script.google.com/macros/s/AKfycbyNew4GwEdWKjmfuPas4Omea_x4oqKl5D8SE0yvjsaorf-LPHGDCM9q8ByVnZzrmYR7VA/exec", // Google Apps Script web app URL to save RSVPs to the sheet

  agenda: [
    // Add optional image per item to make it clickable, e.g.:
    // { icon: "🤝", label: "Meet", image: "assets/meet.jpg" },
    { icon: "🤝", label: "Meet & Greet" },
    { icon: "🍽️", label: "Eat" },
    { icon: "🥂", label: "Drink" },
    { icon: "🎰", label: "Games" },
    { icon: "💃", label: "Dance" },
    { icon: "📸", label: "Photobooth" },
    { icon: "🎂", label: "Cake" },
  ],

  artifacts: [
    { icon: "🎲", name: "Dice Set", desc: "Premium casino dice for the night's games." },
    { icon: "🃏", name: "Card Deck", desc: "Custom branded playing cards." },
    { icon: "🪙", name: "Poker Chips", desc: "High-roller chip set: red, blue, gold & black." },
    { icon: "🎰", name: "Slot Machine", desc: "Mini slot machine for quick spins." },
    { icon: "🎡", name: "Roulette Wheel", desc: "The centerpiece of the casino floor." },
    { icon: "🎡", name: "House of Quirk Drinking Game Set", desc: "Spinning wheel, 1 ball & 16 shot glasses — multicolour. Spin, drink, repeat!" },
    { icon: "👑", name: "Dealer Visor", desc: "For the house dealer of the night." },
  ],

  games: [
    {
      icon: "🃏", name: "Poker Hands", players: "2-10", time: "👑",
      featured: true,
      image: "https://images.ctfassets.net/o0c4x84rxbjm/1rNZghcE2A4v22v0Jbg9sl/ed0d96b522e21e2c116f8bb76e48c67a/gametypes_poker_rules_inpost4_efjuvMWeU.webp",
      rules: [
        "Our most-played game of the night — tap the card to view the full poker hands chart.",
        "Hand rankings (high to low): Royal Flush, Straight Flush, Four of a Kind, Full House, Flush, Straight, Three of a Kind, Two Pair, One Pair, High Card.",
        "Best 5-card hand wins. Ties split the pot.",
      ],
    },
    {
      icon: "🎡", name: "Roulette with a twist", players: "2+", time: "👑",
      featured: true,
      rules: [
        "Roulette itself with a twist — spin the wheel, one ball, place your bets.",
        "Place bets on numbers, colors, odds/evens, or ranges before the spin.",
        "Dealer spins the wheel and drops the single ball.",
        "Straight up pays 35:1; split 17:1; street 11:1; corner 8:1.",
        "Red/Black, Odd/Even, High/Low pay 1:1. House wins on 0.",
        "Drinking twist: losers drink, winners pour — use the 1 ball & 16 shot glasses!",
        "Spin, drink, repeat. Play responsibly and have fun!",
      ],
    },
    {
      icon: "🎯", name: "Casino Tambola", players: "2+", time: "👑",
      featured: true,
      rules: [
        "Casino-themed Tambola (Housie). Each player gets a ticket with numbers.",
        "Caller draws numbers; players mark matches on their ticket.",
        "First to complete a row/column wins a line prize; full house wins the jackpot.",
        "Casino twist: bonus prizes for corners, star, and top/bottom lines.",
        "House (Ayushman) calls the numbers — keep your tickets ready!",
      ],
    },
    {
      icon: "🃏", name: "Monopoly Deal", players: "2-5", time: "👑",
      featured: true,
      rules: [
        "Fast-paced card version of Monopoly. First to collect 3 complete property sets wins.",
        "On your turn: draw 2 cards, play up to 3 cards (property, money, or action).",
        "Action cards: Deal Breaker, Sly Deal, Forced Deal, Rent, Debt Collector, etc.",
        "Bank your money and properties; protect sets with house/hotel cards.",
        "Say 'No!' with Just Say No cards. Last one standing with 3 sets wins!",
      ],
    },
    {
      icon: "🃏", name: "Bluff", players: "3-8", time: "👑",
      featured: true,
      rules: [
        "Also known as Cheat / I Doubt It. Goal: be first to get rid of all your cards.",
        "Play 1-4 cards face-down claiming they are the current rank (Aces, then 2s, 3s...).",
        "Next player must play the next rank up (or bluff). Challenge with 'Bluff!' if you doubt.",
        "If caught bluffing, you pick up the pile; if wrong challenge, challenger picks up the pile.",
        "First to empty hand wins. Keep a poker face — bluffing is the game!",
      ],
    },
    {
      icon: "🃏", name: "Blackjack", players: "2-7", time: "5-10 min/round",
      rules: [
        "Goal: beat the dealer by getting closest to 21 without busting.",
        "Card values: 2-10 face value, J/Q/K = 10, Ace = 1 or 11.",
        "Dealer must hit until 17 (stands on soft 17).",
        "Blackjack (Ace + 10-value) pays 3:2. Insurance pays 2:1.",
        "Double down on first two cards; split pairs; no surrender.",
      ],
    },
    {
      icon: "♠️", name: "Texas Hold'em", players: "2-10", time: "10-30 min/hand",
      rules: [
        "Each player gets 2 hole cards; 5 community cards dealt over rounds.",
        "Best 5-card hand wins. Rounds: pre-flop, flop, turn, river.",
        "Actions: check, bet, call, raise, fold, all-in.",
        "Blinds rotate each hand. Standard poker hand rankings apply.",
      ],
    },
    {
      icon: "♦️", name: "Baccarat", players: "2+", time: "2-4 min/hand",
      rules: [
        "Bet on Player, Banker, or Tie before cards are dealt.",
        "Two cards each; third card drawn by fixed rules (no decisions).",
        "Closest to 9 wins. 10s and face cards = 0; Ace = 1.",
        "Banker pays 0.95:1 (5% commission), Player pays 1:1, Tie pays 8:1.",
      ],
    },
    {
      icon: "🎲", name: "Craps", players: "2+", time: "1-3 min/roll",
      rules: [
        "Shooter rolls two dice. Pass Line wins on 7/11, loses on 2/3/12.",
        "Any other number becomes the Point; shooter must hit it again before 7.",
        "Don't Pass is the opposite. Place bets on specific numbers anytime.",
        "Come/Don't Come bets work like Pass/Don't Pass after a point is set.",
      ],
    },
  ],

  playlists: [
    { title: "Casino Night Mix", url: "https://www.youtube.com/watch?v=xB-BHUvWgjk&list=RDxB-BHUvWgjk&start_radio=1" },
    { title: "Casino Night Playlist 1", url: "https://www.youtube.com/watch?v=ydQtI30SbBg&list=PLTfxiuA09ZhhKWkVJ_O7P0Vj93HsqHEI8" },
    { title: "Casino Night Playlist 2", url: "https://www.youtube.com/watch?v=0aUav1lx3rA&list=RD0aUav1lx3rA&start_radio=1" },
    { title: "Casino Night Playlist 3", url: "https://www.youtube.com/watch?v=NDnoRl9AdyY&list=RDNDnoRl9AdyY&start_radio=1" },
    { title: "Casino Night Playlist 4", url: "https://www.youtube.com/watch?v=XO8wew38VM8&list=RDXO8wew38VM8&start_radio=1" },
    { title: "Casino Night Playlist 5", url: "https://www.youtube.com/watch?v=kFpW5y_M9QM&list=RDkFpW5y_M9QM&start_radio=1" },
    { title: "Casino Night Playlist 6", url: "https://www.youtube.com/watch?v=PUO7_Gi6ipg&list=RDPUO7_Gi6ipg&start_radio=1" },
    { title: "Casino Night Playlist 7", url: "https://www.youtube.com/watch?v=mdPrweVv7DE&list=RDmdPrweVv7DE&start_radio=1" },
    { title: "Casino Night Playlist 8", url: "https://youtu.be/R_ijlnDtKa4?si=UBUeoEJ1RR3mK_I-" },
    { title: "Casino Night Playlist 9", url: "https://youtu.be/A8NkB-C98lk?si=Lz7iJICRjftpFxOS" },
    { title: "Casino Night Playlist 10", url: "https://www.youtube.com/watch?v=vC8qJfVYxZY" },
    // { title: "Casino Night Vibes", url: "https://www.youtube.com/playlist?list=PLxxxxxxxx" },
    // { title: "Vegas Classics", url: "https://www.youtube.com/watch?v=VIDEO_ID" },
  ],
};
