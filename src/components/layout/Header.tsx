'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Truck, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick?: () => void;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
}

/**
 * アプリケーションのヘッダーコンポーネント
 * ナビゲーション、ユーザーメニュー、モバイル対応を含む
 */
export function Header({ onMenuClick, user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* モバイルメニューボタン */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">メニューを開く</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>

        {/* ロゴ・タイトル */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Truck className="h-6 w-6 text-blue-600" />
            <span className="hidden font-bold sm:inline-block">
              Driver Logbook
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* デスクトップナビゲーション */}
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/dashboard"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                ダッシュボード
              </Link>
              <Link
                href="/reports"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                日報
              </Link>
              <Link
                href="/maintenance"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                メンテナンス
              </Link>
              <Link
                href="/expenses"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                経費
              </Link>
            </nav>
          </div>

          {/* ユーザーメニュー */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.avatar}
                    alt={user?.name || 'ユーザー'}
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || 'ゲストユーザー'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || ''}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  プロフィール
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  設定
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                ログアウト
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

/**
 * モバイル用ナビゲーションコンポーネント
 */
function MobileNav() {
  return (
    <div className="flex flex-col space-y-2">
      <Link href="/" className="flex items-center space-x-2 mb-4">
        <Truck className="h-6 w-6 text-blue-600" />
        <span className="font-bold">Driver Logbook</span>
      </Link>

      <Link href="/dashboard" className="block px-2 py-1 text-lg font-semibold">
        ダッシュボード
      </Link>
      <Link href="/reports" className="block px-2 py-1 text-lg font-semibold">
        日報
      </Link>
      <Link
        href="/maintenance"
        className="block px-2 py-1 text-lg font-semibold"
      >
        メンテナンス
      </Link>
      <Link href="/expenses" className="block px-2 py-1 text-lg font-semibold">
        経費
      </Link>
    </div>
  );
}
