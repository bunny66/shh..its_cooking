# Atyshman's Birthday — Casino Night 🎰

A responsive, mobile + tablet + desktop + TV friendly single-page website for Atyshman's birthday casino night theme.

## Files
- `index.html` — page structure
- `styles.css` — styling (all aspect ratios / breakpoints)
- `script.js` — rendering + lightbox + interactions
- `content.js` — **edit this** to add your photos, artifacts, games & rules, YouTube playlists
- `assets/` — put your photos here (create this folder)

## How to add content
Open `content.js` and fill the arrays:

```js
photos: [
  { src: "assets/photo1.jpg", caption: "The birthday boy" },
],
artifacts: [
  { icon: "🎲", name: "Dice Set", desc: "Premium casino dice." },
],
games: [
  { icon: "🃏", name: "Blackjack", players: "2-7", time: "5-10 min/round",
    rules: ["Goal: beat dealer...", "Card values: ..."] },
],
playlists: [
  { title: "Casino Night Vibes", url: "https://www.youtube.com/playlist?list=PLxxxx" },
  { title: "Vegas Classics", url: "https://www.youtube.com/watch?v=VIDEO_ID" },
],
```

## Run locally
Just open `index.html` in any browser. For best results (and to avoid file:// restrictions) serve it:

```bash
cd "shh..its_cooking"
python3 -m http.server 8000
# then open http://localhost:8000
```

## TV / big screen tips
- Use browser fullscreen (F11) or cast to TV.
- All tap targets are large; arrow keys navigate the lightbox.
- Layout adapts to 4:3, 16:9, 21:9 and portrait orientations.

## Host on GitHub Pages
This repo is already static. To publish:
1. Push to `main` (done).
2. On GitHub: **Settings → Pages → Source → GitHub Actions**.
3. The workflow `.github/workflows/pages.yml` will build & deploy automatically on every push.
4. Your site URL will be `https://bunny66.github.io/shh..its_cooking/`.

> Note: `.nojekyll` is included so GitHub Pages serves files as-is.
