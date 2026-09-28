// Loads the shared header/footer components and injects them into the page.
//
// IMPORTANT: header.html contains the main navigation menu. Other scripts
// (mobile menu / slicknav, parallax / stellar, etc. in main.js) need that
// menu to already exist in the DOM before they run, or they silently
// initialize on zero elements and appear "broken" with no error. Once BOTH
// components have been injected, we dispatch a "components:loaded" event on
// `document` so main.js knows it's now safe to run that DOM-dependent code.
document.addEventListener("DOMContentLoaded", () => {
  const inPages = window.location.pathname.includes("/pages/");

  const componentPath = inPages ? "../components/" : "components/";

  const headerLoaded = fetch(componentPath + "header.html")
    .then((res) => res.text())
    .then((data) => {
      const header = document.getElementById("header");

      if (!header) return;

      header.innerHTML = data;

      // Fix logo automatically

      const logo = document.getElementById("site-logo");

      if (logo) {
        logo.src = inPages ? "../img/2.png" : "img/2.png";
      }

      // Fix header links so they work both from the root and from /pages/
      // (header.html is written with root-relative hrefs like "index.html"
      // and "pages/about.html"; when we're already inside /pages/ those
      // need "../" prepended, and the "pages/" prefix needs to be dropped)
      fixComponentLinks(header, inPages);

      // Highlight current page

      const currentPage = window.location.pathname.split("/").pop() || "index.html";

      document.querySelectorAll(".navigation a").forEach((link) => {
        const href = link.getAttribute("href");
        if (!href) return;

        // Skip in-page anchor links (e.g. "index.html#services"). They point
        // at a section, not a page, so highlighting them would mark two nav
        // items active at once when you're on the homepage.
        if (href.includes("#")) return;

        const linkPage = href.split("/").pop();

        if (linkPage === currentPage) {
          link.parentElement.classList.add("active");
        }
      });
    })
    .catch((err) => console.error("Failed to load header component:", err));

  const footerLoaded = fetch(componentPath + "footer.html")
    .then((res) => res.text())
    .then((data) => {
      const footer = document.getElementById("footer");

      if (footer) {
        footer.innerHTML = data;
        fixComponentLinks(footer, inPages);

        // Keep the copyright year current without a yearly code edit.
        // (An inline <script> inside footer.html would never run, because
        // scripts injected via innerHTML are not executed by the browser.)
        const yearEl = document.getElementById("footer-year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();
      }
    })
    .catch((err) => console.error("Failed to load footer component:", err));

  const modalLoaded = fetch(componentPath + "donation-modal.html")
    .then((res) => res.text())
    .then((data) => {
      // The "Support Us" button lives in the shared header, so the modal it
      // opens has to exist on every page too. We append it to <body> rather
      // than requiring each page to carry its own copy of the markup.
      const holder = document.createElement("div");
      holder.innerHTML = data;
      fixComponentLinks(holder, inPages);

      while (holder.firstElementChild) {
        document.body.appendChild(holder.firstElementChild);
      }
    })
    .catch((err) => console.error("Failed to load donation modal:", err));

  // Only once BOTH the header and footer are actually in the DOM do we let
  // the rest of the site's scripts touch things like the nav menu.
  Promise.all([headerLoaded, footerLoaded, modalLoaded]).then(() => {
    document.dispatchEvent(new Event("components:loaded"));
  });
});

// Rewrites root-relative links inside an injected component (header/footer)
// so they resolve correctly no matter which folder the current page is in.
function fixComponentLinks(container, inPages) {
  if (!inPages) return; // links already work as-is from the root

  container.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) {
      return;
    }

    // "index.html" or "index.html#services" -> "../index.html" / "../index.html#services"
    if (href === "index.html" || href.startsWith("index.html#")) {
      link.setAttribute("href", "../" + href);
    } else if (href.startsWith("pages/")) {
      link.setAttribute("href", href.replace("pages/", ""));
    }
  });
}
