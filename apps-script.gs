// Google Apps Script - paste into Extensions > Apps Script of your sheet.
// Deploy as Web app: Execute as "Me", Who has access "Anyone".

function doGet(e) {
  const sheet = SpreadsheetApp.openById('1dXKP1Fd2B7ZcXXR1-eQ_svPrDJj_fy8eIAg6aJPGlwY').getActiveSheet();
  const rows = sheet.getDataRange().getValues();
  const headers = rows.length ? rows[0] : [];
  const data = rows.slice(1).map(function (r) {
    const obj = {};
    headers.forEach(function (h, i) { obj[h] = r[i]; });
    return obj;
  });
  const payload = JSON.stringify({ rows: data, headers: headers });
  const cb = e && e.parameter && e.parameter.callback;
  if (cb) {
    return ContentService.createTextOutput(cb + '(' + payload + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(payload)
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = SpreadsheetApp.openById('1dXKP1Fd2B7ZcXXR1-eQ_svPrDJj_fy8eIAg6aJPGlwY').getActiveSheet();
  let data = {};
  try { data = JSON.parse(e.postData.contents); } catch (err) { data = e.parameter || {}; }
  sheet.appendRow([
    new Date(),
    data.name,
    data.attending,
    data.drink,
    (data.prefs || []).join(', '),
    data.volunteer || 'no',
    (data.volunteerRoles || []).join(', '),
    data.notes
  ]);
  const cb = e && e.parameter && e.parameter.callback;
  const payload = JSON.stringify({ result: 'ok' });
  if (cb) {
    return ContentService.createTextOutput(cb + '(' + payload + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(payload)
    .setMimeType(ContentService.MimeType.JSON);
}
