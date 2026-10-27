/* Payment / Support page: mode toggle, amount, Flutterwave checkout, copy account */
(function () {
  var MODES = {
    payment: {
      title: "Client Payment Portal",
      text: "Enter the amount due and your details, then pay securely online.",
      note: "Use your invoice number as the transfer reference.",
      label: "Payment",
      btn: "Pay ",
    },
    support: {
      title: "Support / Donate to Gabless Healthcare Consulting",
      text: "Your support and donation help us expand healthcare innovation, training and digital transformation across Nigeria and Africa.",
      note: 'Use "Support" as the transfer reference.',
      label: "Support",
      btn: "Give ",
    },
  };
  var DEFAULT_SUPPORT = 10000;
  var state = { type: "payment", amount: 0 };
  var $ = function (id) { return document.getElementById(id); };
  var fmt = function (n) { return "\u20A6" + Number(n).toLocaleString("en-NG"); };

  function status(msg, kind) {
    var s = $("pay-status");
    s.textContent = msg || "";
    s.className = "pay-status " + (kind || "");
  }

  function setType(type) {
    if (!MODES[type]) type = "payment";
    state.type = type;
    var m = MODES[type];
    $("payCard").dataset.mode = type;
    $("payTitle").textContent = m.title;
    $("payText").textContent = m.text;
    $("transferNote").textContent = m.note;
    document.querySelectorAll(".pay-tab").forEach(function (b) {
      var on = b.dataset.type === type;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on);
    });
    var url = new URL(window.location.href);
    url.searchParams.set("type", type);
    history.replaceState(null, "", url);
    status("");
    if (type === "support" && !state.amount) setAmount(DEFAULT_SUPPORT);
    updateSummary();
  }

  function setAmount(v) {
    state.amount = Math.max(0, Math.floor(Number(v) || 0));
    if (Number($("payAmount").value) !== state.amount) $("payAmount").value = state.amount || "";
    document.querySelectorAll("#quickAmounts button").forEach(function (b) {
      b.classList.toggle("active", Number(b.dataset.amt) === state.amount);
    });
    updateSummary();
  }

  function updateSummary() {
    $("payNowLabel").textContent = state.amount >= 100 ? MODES[state.type].btn + fmt(state.amount) : "Pay Now";
  }

  function fail(msg, field) {
    status(msg, "error");
    if (field) $(field).focus();
  }

  function startCheckout() {
    var cfg = (window.SITE_CONFIG || {}).flutterwave || {};
    var name = $("payerName").value.trim();
    var email = $("payerEmail").value.trim();
    var ref = state.type === "payment" ? $("payerRef").value.trim() : "";
    var mode = MODES[state.type];

    if (state.amount < 100) return fail("Please enter an amount of \u20A6100 or more.", "payAmount");
    if (!name) return fail("Please enter your name.", "payerName");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fail("Please enter a valid email so we can send your receipt.", "payerEmail");
    if (typeof FlutterwaveCheckout !== "function") return fail("Checkout couldn't load. Check your connection or use bank transfer below.");
    if (!cfg.publicKey || /REPLACE_ME/.test(cfg.publicKey)) return status("Online payment isn't configured yet. Please use bank transfer below.", "warn");

    status("");
    var txRef = "GHC-" + state.type.toUpperCase() + "-" + Date.now();
    var amount = state.amount;
    FlutterwaveCheckout({
      public_key: cfg.publicKey,
      tx_ref: txRef,
      amount: amount,
      currency: cfg.currency || "NGN",
      // payment_options omitted on purpose: shows every method enabled in your dashboard (incl. Google Pay)
      customer: { email: email, name: name },
      meta: { type: state.type, reference: ref },
      customizations: {
        title: "Gabless Healthcare Consulting",
        description: state.type === "support" ? "Support / donation" : "Client payment" + (ref ? " - " + ref : ""),
        logo: cfg.logo || "",
      },
      callback: function (res) {
        if (res.status === "successful" || res.status === "completed") {
          $("payForm").hidden = true;
          $("paySuccess").hidden = false;
          $("successTitle").textContent = state.type === "support" ? "Thank you for your support!" : "Payment received";
          $("successText").textContent = mode.label + " of " + fmt(amount) + " received. Reference: " + txRef + ". A receipt is on its way to " + email + ".";
        } else {
          fail("Payment was not completed. You have not been charged.");
        }
      },
      onclose: function () {},
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    document.querySelectorAll(".pay-tab").forEach(function (b) {
      b.addEventListener("click", function () { setType(b.dataset.type); });
    });
    document.querySelectorAll("#quickAmounts button").forEach(function (b) {
      b.addEventListener("click", function () { setAmount(b.dataset.amt); });
    });
    $("payAmount").addEventListener("input", function () { setAmount(this.value); });
    $("payNowBtn").addEventListener("click", startCheckout);
    $("payAgain").addEventListener("click", function () {
      $("paySuccess").hidden = true;
      $("payForm").hidden = false;
      status("");
    });
    setAmount(params.get("amount"));
    setType(params.get("type") === "support" ? "support" : "payment");
  });
})();

function copyAccount() {
  var num = document.getElementById("accountNumber").innerText.trim();
  var done = function () { alert("Account number copied!"); };
  if (navigator.clipboard) navigator.clipboard.writeText(num).then(done);
  else {
    var t = document.createElement("textarea");
    t.value = num; document.body.appendChild(t); t.select();
    document.execCommand("copy"); document.body.removeChild(t); done();
  }
}
