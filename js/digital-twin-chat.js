(function () {
  const API_URL = "https://mamdouh-digital-twin-api.vercel.app/api/chat";
  const GREETING =
    "Hi! I'm Mamdouh's Digital Twin — ask me about his experience, skills, or projects (Laravel, Vue.js, PHP, MySQL, REST APIs).";

  const toggle = document.getElementById("dtToggle");
  const panel = document.getElementById("dtPanel");
  const closeBtn = document.getElementById("dtClose");
  const messagesEl = document.getElementById("dtMessages");
  const form = document.getElementById("dtForm");
  const input = document.getElementById("dtInput");
  const sendBtn = document.getElementById("dtSend");

  if (!toggle || !panel || !messagesEl || !form || !input) return;

  const history = [];
  let greeted = false;
  let sending = false;

  function addMessage(role, text) {
    const el = document.createElement("div");
    el.className = "dt-msg " + role;
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function showTyping() {
    const el = document.createElement("div");
    el.className = "dt-typing";
    el.id = "dtTyping";
    el.innerHTML = "<span></span><span></span><span></span>";
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById("dtTyping");
    if (el) el.remove();
  }

  async function sendMessage(text) {
    history.push({ role: "user", content: text });
    addMessage("user", text);
    sending = true;
    sendBtn.disabled = true;
    showTyping();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json().catch(() => ({}));
      hideTyping();

      if (!res.ok || !data.reply) {
        addMessage("error", data.error || "Something went wrong. Please try again in a moment.");
        return;
      }

      history.push({ role: "assistant", content: data.reply });
      addMessage("bot", data.reply);
    } catch (err) {
      hideTyping();
      addMessage("error", "Couldn't reach the Digital Twin service. Check your connection and try again.");
    } finally {
      sending = false;
      sendBtn.disabled = false;
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || sending) return;
    input.value = "";
    sendMessage(text.slice(0, 500));
  });

  function openPanel() {
    panel.classList.add("dt-open");
    toggle.classList.add("dt-open");
    toggle.setAttribute("aria-expanded", "true");
    if (!greeted) {
      addMessage("bot", GREETING);
      greeted = true;
    }
    input.focus();
  }

  function closePanel() {
    panel.classList.remove("dt-open");
    toggle.classList.remove("dt-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    if (panel.classList.contains("dt-open")) {
      closePanel();
    } else {
      openPanel();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      closePanel();
      toggle.focus();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("dt-open")) {
      closePanel();
      toggle.focus();
    }
  });
})();
