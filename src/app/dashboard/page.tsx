import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/MainLayout';
import {
  Plus,
  TrendingUp,
  FileText,
  AlertTriangle,
  DollarSign,
} from 'lucide-react';

/**
 * ダッシュボードページ
 * 概要情報とクイックアクションを表示
 */
export default function DashboardPage() {
  // TODO: 実際のデータはSupabaseから取得
  const mockUser = {
    name: 'テストユーザー',
    email: 'test@example.com',
  };

  const stats = [
    {
      title: '今月の配送件数',
      value: '234',
      icon: FileText,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: '今月の売上',
      value: '¥342,000',
      icon: DollarSign,
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      title: '走行距離',
      value: '1,234 km',
      icon: TrendingUp,
      change: '+5%',
      changeType: 'positive' as const,
    },
    {
      title: '要注意事項',
      value: '2',
      icon: AlertTriangle,
      change: '-1',
      changeType: 'negative' as const,
    },
  ];

  return (
    <MainLayout user={mockUser}>
      <div className="space-y-8">
        {/* ページヘッダー */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              ダッシュボード
            </h1>
            <p className="text-muted-foreground">
              業務の概要と重要な情報を確認できます
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            新しい日報
          </Button>
        </div>

        {/* 統計カード */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={`${
                      stat.changeType === 'positive'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>{' '}
                  前月比
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* クイックアクション */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>最近の日報</CardTitle>
              <CardDescription>直近の業務記録を確認できます</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded">
                  <div>
                    <p className="font-medium">2024/12/15</p>
                    <p className="text-sm text-muted-foreground">45件配送</p>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    完了
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded">
                  <div>
                    <p className="font-medium">2024/12/14</p>
                    <p className="text-sm text-muted-foreground">38件配送</p>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    完了
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                すべての日報を見る
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>メンテナンス予定</CardTitle>
              <CardDescription>車両メンテナンスのスケジュール</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <div>
                    <p className="font-medium">オイル交換</p>
                    <p className="text-sm text-muted-foreground">
                      期限: 2024/12/20
                    </p>
                  </div>
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    期限近
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded">
                  <div>
                    <p className="font-medium">タイヤ交換</p>
                    <p className="text-sm text-muted-foreground">
                      期限: 2025/01/15
                    </p>
                  </div>
                  <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    予定
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                メンテナンス履歴を見る
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
