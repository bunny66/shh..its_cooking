# Ayushman's Birthday — Casino Night 🎰

A responsive, mobile + tablet + desktop + TV friendly single-page website for Ayushman's birthday casino night theme.

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

## Collect RSVPs into the Google Sheet (optional)
To save each RSVP directly to your Google Sheet on submit (no Google Sheet API key needed):

1. Open your Google Sheet → **Extensions → Apps Script**.
2. Paste this code:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.openById('1dXKP1Fd2B7ZcXXR1-eQ_svPrDJj_fy8eIAg6aJPGlwY').getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.name, data.attending, data.drink, (data.prefs || []).join(', '), data.notes]);
  return ContentService.createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy → New deployment → Web app**: Execute as "Me", Who has access "Anyone".
4. Copy the web app URL.
5. Paste it into `content.js` → `rsvpEndpoint: "https://script.google.com/macros/s/.../exec"`.
6. Push — RSVPs will now be appended to the sheet automatically.

> Note: The local form still saves to the browser for instant feedback; the endpoint adds the central record.
## Collect guest photos (Google Drive)
Guests can upload photos directly to a Google Drive folder via a Google Form with a "File upload" question.

1. Create a Google Form → add a "File upload" question.
2. In the form settings, responses are stored in a Google Drive folder (auto-created).
3. Copy the form's share URL → `content.js` → `photoUploadFormUrl`.
4. Share the Drive folder (or a Google Photos album) → paste its URL → `content.js` → `photoFolderUrl`.
5. Push — "📸 Upload Photos" and "View Gallery ↗" buttons appear in the Photo Gallery section.
## Host on GitHub Pages
This repo is already static. To publish:
1. Push to `main` (done).
2. On GitHub: **Settings → Pages → Source → GitHub Actions**.
3. The workflow `.github/workflows/pages.yml` will build & deploy automatically on every push.
4. Your site URL will be `https://bunny66.github.io/shh..its_cooking/`.

> Note: `.nojekyll` is included so GitHub Pages serves files as-is.
