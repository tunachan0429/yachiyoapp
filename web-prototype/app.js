// ---- 星空生成 ----
(function makeStars() {
  const stars = document.getElementById("stars");
  const n = 90;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("i");
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.setProperty("--d", (2 + Math.random() * 3).toFixed(1) + "s");
    s.style.animationDelay = (Math.random() * 3).toFixed(1) + "s";
    const size = Math.random() < 0.2 ? 3 : Math.random() < 0.5 ? 2 : 1;
    s.style.width = size + "px";
    s.style.height = size + "px";
    stars.appendChild(s);
  }
})();

// ---- セリフのタイプライター表示（ローカルAI応答のプレースホルダー）----
const dialogueEl = document.getElementById("dialogue-text");
const lines = [
  "こんばんは。今日も来てくれてうれしいな。",
  "こうして話せる時間が、わたしはいちばん好きなの。",
  "ねえ、今日はどんな一日だった？　なんでも聞かせて。",
];

let li = 0;
function typeLine(text, done) {
  dialogueEl.innerHTML = "";
  let i = 0;
  const caret = document.createElement("span");
  caret.className = "caret";
  const timer = setInterval(() => {
    if (i < text.length) {
      dialogueEl.insertBefore(document.createTextNode(text[i]), caret);
      i++;
    } else {
      clearInterval(timer);
      setTimeout(done, 2200);
    }
  }, 55);
  dialogueEl.appendChild(caret);
}
function loopLines() {
  typeLine(lines[li], () => {
    li = (li + 1) % lines.length;
    loopLines();
  });
}
loopLines();

// ---- ボタンの仮動作 ----
const mic = document.querySelector(".tool.mic");
mic.addEventListener("click", () => {
  mic.classList.toggle("listening");
  if (mic.classList.contains("listening")) {
    typeLine("うん、聞いてるよ。ゆっくり話してね。", () => {});
  }
});

document.querySelectorAll(".tool:not(.mic)").forEach((btn) => {
  btn.addEventListener("click", () => {
    const label = btn.querySelector(".tool-label")?.textContent || "";
    typeLine(`「${label}」を開くね。`, () => setTimeout(loopLines, 1500));
  });
});
