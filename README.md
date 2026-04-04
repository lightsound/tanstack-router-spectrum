# TanStack Router + React Spectrum

[Vite+](https://viteplus.dev/) を CLI として、[TanStack Router](https://tanstack.com/router) のファイルベースルーティング（`src/routes/`）と [React Spectrum 2 (S2)](https://react-spectrum.adobe.com/s2/) を使う最小構成の Vite SPA です。

## 含まれるもの

- **TanStack Router**（クライアントのみ・SSR なし）。ルートツリーは `@tanstack/router-plugin` により `src/routeTree.gen.ts` に生成されます。
- **React 19** と **TypeScript**
- **React Spectrum S2** — ルートで `Provider` と `@react-spectrum/s2/page.css` を読み込み、レイアウトやデザイントークンは主に S2 の [`style()`](https://react-spectrum.adobe.com/s2/) で記述します（Tailwind CSS は含みません）。
- **[React Compiler](https://react.dev/learn/react-compiler)** — `babel-plugin-react-compiler` と [`@vitejs/plugin-react` の `reactCompilerPreset`](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#react-compiler) ＋ `@rolldown/plugin-babel`（`vite.config.ts`）。開発時は React DevTools でコンポーネント名横の「Memo ✨」で最適化の有無を確認できます。
- **`unplugin-parcel-macros`** — S2 が内部で使うマクロを Vite で解決するために利用しています。
- **`@react-aria/optimize-locales-plugin`** — バンドルに含めるロケールを `ja-JP` と `en-US` に絞ります。
- **Vite+** 経由の Oxlint / Oxfmt / テスト（詳細は [AGENTS.md](AGENTS.md)）

## 前提

[公式手順](https://viteplus.dev/guide/)に従い、`vp` が `PATH` に通っていること。

パッケージマネージャは **`pnpm@10.32.1`** を想定しています。依存関係の操作は **`vp install` など Vite+ 経由**で行うのが推奨です。

## セットアップ

```bash
git clone https://github.com/lightsound/tanstack-router-spectrum.git
cd tanstack-router-spectrum
vp install
vp dev
```

ルートの `index.html` が `src/main.tsx` をエントリとして読み込みます。ターミナルに表示される URL を開きます（Vite の既定は多くの場合 `http://localhost:5173`）。

## よく使うコマンド

| コマンド     | 用途                                                         |
| ------------ | ------------------------------------------------------------ |
| `vp dev`     | 開発サーバー（HMR）                                          |
| `vp build`   | 本番ビルド                                                   |
| `vp preview` | ビルド結果のローカルプレビュー                               |
| `vp check`   | 整形・Lint・型チェック（`--fix` で自動修正できるものは修正） |
| `vp test`    | テスト実行                                                   |
| `vp help`    | 組み込みコマンド一覧                                         |

`package.json` の `scripts` はこれらの `vp` エントリに委譲しています。

メンテナンス用（`vp check` には含まれません）:

- `vp run knip` — 未使用ファイル・依存・エクスポート（`knip.config.ts`）
- `vp run doctor` — React 向けヘルスチェック（`react-doctor`、`--no-lint` 付きスクリプト）

## ライセンス

[MIT](LICENSE.md)。
