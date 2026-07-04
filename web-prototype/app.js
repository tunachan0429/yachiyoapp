// ---- 星空生成 ----
(function makeStars() {
  const stars = document.getElementById("stars");
  const n = 90;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("i");
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 70 + "%";
    s.style.setProperty("--d", (2 + Math.random() * 3).toFixed(1) + "s");
    s.style.animationDelay = (Math.random() * 3).toFixed(1) + "s";
    const size = Math.random() < 0.2 ? 3 : Math.random() < 0.5 ? 2 : 1;
    s.style.width = size + "px";
    s.style.height = size + "px";
    stars.appendChild(s);
  }
})();

// ---- 返信ボックス（向こうからの応答）----
const replyTitle = document.getElementById("reply-title");
const replyText = document.getElementById("reply-text");

// キャラのローカルAI応答（今はダミー。後でローカルLLMに接続）
function characterReply(userText) {
  const canned = [
    "うん、聞いてるよ。それでそれで？",
    "なるほどね。もう少し話してみて？",
    "そっか。今日はゆっくりしようね。",
    "ふふ、あなたと話せてうれしいな。",
  ];
  if (userText && userText.includes("こんにちは")) return "こんにちは！会えてうれしい。";
  return canned[Math.floor(Math.random() * canned.length)];
}

function typeReply(title, text) {
  replyTitle.textContent = title;
  replyText.innerHTML = "";
  let i = 0;
  const caret = document.createElement("span");
  caret.className = "caret";
  replyText.appendChild(caret);
  const timer = setInterval(() => {
    if (i < text.length) {
      replyText.insertBefore(document.createTextNode(text[i]), caret);
      i++;
    } else {
      clearInterval(timer);
      setTimeout(() => caret.remove(), 800);
    }
  }, 45);
}

// ---- チャット送信 ----
const field = document.getElementById("chat-field");
const sendBtn = document.getElementById("send-btn");

function send() {
  const t = field.value.trim();
  if (!t) return;
  typeReply("かぐや", "……"); // 考え中
  field.value = "";
  setTimeout(() => typeReply("かぐや", characterReply(t)), 600);
}
sendBtn.addEventListener("click", send);
field.addEventListener("keydown", (e) => { if (e.key === "Enter") send(); });

// ---- ツールボタン ----
const mic = document.getElementById("mic");
mic.addEventListener("click", () => {
  mic.classList.toggle("listening");
  if (mic.classList.contains("listening")) {
    typeReply("かぐや", "うん、聞いてるよ。ゆっくり話してね。");
  }
});

document.querySelectorAll(".tool:not(#mic)").forEach((btn) => {
  btn.addEventListener("click", () => {
    const label = btn.getAttribute("data-label") || "";
    typeReply("かぐや", `「${label}」だね。`);
  });
});
