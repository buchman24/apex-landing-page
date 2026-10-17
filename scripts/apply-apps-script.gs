/**
 * APEX website — track application intake.
 *
 * Bind this to the "APEX Track Applications (Website)" Google Sheet:
 *   Sheet -> Extensions -> Apps Script -> paste this -> Save.
 *   Deploy -> New deployment -> Web app -> Execute as: Me, Who has access: Anyone -> Deploy.
 *   Copy the /exec URL into the site's GOOGLE_APPS_SCRIPT_URL env var.
 *
 * The site POSTs JSON: { name, email, linkedin, militaryTrack, track, why, source }
 *
 * Website 2.0 added `source` (the utm_* parameters of the link the applicant came from).
 * To store it: paste this updated script, then Deploy -> Manage deployments -> Edit ->
 * Version: New version -> Deploy. Editing the existing deployment keeps the same /exec URL,
 * so GOOGLE_APPS_SCRIPT_URL does not change. Also add a "Source" header in column H of row 1.
 * Until then the field is simply ignored and applications keep working.
 */
// A value that starts with = + - or @ would run as a formula when the team opens the sheet.
function safe(v) {
  v = String(v || "");
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000); // avoid interleaved rows on concurrent submits
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Name", "Email", "LinkedIn Profile",
        "Military Track", "Track Interested", "Why", "Source",
      ]);
    }
    var d = JSON.parse(e.postData.contents || "{}");
    sheet.appendRow([
      new Date(),
      safe(d.name),
      safe(d.email),
      safe(d.linkedin),
      safe(d.militaryTrack),
      safe(d.track),
      safe(d.why),
      safe(d.source),
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
