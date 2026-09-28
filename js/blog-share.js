"use strict";

/* Social share buttons on blog post pages use real share-intent URLs, not
   API keys, so they work with zero setup. They can't be hardcoded in the
   HTML because they need the page's actual live URL and title, which are
   only known once the page loads in a browser on the real domain. */

document.addEventListener("DOMContentLoaded", function () {
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

  const targets = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
    whatsapp: `https://wa.me/?text=${pageTitle}%20${pageUrl}`,
    email: `mailto:?subject=${pageTitle}&body=${pageUrl}`,
  };

  document.querySelectorAll(".js-share").forEach((link) => {
    const network = link.getAttribute("data-network");
    if (targets[network]) {
      link.setAttribute("href", targets[network]);
    }
  });
});
