# Driver Logbook v3 実装計画書

## 📅 開発スケジュール

### 全体概要

- **開発期間**: 6 週間
- **開発方式**: 段階的・学習重視
- **デプロイ**: 各フェーズ後に Vercel でテストデプロイ

## 🏗️ フェーズ 1: 基盤構築（Week 1-2）

### Week 1: 開発環境セットアップ

#### Day 1-2: 依存関係とツール導入

- [ ] **shadcn/ui セットアップ**
  ```bash
  npx shadcn-ui@latest init
  ```
- [ ] **必要コンポーネントのインストール**
  ```bash
  npx shadcn-ui@latest add button card input form select
  npx shadcn-ui@latest add calendar date-picker
  npx shadcn-ui@latest add toast navigation-menu
  ```
- [ ] **追加依存関係のインストール**
  ```bash
  npm install @supabase/supabase-js
  npm install react-hook-form @hookform/resolvers zod
  npm install date-fns recharts
  npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
  ```

#### Day 3-4: Supabase 統合

- [ ] **Supabase プロジェクト作成**
  - 新規プロジェクト作成
  - 環境変数設定（`.env.local`）
- [ ] **Supabase クライアント設定**
  - `lib/supabase/client.ts` 作成
  - `lib/supabase/server.ts` 作成（Server Components 用）
- [ ] **型定義生成**
  ```bash
  npx supabase gen types typescript --project-id [YOUR_PROJECT_ID] > types/database.types.ts
  ```

#### Day 5: データベース設計・実装

- [ ] **SQL スクリプト作成**
  - `supabase/migrations/001_initial_schema.sql`
  - テーブル作成（users, daily_reports, maintenance_records, expense_records）
  - RLS（Row Level Security）設定
- [ ] **マイグレーション実行**
  ```bash
  supabase db push
  ```

### Week 2: 認証システムとレイアウト

#### Day 6-7: 認証システム実装

- [ ] **認証コンポーネント作成**
  - `components/auth/login-form.tsx`
  - `components/auth/signup-form.tsx`
  - `components/auth/auth-provider.tsx`
- [ ] **認証ページ作成**
  - `app/(auth)/login/page.tsx`
  - `app/(auth)/signup/page.tsx`
  - `app/(auth)/layout.tsx`
- [ ] **認証状態管理**
  - `hooks/use-auth.ts`
  - `context/auth-context.tsx`

#### Day 8-9: 基本レイアウト構築

- [ ] **レイアウトコンポーネント**
  - `components/layout/header.tsx`
  - `components/layout/navigation.tsx`
  - `components/layout/sidebar.tsx`
- [ ] **ルートレイアウト**
  - `app/layout.tsx` 更新
  - `app/(dashboard)/layout.tsx` 作成
- [ ] **ダークモード実装**
  - `components/theme-provider.tsx`
  - `components/theme-toggle.tsx`

#### Day 10: モバイル対応とテスト

- [ ] **レスポンシブ対応確認**
- [ ] **基本テスト作成**
  - 認証フォームのテスト
  - レイアウトコンポーネントのテスト
- [ ] **初回デプロイ（Vercel）**

## 🚀 フェーズ 2: コア機能開発（Week 3-5）

### Week 3: 日報管理機能

#### Day 11-12: 日報データモデル

- [ ] **型定義作成**
  - `types/daily-report.ts`
  - Zod スキーマ（`lib/validations/daily-report.ts`）
- [ ] **Supabase 操作関数**
  - `lib/supabase/daily-reports.ts`
  - CRUD 操作（Create, Read, Update, Delete）

#### Day 13-14: 日報 UI 作成

- [ ] **日報フォームコンポーネント**
  - `components/forms/daily-report-form.tsx`
  - React Hook Form + Zod validation
- [ ] **日報一覧コンポーネント**
  - `components/reports/daily-report-list.tsx`
  - `components/reports/daily-report-card.tsx`
- [ ] **カレンダーコンポーネント**
  - `components/reports/report-calendar.tsx`

#### Day 15: 日報ページ実装

- [ ] **ページファイル作成**
  - `app/(dashboard)/reports/page.tsx`
  - `app/(dashboard)/reports/new/page.tsx`
  - `app/(dashboard)/reports/[id]/page.tsx`

### Week 4: 車両メンテナンス機能

#### Day 16-17: メンテナンスデータモデル

- [ ] **型定義とスキーマ**
  - `types/maintenance.ts`
  - `lib/validations/maintenance.ts`
- [ ] **Supabase 操作関数**
  - `lib/supabase/maintenance.ts`
  - 次回メンテナンス日自動計算ロジック

#### Day 18-19: メンテナンス UI

- [ ] **メンテナンスフォーム**
  - `components/forms/maintenance-form.tsx`
  - メンテナンス種別選択（オイル交換、タイヤ交換等）
- [ ] **メンテナンス履歴**
  - `components/maintenance/maintenance-history.tsx`
  - `components/maintenance/maintenance-reminder.tsx`

