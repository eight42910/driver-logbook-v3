import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Driver Logbook',
    template: '%s | Driver Logbook',
  },
  description:
    '委託ドライバー業務効率化アプリ - 日報管理、車両メンテナンス、経費管理を一元管理',
  keywords: ['ドライバー', '日報', '業務管理', '委託', '軽貨物'],
  authors: [{ name: 'Driver Logbook Team' }],
  creator: 'Driver Logbook v3',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://driver-logbook.vercel.app',
    title: 'Driver Logbook - 委託ドライバー業務効率化アプリ',
    description: '日報管理、車両メンテナンス、経費管理を一元管理',
    siteName: 'Driver Logbook',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Driver Logbook - 委託ドライバー業務効率化アプリ',
    description: '日報管理、車両メンテナンス、経費管理を一元管理',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
