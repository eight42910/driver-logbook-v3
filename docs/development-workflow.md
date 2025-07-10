# 開発ワークフロー - Driver Logbook v3

## 🌿 ブランチ戦略（個人開発向け）

### 基本方針

**シンプルなフィーチャーブランチ戦略** - 個人開発に最適化

### ブランチ構成

```
main ←─── feature/phase-1-foundation ←─── 作業ブランチ
 │        feature/phase-2-core-features
 │        feature/ui-components
 └─── hotfix/critical-bug-fix
```

### ブランチルール

#### 🎯 main ブランチ

- **役割**: 本番環境・デプロイ可能な安定版
- **保護**: 直接コミット禁止
- **更新**: プルリクエスト経由のみ

#### 🔧 feature/ ブランチ

- **命名**: `feature/機能名` または `feature/フェーズ名`
- **例**: `feature/phase-1-foundation`, `feature/auth-system`
- **ライフサイクル**: 機能完成時にマージ・削除

#### 🚨 hotfix/ ブランチ

- **役割**: 緊急バグ修正
- **命名**: `hotfix/bug-description`
- **マージ先**: main（緊急時のみ）

### 推奨ワークフロー

#### 1. 新機能開発

```bash
git checkout main
git pull origin main
git checkout -b feature/新機能名
# 開発作業
git add .
git commit -m "feat: 機能の説明"
git push origin feature/新機能名
# PR作成・レビュー・マージ
git checkout main
git pull origin main
git branch -d feature/新機能名
```

#### 2. コミットメッセージ規約

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル変更
refactor: リファクタリング
test: テスト追加・修正
chore: その他の作業
```

---

## 🚀 デプロイ戦略

### Vercel デプロイタイミング

#### Phase 1: 開発環境デプロイ

**タイミング**: フェーズ 1 完了時（認証システム実装後）
**目的**:

- 基本機能の動作確認
- 本番環境での初期テスト
- CI/CD パイプライン構築

**含む機能**:

- ✅ 基本認証（ログイン・ログアウト）
- ✅ 基本レイアウト（Header、Footer）
- ✅ ダッシュボード骨格

#### Phase 2: ベータ版デプロイ

**タイミング**: フェーズ 2 完了時（日報機能実装後）
**目的**:

- MVP 機能のユーザーテスト
- フィードバック収集

**含む機能**:

- ✅ 日報作成・編集・表示
- ✅ 月次集計
- ✅ 基本的なダッシュボード

#### Phase 3: 本番リリース

**タイミング**: フェーズ 3 完了時（全機能実装後）
**目的**: 正式リリース

**含む機能**:

- ✅ 全機能完備
- ✅ パフォーマンス最適化
- ✅ テスト完了

### デプロイ設定

#### 環境構成

```
Production (main)     → vercel.com/production
Preview (PR)          → vercel.com/preview-[pr-id]
Development (local)   → localhost:3000
```

#### 必要な環境変数

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Vercel
VERCEL_PROJECT_ID=
VERCEL_ORG_ID=
```

---

## 📋 フェーズ 1 完了チェックリスト

### 🎯 今回のゴール

**「最低限動くアプリケーション」を Vercel にデプロイ**

### タスク一覧

#### 1. shadcn/ui セットアップ ⏳

- [ ] 基本コンポーネント導入
- [ ] Button, Card, Input, Label
- [ ] Navigation Menu
- [ ] テーマ設定（Light/Dark）

#### 2. 認証システム実装 ⏳

- [ ] Supabase Auth 設定
- [ ] ログインページ作成
- [ ] ユーザー登録ページ作成
- [ ] 認証状態管理
- [ ] 保護されたルート実装

#### 3. 基本レイアウト作成 ⏳

- [ ] ルートレイアウト
- [ ] ヘッダーコンポーネント
- [ ] サイドバーコンポーネント
- [ ] フッターコンポーネント
- [ ] レスポンシブ対応

#### 4. データベース準備 ⏳

- [ ] Supabase スキーマ設計
- [ ] テーブル作成（users, daily_reports）
- [ ] RLS ポリシー設定
- [ ] 型定義更新

#### 5. デプロイ準備 ⏳

- [ ] 環境変数設定
- [ ] Vercel プロジェクト作成
- [ ] ビルド確認
- [ ] 初回デプロイ

### 完了条件

- ✅ ユーザーがログイン・ログアウトできる
- ✅ ダッシュボードが表示される
- ✅ Vercel で正常にアクセスできる

---

## ⏰ スケジュール目安

### 今週（Week 2）

- **Day 1-2**: shadcn/ui + 基本レイアウト
- **Day 3-4**: 認証システム
- **Day 5**: データベース + デプロイ

### 来週（Week 3）

- **フェーズ 2 開始**: 日報機能開発

---

_作成日: 2024 年 12 月_
_次回更新: フェーズ 1 完了時_