#### Day 20: メンテナンスページとリマインダー

- [ ] **ページ実装**
  - `app/(dashboard)/maintenance/page.tsx`
  - `app/(dashboard)/maintenance/new/page.tsx`
- [ ] **リマインダー機能**
  - 期限切れアラート表示
  - ダッシュボードでの通知

### Week 5: 経費管理とダッシュボード

#### Day 21-22: 経費管理システム

- [ ] **経費データモデル**
  - `types/expense.ts`
  - `lib/validations/expense.ts`
  - カテゴリ定義（燃料費、高速代、駐車場代等）
- [ ] **経費 UI 実装**
  - `components/forms/expense-form.tsx`
  - `components/expenses/expense-list.tsx`
  - レシート画像アップロード機能

#### Day 23-24: ダッシュボード実装

- [ ] **KPI カード作成**
  - `components/dashboard/kpi-card.tsx`
  - 今日の売上、今月の配送件数等
- [ ] **グラフコンポーネント**
  - `components/charts/revenue-chart.tsx`
  - `components/charts/delivery-chart.tsx`
  - recharts 使用
- [ ] **ダッシュボードページ**
  - `app/(dashboard)/page.tsx`

#### Day 25: 売上管理

- [ ] **売上記録機能**
  - `components/forms/revenue-form.tsx`
  - 月次集計表示
- [ ] **収支サマリー**
  - `components/dashboard/financial-summary.tsx`

## 🔧 フェーズ 3: 最適化と完成（Week 6）

### Week 6: エクスポート機能とテスト

#### Day 26-27: PDF/CSV エクスポート

- [ ] **エクスポート機能実装**
  - `lib/export/pdf-generator.ts`
  - `lib/export/csv-generator.ts`
- [ ] **月報生成機能**
  - 日報データの月次集計
  - PDF 形式での出力

#### Day 28: 通知システム

- [ ] **通知コンポーネント**
  - `components/notifications/toast-notifications.tsx`
  - `components/notifications/reminder-alerts.tsx`
- [ ] **プッシュ通知設定**
  - Service Worker 設定
  - FCM 統合（基本実装）

#### Day 29: テスト実装

- [ ] **単体テスト追加**
  - 主要コンポーネントのテスト
  - フォームバリデーションテスト
- [ ] **統合テスト**
  - Supabase 操作のテスト
  - 認証フローのテスト

#### Day 30: 最終調整とデプロイ

- [ ] **パフォーマンス最適化**
  - バンドルサイズ確認
  - 画像最適化
- [ ] **本番デプロイ**
  - 環境変数設定
  - Vercel Pro へのデプロイ
- [ ] **ドキュメント更新**
  - README 更新
  - API 仕様書作成

## 📋 各フェーズの成果物

### フェーズ 1 完了時

- ✅ 認証システム稼働
- ✅ 基本レイアウト完成
- ✅ データベース構築完了
- ✅ Vercel デプロイ環境構築

### フェーズ 2 完了時

- ✅ 日報作成・編集機能
- ✅ 車両メンテナンス管理
- ✅ 経費記録機能
- ✅ 基本ダッシュボード

### フェーズ 3 完了時

- ✅ MVP 完成
- ✅ PDF/CSV エクスポート
- ✅ 通知システム
- ✅ テスト実装
- ✅ 本番運用開始

## 🎯 学習ポイント

### Week 1-2: 基礎固め

- Next.js 14 App Router の理解
- Supabase の基本操作
- shadcn/ui コンポーネントの使い方
- TypeScript 型定義の実践

### Week 3-4: React 応用

- React Hook Form の実践的活用
- カスタムフックの作成
- useContext による状態管理
- データフェッチングパターン

### Week 5-6: 統合・最適化

- パフォーマンス最適化手法
- テスト駆動開発の基礎
- デプロイメント戦略
- ユーザビリティ向上技術

## 🔄 継続的改善計画

### 短期（リリース後 1 ヶ月）

- ユーザーフィードバック収集
- バグ修正と安定性向上
- UI/UX 改善

### 中期（リリース後 3 ヶ月）

- GPS 連携機能
- チーム管理機能
- AI OCR レシート読み取り

### 長期（リリース後 6 ヶ月）

- API 公開
- サードパーティ連携
- プレミアム機能追加

## 📊 進捗管理

### 進捗追跡方法

- [ ] GitHub Projects でタスク管理
- [ ] 週次振り返りミーティング
- [ ] 各フェーズ終了時のデモ
- [ ] ユーザビリティテストの実施

### リスク管理

- **技術的課題**: Stack Overflow や公式ドキュメントでの調査
- **スケジュール遅延**: 優先度の見直しと機能削減
- **学習カーブ**: メンターシップやペアプログラミング

---

**この実装計画は学習と実用性のバランスを重視して作成されています。各段階で確実に理解を深めながら進めていきましょう！**
