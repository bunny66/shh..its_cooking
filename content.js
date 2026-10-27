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
  photoFolderUrl: "https://drive.google.com/drive/folders/1xhrSxGy-fkgBZGnk8MEoiKKZpoPcpyxq?usp=drive_link", // Google Drive folder link to view uploaded photos
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
      icon: "🃏", name: "Poker Hands", players: "2-10", time: "", category: "Casino",
      featured: true,
      image: "https://images.ctfassets.net/o0c4x84rxbjm/1rNZghcE2A4v22v0Jbg9sl/ed0d96b522e21e2c116f8bb76e48c67a/gametypes_poker_rules_inpost4_efjuvMWeU.webp",
      link: "https://www.youtube.com/shorts/1IkvR0bfF4M",
      rules: [
        "Objective: Win the chips in the pot by holding the best five-card poker hand at showdown or forcing all others to fold.",
        "The Deal: Every player receives 2 private face-down hole cards.",
        "Community Cards: 5 shared cards placed face-up across three phases.",
        "The Flop: First 3 community cards dealt face-up, then second betting round.",
        "The Turn: 4th community card dealt face-up, then third betting round.",
        "The River: 5th and final community card dealt face-up, then final betting round.",
        "Hand Construction: Use any combination of your 2 hole cards and 5 community cards to form your best 5-card hand.",
        "The Showdown: Remaining players reveal hole cards after final betting; highest-ranked hand claims the pot.",
        "Check: Pass action without betting, only if no bet has been made this round.",
        "Bet: Place chips into the pot, forcing others to match, raise, or fold.",
        "Call: Match the highest bet or raise to stay active.",
        "Raise: Increase the current bet, forcing others to pay more.",
        "Fold: Surrender cards and forfeit chips contributed this hand.",
        "Hand rankings (high to low): Royal Flush, Straight Flush, Four of a Kind, Full House, Flush, Straight, Three of a Kind, Two Pair, One Pair, High Card.",
      ],
    },
    {
      icon: "🎡", name: "Roulette with a twist", players: "2+", time: "", category: "Casino",
      featured: true,
      image: "https://m.media-amazon.com/images/I/71iHL3hoDuL._SL1493_.jpg",
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
      icon: "🎯", name: "Casino Tambola", players: "2+", time: "", category: "Casino",
      featured: true,
      image: "https://m.media-amazon.com/images/I/91O+GGvc37L._SL1500_.jpg",
      rules: [
        "Casino-themed Tambola (Housie). Each player gets a ticket with numbers.",
        "Caller draws numbers; players mark matches on their ticket.",
        "First to complete a row/column wins a line prize; full house wins the jackpot.",
        "Casino twist: bonus prizes for corners, star, and top/bottom lines.",
        "House (Ayushman) calls the numbers — keep your tickets ready!",
      ],
    },
    {
      icon: "🃏", name: "Monopoly Deal", players: "2-5", time: "", category: "Cards",
      featured: true,
      image: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000491668399/vjL_wZh0dk-491668399-2.jpg",
      rules: [
        "Fast-paced card version of Monopoly. First to collect 3 complete property sets wins.",
        "On your turn: draw 2 cards, play up to 3 cards (property, money, or action).",
        "Action cards: Deal Breaker, Sly Deal, Forced Deal, Rent, Debt Collector, etc.",
        "Bank your money and properties; protect sets with house/hotel cards.",
        "Say 'No!' with Just Say No cards. Last one standing with 3 sets wins!",
      ],
    },
    {
      icon: "🥤", name: "Fastest Reflex Takes the Cup", players: "2+", time: "👑", category: "Party",
      featured: true,
      link: "https://www.instagram.com/p/DRf2ILzkuS1/",
      rules: [
        "A fast-paced reflex challenge — first to react takes the cup!",
        "Watch the reference video for the rules: https://www.instagram.com/p/DRf2ILzkuS1/",
        "Host calls a cue; fastest player to grab the cup wins the round.",
        "Winner collects chips; losers pay a small penalty.",
        "Keep it fun — skip if you dislike the dare.",
      ],
    },
    {
      icon: "🥤", name: "Cup Stack", players: "2+", time: "👑",
      featured: true,
      rules: [
        "Stack 4 cups with index cards in between.",
        "Once built, remove each card until the cups fall into a single stack.",
        "Reference: https://www.instagram.com/p/BpDlpSDAxMV/",
        "Fastest to complete the stack wins!",
        "Play responsibly and have fun!",
      ],
      link: "https://www.instagram.com/p/BpDlpSDAxMV/",
    },
    {
      icon: "🥤", name: "Musical Cups", players: "Group", time: "👑",
      featured: true,
      category: "Pong",
      rules: [
        "Musical Chair ❌ Musical Cups ✅",
        "Materials: Cups and Music.",
        "Play music; when it stops, grab a cup. No cup = out.",
        "Try this at your next gathering!",
        "Reference: https://www.instagram.com/p/DUJFVe7kzsS/",
      ],
      link: "https://www.instagram.com/p/DUJFVe7kzsS/",
    },
    {
      icon: "🃏", name: "Blow-De-Deck", players: "2+", time: "👑",
      featured: true,
      link: "https://www.instagram.com/p/DYwx2AxP5YN/",
      rules: [
        "The ultimate test of lung capacity, precision, and pure chaos.",
        "A full deck of cards is balanced on top of an upside-down drinking glass.",
        "Players stand a few paces back and blow cards off the deck into a plate below.",
        "Blow too softly and nothing moves; blow too hard and cards scatter wildly.",
        "Round ends when the glass is empty; player with most cards in the plate wins bragging rights.",
        "A hilarious mix of gentle strategy, red-faced straining, and unpredictable card physics!",
      ],
    },
    {
      icon: "🃏", name: "Bluff", players: "3-8", time: "10-20 min/game", category: "Cards",
      image: "https://m.media-amazon.com/images/I/617L-zUy-oL._SL1080_.jpg",
      rules: [
        "Also known as Cheat / I Doubt It. Goal: be first to get rid of all your cards.",
        "Play 1-4 cards face-down claiming they are the current rank (Aces, then 2s, 3s...).",
        "Next player must play the next rank up (or bluff). Challenge with 'Bluff!' if you doubt.",
        "If caught bluffing, you pick up the pile; if wrong challenge, challenger picks up the pile.",
        "First to empty hand wins. Keep a poker face — bluffing is the game!",
      ],
    },
    {
      icon: "🏓", name: "Can 'N' Ball", players: "Teams", time: "Party game", category: "Pong",
      rules: [
        "Teams Orange and Green face off in Can 'N' Ball!",
        "A ping pong ball in each glass wins.",
        "Reference: https://www.instagram.com/outscordgames/reel/DcPjVlPpyuU/",
        "First team to land balls in all glasses wins.",
        "Play responsibly and have fun!",
      ],
      link: "https://www.instagram.com/outscordgames/reel/DcPjVlPpyuU/",
    },
    {
      icon: "🃏", name: "UNO", players: "2-10", time: "10-20 min/game",
      category: "Cards",
      rules: [
        "Match color or number with the top card of the discard pile.",
        "Action cards: Skip, Reverse, Draw Two, Wild, Wild Draw Four.",
        "Play a Wild to change the color. Wild Draw Four only if no matching color.",
        "Shout 'UNO!' when you have one card left.",
        "First to empty hand wins. Draw from the deck if you can't play.",
      ],
    },
    {
      icon: "🃏", name: "Blackjack", players: "2-7", time: "5-10 min/round", category: "Cards",
      rules: [
        "Goal: beat the dealer by getting closest to 21 without busting.",
        "Card values: 2-10 face value, J/Q/K = 10, Ace = 1 or 11.",
        "Dealer must hit until 17 (stands on soft 17).",
        "Blackjack (Ace + 10-value) pays 3:2. Insurance pays 2:1.",
        "Double down on first two cards; split pairs; no surrender.",
      ],
    },
    {
      icon: "♦️", name: "Baccarat", players: "2+", time: "2-4 min/hand", category: "Cards",
      rules: [
        "Bet on Player, Banker, or Tie before cards are dealt.",
        "Two cards each; third card drawn by fixed rules (no decisions).",
        "Closest to 9 wins. 10s and face cards = 0; Ace = 1.",
        "Banker pays 0.95:1 (5% commission), Player pays 1:1, Tie pays 8:1.",
      ],
    },
    {
      icon: "🃏", name: "Teen Patti", players: "3-6", time: "5-15 min/game", category: "Cards",
      rules: [
        "Indian 3-card poker. Each player gets 3 cards; best hand wins the pot.",
        "Hand rankings: Trail (3 of a kind) > Pure Sequence > Sequence > Color > Pair > High Card.",
        "Play blind (without seeing) or seen (after viewing cards).",
        "Blind players bet less; seen players must bet double to stay in.",
        "Showdown when only 2 players remain. Side show allowed between adjacent players.",
      ],
    },
    {
      icon: "🎲", name: "Craps", players: "2+", time: "1-3 min/roll", category: "Dice",
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
