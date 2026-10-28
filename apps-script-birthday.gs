// Google Apps Script - paste into Extensions > Apps Script of your birthday bets sheet.
// Deploy as Web app: Execute as "Me", Who has access "Anyone".
// Sheet: https://docs.google.com/spreadsheets/d/1i2jMxx5CVeGnoat2cgX0f4qlbvH4ZxCpFpeEBSx8POM

function doPost(e) {
  const sheet = SpreadsheetApp.openById('1i2jMxx5CVeGnoat2cgX0f4qlbvH4ZxCpFpeEBSx8POM').getActiveSheet();
  let data = {};
  try { data = JSON.parse(e.postData.contents); } catch (err) { data = e.parameter || {}; }
  const answers = Array.isArray(data.answers) ? data.answers : [];
  const row = [new Date(), data.name || ''];
  for (let i = 0; i < 12; i++) {
    row.push(Array.isArray(answers[i]) ? answers[i].join(', ') : (answers[i] || ''));
  }
  sheet.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}