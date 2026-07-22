/**
 * APEX website — track application intake.
 *
 * Bind this to the "APEX Track Applications (Website)" Google Sheet:
 *   Sheet -> Extensions -> Apps Script -> paste this -> Save.
 *   Deploy -> New deployment -> Web app -> Execute as: Me, Who has access: Anyone -> Deploy.
 *   Copy the /exec URL into the site's GOOGLE_APPS_SCRIPT_URL env var.
 *
 * The site POSTs JSON: { name, email, linkedin, militaryTrack, track, why }
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000); // avoid interleaved rows on concurrent submits
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Name", "Email", "LinkedIn Profile",
        "Military Track", "Track Interested", "Why",
      ]);
    }
    var d = JSON.parse(e.postData.contents || "{}");
    sheet.appendRow([
      new Date(),
      d.name || "",
      d.email || "",
      d.linkedin || "",
      d.militaryTrack || "",
      d.track || "",
      d.why || "",
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
