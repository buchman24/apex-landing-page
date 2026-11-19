/**
 * APEX website — track application intake.
 *
 * Bind this to the "APEX Track Applications (Website)" Google Sheet:
 *   Sheet -> Extensions -> Apps Script -> paste this -> Save.
 *   Deploy -> Manage deployments -> edit the existing Web app -> Version: New
 *   version -> Deploy. (Keeps the same /exec URL, so GOOGLE_APPS_SCRIPT_URL
 *   does not change.)
 *
 * The site POSTs JSON: { name, email, phone, linkedin, militaryTrack, track, why }
 *
 * This writer is HEADER-MAPPED: it writes each value to the column whose
 * header matches, rather than by fixed position. So existing rows stay aligned
 * even as columns are added. If the "טלפון" (phone) column is missing it is
 * inserted right after "LinkedIn Profile", and existing rows get a blank cell
 * there (so their data stays under the correct headers).
 */
var DEFAULT_HEADERS = [
  "Timestamp", "Name", "Email", "LinkedIn Profile", "טלפון",
  "Military Track", "Track Interested", "Why",
];

// Maps each incoming JSON field to its sheet header.
function rowValuesFromPayload(d) {
  return {
    "Timestamp": new Date(),
    "Name": d.name || "",
    "Email": d.email || "",
    "LinkedIn Profile": d.linkedin || "",
    "טלפון": d.phone || "",
    "Military Track": d.militaryTrack || "",
    "Track Interested": d.track || "",
    "Why": d.why || "",
  };
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000); // avoid interleaved rows on concurrent submits
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Empty sheet: lay down the full header row (including טלפון).
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(DEFAULT_HEADERS);
    }

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Ensure a phone column exists, right after "LinkedIn Profile".
    if (headers.indexOf("טלפון") === -1) {
      var liIdx = headers.indexOf("LinkedIn Profile"); // 0-based
      var insertAfter = liIdx === -1 ? sheet.getLastColumn() : liIdx + 1; // 1-based
      sheet.insertColumnAfter(insertAfter);
      sheet.getRange(1, insertAfter + 1).setValue("טלפון");
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }

    var d = JSON.parse(e.postData.contents || "{}");
    var values = rowValuesFromPayload(d);

    // Build the row from the sheet's actual header order.
    var row = headers.map(function (h) {
      return Object.prototype.hasOwnProperty.call(values, h) ? values[h] : "";
    });
    sheet.appendRow(row);

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
