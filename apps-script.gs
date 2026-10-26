// Google Apps Script — paste this into Extensions > Apps Script of your sheet.
// Deploy as Web app: Execute as "Me", Who has access "Anyone".
// Then copy the /exec URL into content.js -> rsvpEndpoint.

function doPost(e) {
  const sheet = SpreadsheetApp.openById('1dXKP1Fd2B7ZcXXR1-eQ_svPrDJj_fy8eIAg6aJPGlwY').getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.name, data.attending, data.drink, (data.prefs || []).join(', '), data.notes]);
  return ContentService.createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
