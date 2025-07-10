import { DailyReportForm } from '@/components/forms/DailyReportForm';

/**
 * 日報管理ページ
 *
 * 機能：
 * - 日報の作成・編集フォーム表示
 * - 認証済みユーザーのみアクセス可能
 */
export default function ReportsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* ページヘッダー */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">日報管理</h1>
        <p className="text-gray-600">今日の稼働記録を入力してください</p>
      </div>

      {/* 日報フォーム */}
      <div className="max-w-4xl mx-auto">
        <DailyReportForm />
      </div>

      {/* 使用方法のヘルプ */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-3">
            📝 使用方法
          </h2>
          <div className="space-y-2 text-sm text-blue-700">
            <p>
              • <strong>稼働チェック</strong>:
              今日働いた場合はチェックを入れてください
            </p>
            <p>
              • <strong>時間入力</strong>:
              「現在」ボタンで現在時刻を簡単入力できます
            </p>
            <p>
              • <strong>メーター入力</strong>:
              開始・終了メーターから走行距離を自動計算します
            </p>
            <p>
              • <strong>配送・経費</strong>: 配送件数と高速料金を記録できます
            </p>
            <p>
              • <strong>備考</strong>: その他のメモや特記事項を記入できます
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
