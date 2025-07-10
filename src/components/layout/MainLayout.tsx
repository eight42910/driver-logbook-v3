'use client';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  className?: string;
}

/**
 * アプリケーションのメインレイアウトコンポーネント
 * 認証後のページで使用される統一レイアウト
 */
export function MainLayout({ children, user, className }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <Header user={user} />

      <div className="flex">
        {/* サイドバー（デスクトップ） */}
        <aside className="hidden w-64 md:block border-r bg-gray-50/40 dark:bg-gray-950/40">
          <Sidebar />
        </aside>

        {/* メインコンテンツエリア */}
        <main className={cn('flex-1 flex flex-col', className)}>
          <div className="flex-1 container py-6">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

/**
 * 認証前ページ用のシンプルレイアウト
 */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* シンプルヘッダー */}
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded"></div>
            <span className="font-bold text-xl">Driver Logbook</span>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>

      {/* シンプルフッター */}
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          © 2024 Driver Logbook v3. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
