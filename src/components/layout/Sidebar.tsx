'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  Wrench,
  Receipt,
  Settings,
  Truck,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

/**
 * メインナビゲーション用サイドバーコンポーネント
 * アクティブページのハイライト機能付き
 */
export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: 'ダッシュボード',
      icon: LayoutDashboard,
      href: '/dashboard',
      color: 'text-sky-500',
    },
    {
      label: '日報管理',
      icon: FileText,
      href: '/reports',
      color: 'text-violet-500',
    },
    {
      label: 'メンテナンス',
      icon: Wrench,
      href: '/maintenance',
      color: 'text-pink-700',
    },
    {
      label: '経費管理',
      icon: Receipt,
      href: '/expenses',
      color: 'text-orange-700',
    },
    {
      label: '設定',
      icon: Settings,
      href: '/settings',
      color: 'text-gray-700',
    },
  ];

  return (
    <div className={cn('pb-12 min-h-screen', className)}>
      <div className="space-y-4 py-4">
        {/* ロゴ */}
        <div className="px-3 py-2">
          <Link href="/" className="flex items-center pl-3 mb-14">
            <div className="relative h-8 w-8 mr-4">
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold">Driver Logbook</h1>
          </Link>

          {/* ナビゲーションメニュー */}
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                  pathname === route.href
                    ? 'text-white bg-white/10'
                    : 'text-zinc-400'
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * モバイル用サイドバーコンポーネント
 * シンプルなリンクリスト
 */
export function MobileSidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: 'ダッシュボード',
      icon: LayoutDashboard,
      href: '/dashboard',
    },
    {
      label: '日報管理',
      icon: FileText,
      href: '/reports',
    },
    {
      label: 'メンテナンス',
      icon: Wrench,
      href: '/maintenance',
    },
    {
      label: '経費管理',
      icon: Receipt,
      href: '/expenses',
    },
    {
      label: '設定',
      icon: Settings,
      href: '/settings',
    },
  ];

  return (
    <nav className={cn('grid gap-2 text-lg font-medium', className)}>
      {routes.map((route) => (
        <Button
          key={route.href}
          asChild
          variant={pathname === route.href ? 'default' : 'ghost'}
          className="justify-start"
        >
          <Link href={route.href}>
            <route.icon className="h-5 w-5 mr-3" />
            {route.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
