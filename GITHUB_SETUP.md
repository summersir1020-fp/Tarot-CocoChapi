# ココチャピ・タロット GitHub連携手順書

## 🚀 GitHubリポジトリ連携手順

### 📋 **前提条件**
- Gitがインストールされていること
- GitHubアカウントが作成されていること
- リポジトリURL: `https://github.com/summersir1020-fp/Tarot-CocoChapi`

---

## 🛠️ **ステップ1: ローカル環境でのGit初期化**

### 1.1 プロジェクトディレクトリに移動
```bash
cd path/to/your/tarot-project
```

### 1.2 Gitリポジトリを初期化
```bash
git init
```

### 1.3 リモートリポジトリを追加
```bash
git remote add origin https://github.com/summersir1020-fp/Tarot-CocoChapi.git
```

---

## 📁 **ステップ2: プロジェクトファイルの準備**

### 2.1 プロジェクト構造の確認
```
Tarot-CocoChapi/
├── index.html
├── css/
│   ├── style.css
│   └── tarot-cards.css
├── js/
│   ├── main.js
│   ├── tarot-data.js
│   ├── minor-arcana-data.js
│   ├── card-generator.js
│   ├── shih-tzu-generator.js
│   ├── storage.js
│   ├── history.js
│   └── audio.js
├── README.md
├── .gitignore
├── LICENSE
└── docs/
    └── CHANGELOG.md
```

### 2.2 必要なファイルをステージング
```bash
# すべてのプロジェクトファイルを追加
git add .

# または個別に追加
git add index.html
git add css/
git add js/
git add README.md
git add .gitignore
git add LICENSE
```

---

## 📝 **ステップ3: 初回コミット**

### 3.1 初回コミットの作成
```bash
git commit -m "🎉 初回コミット: ココチャピ・タロット v3.2.0

✨ 実装機能:
- ワンカード・スリーカード・ケルト十字占い
- 46枚のタロットカード対応
- 動的SVGカード生成システム
- Web Audio API音響効果
- 占い履歴管理機能
- レスポンシブデザイン
- シーズー案内役「ココチャピ」

🐛 修正済みバグ:
- ケルト十字占い機能の完全修正
- 音響効果システムの全面改善
- ナビゲーション最適化
- 質問入力バリデーション"
```

---

## 🌐 **ステップ4: GitHubにプッシュ**

### 4.1 リモートリポジトリの状態確認
```bash
# リモートリポジトリの確認
git remote -v
```

### 4.2 メインブランチにプッシュ
```bash
# メインブランチの設定（GitHubのデフォルトがmainの場合）
git branch -M main

# 初回プッシュ（upstream設定付き）
git push -u origin main
```

---

## 🔧 **ステップ5: 開発ワークフロー設定**

### 5.1 開発ブランチの作成
```bash
# 開発ブランチを作成・切り替え
git checkout -b develop

# 機能別ブランチの例
git checkout -b feature/new-card-animations
git checkout -b feature/multiplayer-mode
git checkout -b bugfix/audio-issues
```

### 5.2 日常的な開発フロー
```bash
# 変更をステージング
git add .

# コミット（意味のあるメッセージで）
git commit -m "✨ feat: 新しいカードアニメーション追加"

# リモートにプッシュ
git push origin feature/new-card-animations
```

---

## 📊 **ステップ6: プルリクエストの作成**

### 6.1 GitHub上でのプルリクエスト
1. GitHubリポジトリページにアクセス
2. "Pull requests"タブをクリック
3. "New pull request"ボタンをクリック
4. ベースブランチ（main）とコンペアブランチ（feature/*）を選択
5. タイトルと説明を記入
6. "Create pull request"をクリック

### 6.2 プルリクエストのテンプレート例
```markdown
## 🎯 変更概要
- 新機能：カードアニメーションエフェクト追加

## ✅ 変更内容
- [ ] カードフリップアニメーションの改善
- [ ] 新しいパーティクルエフェクト
- [ ] パフォーマンス最適化

## 🧪 テスト
- [ ] 全占い方法での動作確認
- [ ] モバイルデバイスでの表示確認
- [ ] 音響効果との連携確認

## 📸 スクリーンショット
（変更前後の画像を添付）
```

---

## 🏷️ **ステップ7: バージョン管理とリリース**

### 7.1 タグの作成
```bash
# バージョンタグの作成
git tag -a v3.2.0 -m "🎉 Release v3.2.0 - バグ修正版"

# タグをリモートにプッシュ
git push origin v3.2.0
```

### 7.2 リリースノートの作成
GitHubのReleasesページで詳細なリリースノートを作成

---

## 🔄 **ステップ8: 継続的開発のセットアップ**

### 8.1 GitHub Actions（CI/CD）設定
`.github/workflows/deploy.yml`ファイルを作成してGitHub Pagesへの自動デプロイを設定

### 8.2 Issue管理
- バグレポート用テンプレート作成
- 機能要求用テンプレート作成
- プロジェクトボードでのタスク管理

### 8.3 コントリビューションガイドライン
`CONTRIBUTING.md`ファイルでコントリビューションルールを明文化

---

## 📚 **参考コマンド集**

### よく使うGitコマンド
```bash
# 現在の状態確認
git status

# 変更履歴の確認
git log --oneline

# ブランチ一覧
git branch -a

# リモートの最新を取得
git fetch origin

# リモートの変更をマージ
git pull origin main

# 競合解決後
git add .
git commit -m "🔀 merge: 競合解決"

# ブランチ削除
git branch -d feature/completed-feature
```

### トラブルシューティング
```bash
# リモートURLの確認・変更
git remote get-url origin
git remote set-url origin https://github.com/summersir1020-fp/Tarot-CocoChapi.git

# 最後のコミットの修正
git commit --amend -m "修正されたコミットメッセージ"

# 変更の取り消し
git checkout -- filename.js  # ファイル単位
git reset HEAD~1             # 最後のコミットを取り消し
```

---

## 🎯 **次のステップ**

1. ✅ 上記手順に従ってGitHub連携を完了
2. 🔄 開発ブランチでの継続開発開始
3. 📈 GitHub Pagesでのライブデモ公開
4. 🌟 コミュニティからのフィードバック収集
5. 🚀 新機能開発の計画・実装

---

**🎉 GitHub連携完了後は、本格的なオープンソース開発が始まります！**