# Driver Logbook v3

委託ドライバー業務効率化アプリ

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-green)
![Vercel](https://img.shields.io/badge/Vercel-deployed-black)

## 📋 プロジェクト概要

**委託ドライバーが日々の業務をストレスなく記録・可視化し、改善のヒントを得られる"使っていて楽しい"業務アプリ**

### 🎯 ターゲットユーザー

- **プライマリ**: 委託軽貨物ドライバー（個人事業主）
- **セカンダリ**: 事務担当・発注元

### ✨ 主要機能

- 📝 **日報・月報管理**: 日々の業務記録と自動集計
- 🔧 **車両メンテナンス**: 点検・修理履歴とリマインダー
- 💰 **収支管理**: 売上・経費の記録と PDF/CSV 出力
- 📊 **ダッシュボード**: KPI 可視化とパフォーマンス分析

## 🛠️ 技術スタック

### フロントエンド

- **Next.js 14** (App Router)
- **TypeScript**
- **shadcn/ui** (Radix UI + Tailwind CSS)
- **React Hook Form** + **Zod**

### バックエンド・インフラ

- **Supabase** (Database, Auth, Storage, Edge Functions)
- **Vercel** (デプロイ・ホスティング)

### テスト・開発ツール

- **Vitest** + **React Testing Library**
- **ESLint** + **Prettier**
- **GitHub Actions** (CI/CD)

## 🏗️ プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 認証関連ページ
│   ├── dashboard/         # ダッシュボード
│   ├── reports/           # 日報・月報
│   ├── maintenance/       # 車両メンテナンス
│   ├── expenses/          # 経費管理
│   └── settings/          # 設定
├── components/            # 再利用可能コンポーネント
│   ├── ui/               # shadcn/ui コンポーネント
│   ├── forms/            # フォームコンポーネント
│   ├── charts/           # グラフコンポーネント
│   └── layout/           # レイアウトコンポーネント
├── lib/                  # ユーティリティ・設定
│   ├── supabase/         # Supabase関連
│   ├── validations/      # Zodスキーマ
│   └── utils/            # ヘルパー関数
├── hooks/                # カスタムフック
├── context/              # Reactコンテキスト
└── types/                # TypeScript型定義
```

## 🚀 セットアップ

### 前提条件

- Node.js 18.17 以上
- npm または yarn
- Supabase アカウント

### 1. プロジェクトのクローン

```bash
git clone https://github.com/your-username/driver-logbook-v3.git
cd driver-logbook-v3
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase の設定

```bash
# Supabase CLIのインストール
npm install -g @supabase/cli

# プロジェクトの初期化
supabase init

# ローカル開発環境の起動
supabase start
```

### 5. データベースのセットアップ

```bash
# マイグレーションの実行
supabase db push

# 初期データの投入（オプション）
supabase db seed
```

### 6. 開発サーバーの起動

```bash
npm run dev
```

## 📊 データベース設計

### 主要テーブル

#### users

```sql
create table users (
  id uuid primary key default auth.uid(),
  display_name text,
  role text default 'driver',
  unit_price integer,
  vehicle_info jsonb,
  created_at timestamp default now()
);
```

#### daily_reports

```sql
create table daily_reports (
  id bigserial primary key,
  user_id uuid references users(id),
  date date not null,
  distance_km integer,
  deliveries integer,
  working_hours decimal,
  revenue integer,
  expenses integer,
  notes text,
  created_at timestamp default now()
);
```

#### maintenance_records

```sql
create table maintenance_records (
  id bigserial primary key,
  user_id uuid references users(id),
  type text not null,
  cost integer,
  odometer integer,
  performed_at date,
  next_due_at date,
  memo text,
  created_at timestamp default now()
);
```

#### expense_records

```sql
create table expense_records (
  id bigserial primary key,
  user_id uuid references users(id),
  category text not null,
  amount integer not null,
  occurred_at date not null,
  receipt_url text,
  notes text,
  created_at timestamp default now()
);
```

## 🧪 テスト

### テストの実行

```bash
# 全てのテストを実行
npm run test

# テストをwatch モードで実行
npm run test:watch

# カバレッジレポートの生成
npm run test:coverage
```

### テストの種類

- **単体テスト**: コンポーネント・フック・ユーティリティ関数
- **統合テスト**: フォーム送信・データ取得フロー
- **E2E テスト**: 主要なユーザージャーニー（追加予定）

## 📱 機能詳細

### 1. 認証システム

- メール/パスワード認証
- Google/Apple OAuth（予定）
- パスワードリセット
- プロフィール管理

### 2. 日報管理

- 日次業務記録（走行距離、配送件数、労働時間）
- カレンダー表示
- 月次自動集計
- PDF/CSV エクスポート

### 3. 車両メンテナンス

- オイル交換、タイヤ交換等の記録
- 次回メンテナンス時期の自動計算
- リマインダー通知
- 費用追跡

### 4. 収支管理

- 売上記録
- 経費カテゴリ別管理
- 月次・年次レポート
- 税務書類準備支援

### 5. ダッシュボード

- KPI 可視化（配送効率、売上推移）
- ストリークバッジ（連続記録日数）
- パフォーマンス分析
- 目標設定・追跡

## 🎨 デザインシステム

### カラーパレット

- **Primary**: Emerald-600
- **Accent**: Cyan-500
- **Surface**: Slate-950 (Dark) / Slate-50 (Light)

### コンポーネント

- shadcn/ui ベースの一貫したデザイン
- モバイルファースト設計
- ダークモード対応
- アクセシビリティ準拠 (WCAG 2.1 AA)

## 🚀 デプロイ

### Vercel へのデプロイ

```bash
# Vercel CLIのインストール
npm install -g vercel

# デプロイ
vercel --prod
```

### 環境変数の設定

Vercel ダッシュボードで以下の環境変数を設定：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📈 開発ロードマップ

### フェーズ 1: 基盤構築（Week 1-2）

- [x] Next.js 14 プロジェクト初期化
- [ ] shadcn/ui セットアップ
- [ ] Supabase 統合
- [ ] 認証システム実装
- [ ] 基本レイアウト作成

### フェーズ 2: コア機能開発（Week 3-5）

- [ ] 日報作成・編集機能
- [ ] 車両メンテナンス記録
- [ ] 経費管理システム
- [ ] ダッシュボード実装
- [ ] 通知システム

### フェーズ 3: 最適化と完成（Week 6）

- [ ] PDF/CSV エクスポート
- [ ] パフォーマンス最適化
- [ ] テスト実装
- [ ] ドキュメント整備
- [ ] プロダクションデプロイ

## 🤝 開発ガイドライン

### 開発思想

- **シンプル第一**: 「記録 → 管理 → 提出」が UX のコア
- **段階的学習**: 最初は useContext、慣れたら Zustand
- **型安全重視**: TypeScript で早期エラー発見
- **ユーザビリティ**: モバイル優先、直感的操作

### コーディング規約

- **コンポーネント**: PascalCase
- **ファイル名**: kebab-case
- **フック**: use- prefix
- **型定義**: 明示的な型指定を推奨

### コミット規約

```
feat: 新機能の追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイルの変更
refactor: リファクタリング
test: テストの追加・修正
chore: その他の変更
```

## 📚 学習リソース

### 推奨学習順序

1. [Next.js 公式チュートリアル](https://nextjs.org/learn)
2. [Supabase 公式ドキュメント](https://supabase.com/docs)
3. [shadcn/ui 公式サイト](https://ui.shadcn.com/)
4. [React Testing Library 公式ガイド](https://testing-library.com/docs/react-testing-library/intro/)

### 参考リンク

- [TypeScript ハンドブック](https://www.typescriptlang.org/docs/)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [React Hook Form ドキュメント](https://react-hook-form.com/)

## 🔒 セキュリティ

- Row Level Security (RLS) による データアクセス制御
- HTTPS 通信の強制
- 入力値のバリデーション（フロント・バック両方）
- XSS・CSRF 対策

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 🙋‍♂️ サポート

質問やバグ報告は [Issues](https://github.com/your-username/driver-logbook-v3/issues) までお願いします。

---

**開発開始日**: 2024 年 12 月
**目標リリース**: 2025 年 Q2
**開発者**: [Your Name]
