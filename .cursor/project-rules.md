# Driver Logbook v3 - プロジェクトルール

## 📋 プロジェクト概要

運転手の日報管理システム（Next.js + Supabase）

## 🏗️ 技術スタック

### コアテクノロジー

- **Next.js**: `14.2` (App Router 使用)
- **TypeScript**: `5.x` (厳格設定)
- **React**: `18.x`
- **Supabase**: データベース・認証・リアルタイム機能
- **Tailwind CSS**: スタイリング
- **shadcn/ui**: UI コンポーネント

### 主要ライブラリ

- **React Hook Form + Zod**: フォーム管理・バリデーション
- **Lucide React**: アイコン
- **date-fns**: 日付操作
- **recharts**: チャート・グラフ
- **html2canvas + jsPDF**: PDF 出力

## 📁 ディレクトリ構造ルール

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 認証関連ページグループ
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # ホームページ
├── components/            # 再利用可能なコンポーネント
│   ├── ui/               # shadcn/ui コンポーネント
│   ├── forms/            # フォーム関連コンポーネント
│   └── layout/           # レイアウト関連コンポーネント
├── contexts/             # React Context
├── lib/                  # ユーティリティ・設定
│   ├── supabase/        # Supabase関連
│   │   ├── client.ts    # Supabaseクライアント
│   │   └── queries/     # データベースクエリ
│   └── utils.ts         # 汎用ユーティリティ
├── types/               # TypeScript型定義
└── styles/              # グローバルCSS
```

### ディレクトリ命名規則

- **kebab-case**: ディレクトリ名
- **PascalCase**: コンポーネントファイル名
- **camelCase**: 通常のファイル名・関数名

## 🎯 コンポーネント設計ルール

### 1. コンポーネント分離の基準

```typescript
// ❌ 悪い例: 大きすぎるコンポーネント
export function DashboardPage() {
  // 200行のコンポーネント...
}

// ✅ 良い例: 適切に分離
export function DashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <DashboardStats />
      <RecentReports />
    </div>
  );
}
```

### 2. コンポーネント構成ルール

- **1 ファイル = 1 コンポーネント** （50 行以下推奨）
- **関心事の分離**: UI・ロジック・データを明確に分ける
- **再利用性**: 3 回以上使う場合はコンポーネント化

### 3. プロップス設計

```typescript
// ✅ 明確なプロップス定義
interface DailyReportCardProps {
  report: DailyReport;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}
```

## 📝 TypeScript 型定義ルール

### 1. インターフェース命名規則

```typescript
// ✅ 明確な命名
export interface User {
  id: string;
  email: string;
  display_name?: string;
}

export interface DailyReport {
  id: number;
  user_id: string;
  date: string;
  // ...
}

// ✅ API レスポンス型
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: 'success' | 'error';
}
```

### 2. 型定義の場所

- **`src/types/database.ts`**: Supabase 関連の型
- **`src/types/api.ts`**: API 関連の型
- **`src/types/components.ts`**: コンポーネント固有の型

### 3. 型安全性の確保

```typescript
// ✅ 厳格な型チェック
const user: User = await getUserById(id);
if (!user) {
  throw new Error('User not found');
}

// ✅ 型ガード関数
function isDailyReport(obj: unknown): obj is DailyReport {
  return obj && typeof obj === 'object' && 'id' in obj;
}
```

## 🔄 データ取得ルール

### 1. Supabase クエリ管理

```typescript
// src/lib/supabase/queries/daily-reports.ts
export async function getDailyReports(userId: string) {
  const { data, error } = await supabase
    .from('daily_reports')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
}
```

### 2. Server Components vs Client Components

```typescript
// ✅ Server Component: 初期データ取得
export default async function DashboardPage() {
  const reports = await getDailyReports(userId);
  return <DashboardClient reports={reports} />;
}

