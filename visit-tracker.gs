/**
 * Google Apps Script for website visit logging.
 *
 * Setup (once):
 * 1. Create a new Google Sheet (e.g. "Website Visits").
 * 2. Extensions → Apps Script, paste this file, Save.
 * 3. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web app URL into script.js → VISIT_TRACKING_ENDPOINT
 */

const SHEET_NAME = 'Visits';
const HEADERS = [
  'Visited At',
  'UTM Source',
  'UTM Medium',
  'UTM Content',
  'IP',
  'City',
  'Region',
  'Country',
  'Latitude',
  'Longitude',
  'Page URL',
  'Referrer',
  'User Agent'
];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    sheet.appendRow([
      data.visited_at || new Date().toISOString(),
      data.utm_source || '',
      data.utm_medium || '',
      data.utm_content || '',
      data.ip || '',
      data.city || '',
      data.region || '',
      data.country || '',
      data.latitude || '',
      data.longitude || '',
      data.page_url || '',
      data.referrer || '',
      data.user_agent || ''
    ]);
    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse_({
    ok: true,
    message: 'Visit tracker is live. POST JSON visit payloads here.'
  });
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
