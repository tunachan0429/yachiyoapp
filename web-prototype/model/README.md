# Live2D モデル配置フォルダ

ここに Live2D Cubism モデル一式を置くと、中央にキャラが描画されます。

## 置くファイル（あなたのモデル）

以下をこのフォルダ（`web-prototype/model/`）にそのまま入れてください：

- `八千代榛夜姫.model3.json` ← 設定の入口（`live2d.js` の `MODEL_PATH` がこれを指す）
- `八千代榛夜姫.moc3`
- `八千代榛夜姫.physics3.json`
- `八千代榛夜姫.cdi3.json`
- `八千代榛夜姫.8192/`（テクスチャのフォルダ一式）
- `*.exp3.json`（表情：眼泪 / 笑咲咪 / 泪珠 / 眯眯眼 など）
- `items_pinned_to_model.json`（あれば）

> ※ `*.vtube.json` `*.xyplugin.json` は VTube Studio 用なので必須ではありません。
> ※ ファイル名は変えないでください（`model3.json` 内で参照されているため）。

## 追加方法（Windows・25MB制限を回避）

GitHubの「ブラウザからのアップロード」は25MBまでですが、**Git経由なら100MB/ファイルまで**入ります（あなたのモデルは`.moc3`が約7MBなので問題なし）。

### 方法1：GitHub Desktop（かんたん・おすすめ）
1. GitHub Desktop で `tunachan0429/yachiyoapp` を Clone
2. エクスプローラで `web-prototype/model/` を開き、上記ファイルをコピー
3. GitHub Desktop に変更が出るので、Commit → Push

### 方法2：git コマンド
```bash
git clone https://github.com/tunachan0429/yachiyoapp.git
# model ファイルを web-prototype/model/ にコピーしてから
cd yachiyoapp
git add web-prototype/model
git commit -m "Add Live2D model files"
git push
```

配置後、GitHub Pages（https://tunachan0429.github.io/yachiyoapp/）を再読み込みするとキャラが表示されます。
