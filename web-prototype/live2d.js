// ============================================================
//  Live2D ローダー（pixi-live2d-display + Cubism 4 core）
//  モデルファイルを web-prototype/model/ に置くと描画されます。
//  未配置の場合は SVG プレースホルダーを表示したままにします。
// ============================================================

// モデル設定ファイルのパス（必要ならファイル名に合わせて変更してください）
const MODEL_PATH = "model/八千代榛夜姫.model3.json";

(async function initLive2D() {
  const canvas = document.getElementById("live2d-canvas");
  const placeholder = document.getElementById("char-placeholder");
  const note = document.getElementById("model-note");

  // Cubism Core / PIXI が読み込めているか確認
  const coreReady = typeof window.Live2DCubismCore !== "undefined";
  const pixiReady = typeof window.PIXI !== "undefined" && window.PIXI.live2d;

  if (!coreReady || !pixiReady) {
    if (note) note.textContent = "Live2Dライブラリ未読込（lib/ を確認）";
    return; // プレースホルダーのまま
  }

  // モデルファイルの存在確認
  try {
    const res = await fetch(encodeURI(MODEL_PATH), { method: "HEAD" });
    if (!res.ok) throw new Error("model not found");
  } catch (e) {
    if (note) note.textContent = "モデル未配置：web-prototype/model/ に追加してください";
    return; // プレースホルダーのまま
  }

  try {
    const app = new PIXI.Application({
      view: canvas,
      backgroundAlpha: 0,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
    });

    const model = await PIXI.live2d.Live2DModel.from(encodeURI(MODEL_PATH));
    app.stage.addChild(model);

    // キャンバスサイズにフィット
    function layout() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      app.renderer.resize(w, h);
      const scale = Math.min(w / model.width, h / model.height) * 1.6;
      model.scale.set(scale);
      model.anchor.set(0.5, 0.5);
      model.position.set(w / 2, h * 0.55);
    }
    layout();
    window.addEventListener("resize", layout);

    // モデルが表示できたのでプレースホルダーを隠す
    if (placeholder) placeholder.style.display = "none";
    if (note) note.style.display = "none";

    // タップで視線追従 / ランダムモーション（あれば）
    canvas.addEventListener("pointerdown", () => {
      if (model.motion) model.motion("TapBody");
    });
    window.__live2dModel = model; // app.js から口パク等に使えるよう公開
  } catch (err) {
    console.error("Live2D load error:", err);
    if (note) note.textContent = "モデル読込エラー（コンソール参照）";
  }
})();
