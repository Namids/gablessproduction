"use strict";

/* Business email comes from js/site-config.js so there's one place to
   change it. Falls back to the company address if that file didn't load. */
const CONTACT_EMAIL =
  (window.SITE_CONFIG && window.SITE_CONFIG.contactEmail) ||
  "gablessconsulting@gmail.com";

/* ============================================
   Smooth Scroll to Services
============================================ */

const smoothScroll = function () {
  const serviceSection = document.querySelector(".services");
  const headerElement = document.querySelector(".scroll_effect");

  if (!serviceSection || !headerElement) return;

  headerElement.addEventListener("click", function (e) {
    e.preventDefault();
    serviceSection.scrollIntoView({ behavior: "smooth" });
  });
};

/* The "Services" link lives in the header, which js/loader.js injects
   asynchronously. Binding on script load would find nothing, so we wait
   for the components to land first. */
document.addEventListener("components:loaded", smoothScroll);

/* ============================================
   Newsletter Subscription
============================================ */

const actionSubscribe = function () {
  const subscribeForm = document.querySelector(".subscribe-form");

  if (!subscribeForm) return;

  subscribeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = subscribeForm.querySelector(".common-input");

    if (!emailInput) return;

    const email = emailInput.value.trim();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    window.location.href =
      "mailto:" +
      CONTACT_EMAIL +
      "?subject=" +
      encodeURIComponent("New Newsletter Subscription") +
      "&body=" +
      encodeURIComponent("Please subscribe this address: " + email);
  });
};

/* ============================================
   Homepage Appointment / Contact Form
============================================ */

const submitform = function () {
  const form = document.querySelector(".form");

  if (!form) return;

  const successPanel = document.getElementById("appointment-success");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const Fname = form.querySelector(".text1")?.value.trim() || "";
    const Lname = form.querySelector(".text2")?.value.trim() || "";
    const phoneNumber = form.querySelector(".text3")?.value.trim() || "";
    const email = form.querySelector(".text4")?.value.trim() || "";
    const message = form.querySelector(".textmessage")?.value.trim() || "";

    if (!Fname || !email || !message) {
      alert("Please enter your name, email and message.");
      return;
    }

    const subject = `Appointment request: ${Fname} ${Lname}`.trim();

    const body = [
      `Name: ${Fname} ${Lname}`.trim(),
      `Phone: ${phoneNumber}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    window.location.href =
      "mailto:" +
      CONTACT_EMAIL +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    // The mailto: link hands off to the user's email app without actually
    // navigating away from this tab, so we can show a confirmation right
    // after — there is no server here to tell us the email was sent, so
    // this manages expectations rather than falsely claiming delivery.
    if (successPanel) {
      successPanel.hidden = false;
      successPanel.scrollIntoView({ behavior: "smooth", block: "center" });
      form.reset();
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  actionSubscribe();
  submitform();
});
