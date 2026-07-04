# yachiyoapp

アニメ「ray（超かぐや姫ver）」に登場するAIキャラ会話アプリのUIを再現し、
所有するLive2Dモデルと**端末内ローカルAI**（API課金ゼロ）で動く、
非公開の個人用iOSアプリ。

## アーキテクチャ（方針B：ネイティブShell + WebView描画）

- **iOSネイティブ（SwiftUI）** アプリとしてビルド（`macos` GitHub Actions → 無署名IPA → Sideloadly）
- UIとLive2D描画は **WKWebView** 上で動作（`web-prototype/` を同梱、`appres://` スキームで配信）
- Live2Dは `pixi-live2d-display` + あなたの `live2dcubismcore.min.js`
- 今後：ローカルLLMチャット / 画像認識 / 音声入出力を **ネイティブSwift** で実装し、JS↔Swiftブリッジで連携

## フェーズ

1. ✅ UI再現（ブラウザプロトタイプ）
2. ✅ ガラス質感の洗練 / フレームレス全画面化
3. ✅ Live2D描画統合（pixi-live2d-display）
4. ✅ iOSネイティブ雛形（XcodeGen + build-ipa + WKWebView shell）
5. ⬜ Live2Dモデルファイル追加（`web-prototype/model/`, `web-prototype/lib/`）
6. ⬜ ローカルLLMでチャット（MLX / llama.cpp）
7. ⬜ 画像認識（ローカルVLM or Apple Vision）
8. ⬜ 音声入出力（Speech / TTS）

## 構成

```
yachiyoapp/
├─ project.yml                     # XcodeGen（.xcodeproj を生成）
├─ .github/workflows/
│  ├─ build-ipa.yml                # macOSランナーで無署名IPAをビルド
│  └─ deploy-pages.yml             # web-prototype を GitHub Pages に公開
├─ YachiyoApp/                     # SwiftUI ネイティブ
│  ├─ YachiyoAppApp.swift
│  ├─ ContentView.swift
│  ├─ WebView.swift                # WKWebView + appres:// スキームハンドラ
│  └─ Assets.xcassets/
└─ web-prototype/                  # Web UI（Pagesとアプリで共有）
   ├─ index.html / styles.css / app.js / live2d.js
   ├─ lib/    ← live2dcubismcore.min.js を配置
   └─ model/  ← Live2D モデル一式を配置
```

## iOSアプリのビルド方法（Macなし）

1. `main` に push すると **build-ipa** が自動実行（または Actions タブから手動実行）
2. 完了後、Actions の実行結果ページ下部 **Artifacts** から `YachiyoApp-ipa` をダウンロード
3. 解凍して出てくる `YachiyoApp.ipa` を **Sideloadly** で実機へインストール

## Webプレビュー

- ライブ: https://tunachan0429.github.io/yachiyoapp/
- ローカル: `web-prototype/index.html` をブラウザで開く

## モデルの追加

`web-prototype/model/README.md` と `web-prototype/lib/README.md` を参照
（Windows の GitHub Desktop / git で追加。ブラウザの25MB制限を回避）。
