/* =====================================================================
   Site-wide configuration
   ---------------------------------------------------------------------
   Single place to change contact details. Previously the business email
   was hardcoded (and misspelled) in several separate form handlers, so
   enquiries were being sent to a developer's personal inbox instead of
   the company address shown on the site.
   ===================================================================== */
window.SITE_CONFIG = {
  // Where contact form + newsletter enquiries are sent.
  contactEmail: "gablessconsulting@gmail.com",
  phone: "+2348108673001",

  // ---- Online payments (Flutterwave Checkout) ------------------------
  // Get your PUBLIC key from Flutterwave dashboard > Settings > API keys.
  // Public keys are safe in front-end code. NEVER put the secret key here.
  // Use a FLWPUBK_TEST-... key while testing, then swap in the live key.
  // Google Pay, cards, bank transfer, USSD etc. are turned on/off in the
  // dashboard (Settings > Payment options) - no code change needed.
  flutterwave: {
    publicKey: "FLWPUBK_TEST-REPLACE_ME-X",
    currency: "NGN",
    logo: "https://YOUR-DOMAIN/img/2.png", // absolute URL to your logo
  },
};
