(function () {
  // Project filter
  var buttons = document.querySelectorAll(".filters button");
  var cards = document.querySelectorAll(".card");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var type = btn.getAttribute("data-filter");
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      cards.forEach(function (card) {
        card.hidden = type !== "all" && card.getAttribute("data-type") !== type;
      });
    });
  });

  // Mobile menu
  var header = document.querySelector(".site-header");
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("siteNav");
  function setMenu(open) {
    header.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      setMenu(!header.classList.contains("menu-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { setMenu(false); menuBtn.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (!header.contains(e.target)) setMenu(false);
    });
    window.matchMedia("(min-width: 721px)").addEventListener("change", function () { setMenu(false); });
  }

  // Scroll reveal (skipped when the visitor prefers reduced motion)
  var items = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  // "Ask my Digital Twin" opens the chat widget
  var ask = document.getElementById("askTwin");
  var toggle = document.getElementById("dtToggle");
  if (ask && toggle) {
    ask.addEventListener("click", function () {
      if (!toggle.classList.contains("dt-open")) toggle.click();
    });
  }
})();
