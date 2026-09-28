"use strict";

/* Contact page form handler.
   Previously this bound to a click on the submit button and would throw a
   TypeError on any page where that button didn't exist (killing the rest of
   the script). It now binds to the form's submit event, guards for missing
   elements, validates input, and sends to the company address from
   js/site-config.js rather than a hardcoded personal inbox. */

const submitContactForm = function () {
  const form = document.querySelector(".contact-us-form .form");

  if (!form) return;

  const successPanel = document.getElementById("contact-success");

  const contactEmail =
    (window.SITE_CONFIG && window.SITE_CONFIG.contactEmail) ||
    "gablessconsulting@gmail.com";

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = form.querySelector(".nameC")?.value.trim() || "";
    const email = form.querySelector(".emailC")?.value.trim() || "";
    const phoneNumber = form.querySelector(".phoneC")?.value.trim() || "";
    const subjectField = form.querySelector(".subjectC")?.value.trim() || "";
    const message = form.querySelector(".messageC")?.value.trim() || "";
    const wantsNewsletter = form.querySelector('input[name="news"]')?.checked;

    if (!name || !email || !message) {
      alert("Please fill in your name, email and message.");
      return;
    }

    const subject = subjectField
      ? `${subjectField} — enquiry from ${name}`
      : `Website enquiry from ${name}`;

    const body = [
      `Name: ${name}`,
      `Phone: ${phoneNumber}`,
      `Email: ${email}`,
      wantsNewsletter ? "Newsletter: yes, please subscribe me" : "",
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href =
      "mailto:" +
      contactEmail +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    // See script.js for why this is shown immediately rather than after a
    // server confirms delivery — there is no server on this static site.
    if (successPanel) {
      successPanel.hidden = false;
      successPanel.scrollIntoView({ behavior: "smooth", block: "center" });
      form.reset();
    }
  });
};

document.addEventListener("DOMContentLoaded", submitContactForm);
