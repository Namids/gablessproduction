"use strict";

/* =====================================================================
   Career application form
   ---------------------------------------------------------------------
   This site is hosted as static files (GitHub Pages), so there is no
   server to POST to and no database to write to. The form therefore
   composes a pre-filled email via a mailto: link, which matches how the
   contact and appointment forms on this site already behave.

   If a real database / server-side inbox is wanted later, the only
   change needed is to replace buildMailto() with a fetch() POST to a
   form endpoint (Formspree, Netlify Forms, Google Apps Script, etc.).
   The validation below can stay exactly as it is.
   ===================================================================== */

(function () {
  const APPLY_TO =
    (window.SITE_CONFIG && window.SITE_CONFIG.contactEmail) ||
    "gablessconsulting@gmail.com";

  const form = document.getElementById("career-apply-form");
  if (!form) return;

  // Keep the "email us directly" link in sync with the configured address.
  const directLink = document.getElementById("career-direct-email");
  if (directLink) {
    directLink.href = "mailto:" + APPLY_TO;
    directLink.textContent = APPLY_TO;
  }

  const field = (id) => form.querySelector("#" + id);
  const val = (id) => (field(id)?.value || "").trim();

  function clearError(el) {
    if (!el) return;
    el.classList.remove("is-invalid");
    el.removeAttribute("aria-invalid");
    const next = el.parentElement?.querySelector(".field-error");
    if (next) next.remove();
  }

  function showError(el, message) {
    if (!el) return;
    clearError(el);
    el.classList.add("is-invalid");
    el.setAttribute("aria-invalid", "true");
    const span = document.createElement("span");
    span.className = "field-error";
    span.textContent = message;
    el.parentElement.appendChild(span);
  }

  // Clear a field's error as soon as the applicant starts correcting it.
  ["applicantName", "applicantEmail", "applicantRole", "applicantMessage"].forEach(
    (id) => {
      const el = field(id);
      if (!el) return;
      el.addEventListener("input", () => clearError(el));
      el.addEventListener("change", () => clearError(el));
    },
  );

  function validate() {
    let firstInvalid = null;

    const checks = [
      ["applicantName", (v) => v.length >= 2, "Please enter your full name."],
      [
        "applicantEmail",
        (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
        "Please enter a valid email address.",
      ],
      ["applicantRole", (v) => v !== "", "Please choose the role you're interested in."],
      [
        "applicantMessage",
        (v) => v.length >= 20,
        "Please tell us a little more — at least a couple of sentences.",
      ],
    ];

    checks.forEach(([id, test, message]) => {
      const el = field(id);
      if (test(val(id))) {
        clearError(el);
      } else {
        showError(el, message);
        if (!firstInvalid) firstInvalid = el;
      }
    });

    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalid.focus({ preventScroll: true });
      return false;
    }
    return true;
  }

  function buildMailto() {
    const role = val("applicantRole");
    const name = val("applicantName");

    const subject = `Job application: ${role} — ${name}`;

    const body = [
      "APPLICANT DETAILS",
      "-----------------",
      `Name:       ${name}`,
      `Email:      ${val("applicantEmail")}`,
      `Phone:      ${val("applicantPhone") || "Not provided"}`,
      `Location:   ${val("applicantLocation") || "Not provided"}`,
      "",
      "ROLE",
      "----",
      `Applying for: ${role}`,
      `Experience:   ${val("applicantExperience") || "Not provided"}`,
      `CV / profile: ${val("applicantLinks") || "Not provided"}`,
      "",
      "ABOUT THE APPLICANT",
      "-------------------",
      val("applicantMessage"),
      "",
      "---",
      "Sent from the Careers page on the Gabless Healthcare Consulting website.",
      "Reminder: please attach your CV to this email before sending.",
    ].join("\n");

    return (
      "mailto:" +
      APPLY_TO +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body)
    );
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validate()) return;

    window.location.href = buildMailto();

    // The mailto: link hands off to the user's email app without actually
    // navigating away from this tab. There is no server here to confirm the
    // email was actually sent, so this manages expectations rather than
    // claiming delivery — see js/script.js for the same pattern elsewhere.
    const successPanel = document.getElementById("career-success");
    if (successPanel) {
      successPanel.hidden = false;
      successPanel.scrollIntoView({ behavior: "smooth", block: "center" });
      form.reset();
    }
  });
})();
