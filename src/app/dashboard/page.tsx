import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/MainLayout';
import { getAuthenticatedUserProfile } from '@/lib/supabase/auth';
import { PlusIcon, BookOpenIcon, TruckIcon, CalendarIcon } from 'lucide-react';
import Link from 'next/link';

async function DashboardContent() {
  const userProfile = await getAuthenticatedUserProfile();

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* ウェルカムメッセージ */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            おかえりなさい、{userProfile.display_name || 'ドライバー'}さん！
          </h1>
          <p className="text-blue-100">
            {userProfile.company_name ? `${userProfile.company_name}での` : ''}
            今日も安全運転でお疲れさまです。
          </p>
        </div>

        {/* 統計カード */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                今月の稼働日数
              </CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0日</div>
              <p className="text-xs text-muted-foreground">前月比 +0%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                今月の総距離
              </CardTitle>
              <TruckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0km</div>
              <p className="text-xs text-muted-foreground">前月比 +0%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                今月の配送件数
              </CardTitle>
              <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0件</div>
              <p className="text-xs text-muted-foreground">前月比 +0%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                今月の高速代
              </CardTitle>
              <TruckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥0</div>
              <p className="text-xs text-muted-foreground">前月比 +0%</p>
            </CardContent>
          </Card>
        </div>

        {/* クイックアクション */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>クイックアクション</CardTitle>
              <CardDescription>よく使う機能へのショートカット</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start" size="lg">
                <Link href="/daily-reports/new">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  今日の日報を作成
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
                size="lg"
              >
                <Link href="/daily-reports">
                  <BookOpenIcon className="mr-2 h-4 w-4" />
                  日報履歴を確認
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
                size="lg"
              >
                <Link href="/monthly-reports">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  月次レポート
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>最近の活動</CardTitle>
              <CardDescription>最新の日報エントリ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpenIcon className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p className="text-sm">まだ日報が登録されていません</p>
                  <p className="text-xs mt-1">
                    最初の日報を作成してみましょう！
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <MainLayout>
          <div className="space-y-8">
            <div className="bg-gray-200 rounded-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-8 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </MainLayout>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
