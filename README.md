# yachiyoapp

アニメ「ray（超かぐや姫ver）」に登場するAIキャラ会話アプリのUIを再現し、
所有するLive2Dモデルと**端末内ローカルAI**（API課金ゼロ）で動く、
非公開の個人用iOSアプリを作るプロジェクト。

## 進め方（フェーズ）

1. ✅ **UI再現（ブラウザプロトタイプ）** ← イマココ
2. ⬜ デザイン確定（フィードバック反映）
3. ⬜ SwiftUI（iOS）へ移植
4. ⬜ Live2D Cubism SDK でキャラ表示
5. ⬜ ローカルLLM（MLX / llama.cpp）でチャット
6. ⬜ 画像認識（ローカルVLM or Apple Vision）
7. ⬜ 音声入出力（Speech / TTS）

## 構成

```
yachiyoapp/
├─ web-prototype/       # ブラウザで確認できるUIプロトタイプ
│  ├─ index.html
│  ├─ styles.css
│  └─ app.js
└─ (今後) ios-app/       # SwiftUI Xcode プロジェクト
```

## プロトタイプの見方

`web-prototype/index.html` をブラウザで開くだけ。ビルド不要。
- 中央キャラは**プレースホルダー**（後で所有Live2Dモデルに差し替え）
- マイクボタン / 各ツールボタンは仮動作
- セリフはタイプライター表示（ローカルAI応答の見た目確認用）

## 技術方針（ローカル・無料）

| 領域 | 技術 |
|---|---|
| UI | SwiftUI |
| キャラ表示 | Live2D Cubism SDK for iOS |
| AI会話 | ローカルLLM（MLX または llama.cpp、軽量量子化モデル） |
| 画像認識 | ローカルVLM または Apple Vision framework |
| 音声 | Apple Speech（入力） / AVSpeechSynthesizer（出力） |
| 配布 | App Store申請なし。Xcodeから自分の実機へサイドロード |
