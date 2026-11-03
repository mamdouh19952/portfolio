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
