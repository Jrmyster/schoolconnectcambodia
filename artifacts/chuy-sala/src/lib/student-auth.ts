/* ══════════════════════════════════════════════════════════════════════════
 * Student Username + PIN auth helpers
 *
 * The backend auth API stores email/password. To let students who don't have
 * email addresses sign up with just a username + 4-digit PIN, we silently
 * append a synthetic domain to the username on the client *before* talking to
 * the API. The API never knows the difference — it just sees an email.
 *
 *   sokha_12A  +  PIN 1234
 *   ────────────────────────────►   sokha_12a@student.schoolconnect.local
 *                                   password = "1234"
 *
 * The same suffix lets the admin dashboard recognise PIN students and strip
 * the suffix back off when listing them.
 * ══════════════════════════════════════════════════════════════════════════ */

export const STUDENT_DOMAIN = "student.schoolconnect.local";
export const STUDENT_EMAIL_SUFFIX = `@${STUDENT_DOMAIN}`;

/** Letters, digits, underscore. 3–32 chars. (Case is preserved in display
 *  but normalised to lowercase before sending to the API.) */
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,32}$/;

/** Exactly 4 numeric digits. */
export const PIN_REGEX = /^\d{4}$/;

/** Convert a raw student username to the synthetic email the backend expects. */
export function usernameToEmail(username: string): string {
  return `${username.trim().toLowerCase()}${STUDENT_EMAIL_SUFFIX}`;
}

/** Strip the synthetic suffix back off for display in admin lists, etc. */
export function emailToUsername(email: string): string {
  if (!isStudentPinEmail(email)) return email;
  return email.slice(0, -STUDENT_EMAIL_SUFFIX.length);
}

/** True iff this email is a synthetic student-PIN email. */
export function isStudentPinEmail(email: string): boolean {
  return email.toLowerCase().endsWith(STUDENT_EMAIL_SUFFIX);
}

/** Validate a username. Returns `{ ok: true }` or `{ ok: false, errorEn, errorKh }`. */
export function validateUsername(
  raw: string,
): { ok: true } | { ok: false; errorEn: string; errorKh: string } {
  const v = (raw ?? "").trim();
  if (!v) {
    return {
      ok: false,
      errorEn: "Username is required",
      errorKh: "ឈ្មោះអ្នកប្រើប្រាស់ត្រូវការ",
    };
  }
  if (!USERNAME_REGEX.test(v)) {
    return {
      ok: false,
      errorEn:
        "Use 3–32 characters: letters, digits, and underscore (_) only. No spaces.",
      errorKh:
        "ប្រើ ៣–៣២ តួ៖ អក្សរ លេខ និងសញ្ញាគូស្បែក (_) ប៉ុណ្ណោះ។ មិនអនុញ្ញាតិឱ្យមានដកឃ្លា។",
    };
  }
  return { ok: true };
}

/** Validate a PIN. Returns `{ ok: true }` or `{ ok: false, errorEn, errorKh }`. */
export function validatePin(
  raw: string,
): { ok: true } | { ok: false; errorEn: string; errorKh: string } {
  const v = (raw ?? "").trim();
  if (!v) {
    return {
      ok: false,
      errorEn: "PIN is required",
      errorKh: "លេខសម្ងាត់ត្រូវការ",
    };
  }
  if (!PIN_REGEX.test(v)) {
    return {
      ok: false,
      errorEn: "PIN must be exactly 4 digits (0–9).",
      errorKh: "លេខសម្ងាត់ត្រូវមានពិតប្រាកដ ៤ ខ្ទង់ (០–៩)។",
    };
  }
  return { ok: true };
}
