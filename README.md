# 板前修行ゲーム

スマホブラウザで遊べる、板前修行ストーリーゲームのプロトタイプです。
「技術」「知識」「心構え」を身につけながら一流の板前を目指します。
ブログ [板前.fun](https://itamae.fun/) との連携（記事への導線）を前提に作っています。

## 開発環境

```bash
npm install
npm run dev -- # http://localhost:5173 で確認（--host で同一Wi-Fi内のスマホからもアクセス可能）
```

## ビルド

```bash
npm run build
npm run preview
```

## 構成

- `src/main.ts` : Phaserゲームの起動設定
- `src/scenes/` : 画面ごとのシーン（タイトル／ストーリー／ミニゲーム／結果）
- `src/gameState.ts` : 技術・知識・心構えのステータス管理
- `src/links.ts` : 板前.funへの外部リンク設定（アフィリエイトリンク確定後はここを書き換える）