// ✅ Client Component: インタラクション
('use client');
export function DashboardClient({ reports }: Props) {
  const [selectedReport, setSelectedReport] = useState<DailyReport>();
  // ...
}
```

### 3. エラーハンドリング

```typescript
// ✅ 統一されたエラーハンドリング
try {
  const data = await apiCall();
  return { data, error: null };
} catch (error) {
  console.error('API Error:', error);
  return { data: null, error: error.message };
}
```

## 🎨 UI・スタイリングルール

### 1. Tailwind CSS 使用方針

```typescript
// ✅ コンポーネント内でのクラス管理
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300':
            variant === 'secondary',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}
```

### 2. shadcn/ui 活用

- **基本コンポーネント**: shadcn/ui を使用
- **カスタマイズ**: 必要に応じて variants を追加
- **一貫性**: デザインシステムを維持

## 🔐 認証・セキュリティルール

### 1. Supabase Auth 使用

```typescript
// ✅ 認証状態管理
export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/login');
  }
  return user;
}
```

### 2. Row Level Security (RLS)

- **必須**: 全テーブルで RLS を有効化
- **ポリシー**: ユーザーは自分のデータのみアクセス可能

## 📋 フォーム管理ルール

### 1. React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const dailyReportSchema = z.object({
  date: z.string().min(1, '日付は必須です'),
  is_worked: z.boolean(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
});

type DailyReportForm = z.infer<typeof dailyReportSchema>;

export function DailyReportForm() {
  const form = useForm<DailyReportForm>({
    resolver: zodResolver(dailyReportSchema),
  });

  // ...
}
```

### 2. エラーメッセージの統一

- **日本語**: ユーザー向けメッセージ
- **具体的**: 何をすべきか明確に

## 🚀 パフォーマンス最適化ルール

### 1. Next.js 機能の活用

- **Static Generation**: 静的なページ
- **Server Components**: 初期レンダリング最適化
- **Dynamic Imports**: コード分割

### 2. 画像最適化

```typescript
import Image from 'next/image';

// ✅ Next.js Image コンポーネント使用
<Image
  src="/dashboard-screenshot.png"
  alt="ダッシュボード"
  width={800}
  height={600}
  priority={true} // 重要な画像の場合
/>;
```

## 🧪 テスト戦略

### 1. テスト構成

- **Vitest**: 単体テスト
- **Testing Library**: コンポーネントテスト

### 2. テスト方針

- **重要な機能**: 必ずテストを書く
- **ユーザーインタラクション**: E2E テスト推奨

## 🔧 開発ワークフロー

### 1. コーディング規約

- **ESLint**: Next.js 推奨設定
- **Prettier**: コード整形（設定予定）
- **コミット**: 機能単位での細かいコミット

### 2. ブランチ戦略

- **main**: 本番環境
- **feature/\***: 新機能開発
- **bugfix/\***: バグ修正

## 📖 ドキュメント規約

### 1. コメント

```typescript
/**
 * 日報データを取得する
 * @param userId - ユーザーID
 * @param startDate - 開始日（YYYY-MM-DD形式）
 * @param endDate - 終了日（YYYY-MM-DD形式）
 * @returns 日報データの配列
 */
export async function getDailyReports(
  userId: string,
  startDate: string,
  endDate: string
): Promise<DailyReport[]> {
  // 実装...
}
```

### 2. README 更新

- **新機能追加時**: README を更新
- **設定変更時**: インストール手順を更新

## 🎯 このプロジェクトの重点ポイント

### 1. 初学者フレンドリー

- **明確な責務分離**: 複雑さを避ける
- **豊富なコメント**: 学習しやすいコード
- **段階的改善**: 一度に全てを完璧にしない

### 2. 運転ログブック特有の要件

- **日付管理**: 正確な日時処理
- **数値計算**: 距離・時間の自動計算
- **PDF 出力**: 月次レポート生成
- **データ整合性**: 重複登録防止

### 3. 将来の拡張性

- **モジュラー設計**: 機能追加しやすい構造
- **型安全性**: リファクタリング時の安全性
- **パフォーマンス**: スケーラブルな設計

---

## 🔄 ルール改善

このルールは開発の進行とともに改善していきます。

- **週次レビュー**: ルールの有効性確認
- **チーム議論**: より良い方法の模索
- **継続的改善**: 実践を通じた最適化

---

_最終更新: 2024 年 12 月_
