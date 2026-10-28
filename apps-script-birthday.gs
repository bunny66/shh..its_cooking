// Google Apps Script - paste into Extensions > Apps Script of your birthday bets sheet.
// Deploy as Web app: Execute as "Me", Who has access "Anyone".
// Sheet: https://docs.google.com/spreadsheets/d/1i2jMxx5CVeGnoat2cgX0f4qlbvH4ZxCpFpeEBSx8POM

function doPost(e) {
  const sheetName = (e && e.parameter && e.parameter.sheet) ? String(e.parameter.sheet) : "";
  let data = {};
  try { data = JSON.parse(e.postData.contents); } catch (err) { data = e.parameter || {}; }

  // House Hustles actions
  if (data.action === "hhClaim") {
    const ss = SpreadsheetApp.openById('1i2jMxx5CVeGnoat2cgX0f4qlbvH4ZxCpFpeEBSx8POM');
    const sh = ss.getSheetByName('HouseHustles') || ss.insertSheet('HouseHustles');
    if (sh.getLastRow() === 0) sh.appendRow(['timestamp','guest','taskId','taskName','reward','status']);
    sh.appendRow([new Date(), data.guest || '', data.taskId || '', data.taskName || '', data.reward || 0, 'Claimed']);
    return ContentService.createTextOutput(JSON.stringify({ result: 'ok' })).setMimeType(ContentService.MimeType.JSON);
  }
  if (data.action === "hhComplete") {
    const ss = SpreadsheetApp.openById('1i2jMxx5CVeGnoat2cgX0f4qlbvH4ZxCpFpeEBSx8POM');
    const sh = ss.getSheetByName('HouseHustles') || ss.insertSheet('HouseHustles');
    if (sh.getLastRow() === 0) sh.appendRow(['timestamp','guest','taskId','taskName','reward','status']);
    sh.appendRow([new Date(), data.guest || '', data.taskId || '', '', 0, 'Awaiting Verification']);
    return ContentService.createTextOutput(JSON.stringify({ result: 'ok' })).setMimeType(ContentService.MimeType.JSON);
  }
  if (data.action === "hhAward") {
    const ss = SpreadsheetApp.openById('1i2jMxx5CVeGnoat2cgX0f4qlbvH4ZxCpFpeEBSx8POM');
    const lb = ss.getSheetByName('leaderboard') || ss.getActiveSheet();
    lb.appendRow([new Date(), data.guest || '', data.reward || 0, 'House Hustle: ' + (data.taskName || '')]);
    // mark completed in HouseHustles
    const sh = ss.getSheetByName('HouseHustles');
    if (sh) sh.appendRow([new Date(), data.guest || '', data.taskId || '', data.taskName || '', data.reward || 0, 'Completed']);
    return ContentService.createTextOutput(JSON.stringify({ result: 'ok' })).setMimeType(ContentService.MimeType.JSON);
  }

  // existing birthday bets
  const sheet = SpreadsheetApp.openById('1i2jMxx5CVeGnoat2cgX0f4qlbvH4ZxCpFpeEBSx8POM').getActiveSheet();
  let answers = Array.isArray(data.answers) ? data.answers : [];
  const row = [new Date(), data.name || ''];
  for (let i = 0; i < 12; i++) {
    row.push(Array.isArray(answers[i]) ? answers[i].join(', ') : (answers[i] || ''));
  }
  sheet.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheetName = (e && e.parameter && e.parameter.sheet) ? String(e.parameter.sheet) : "";
  if (sheetName === "leaderboard") {
    const ss = SpreadsheetApp.openById('1i2jMxx5CVeGnoat2cgX0f4qlbvH4ZxCpFpeEBSx8POM');
    const sh = ss.getSheetByName('leaderboard') || ss.getActiveSheet();
    const values = sh.getDataRange().getValues();
    const headers = values.length ? values[0].map(function (h) { return String(h || '').trim().toLowerCase(); }) : [];
    const data = values.slice(1).map(function (r) {
      const obj = {};
      headers.forEach(function (h, i) { obj[h] = r[i]; });
      return {
        player: obj.player || obj.name || 'Guest',
        chips: Number(obj.chips || obj.chip || 0),
        remarks: obj.remarks || obj.remark || obj.note || ''
      };
    }).filter(function (r) { return r.player; });
    const payload = JSON.stringify({ rows: data, headers: headers });
    const cb = e && e.parameter && e.parameter.callback;
    if (cb) {
      return ContentService.createTextOutput(cb + '(' + payload + ')')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService.createTextOutput(payload)
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}