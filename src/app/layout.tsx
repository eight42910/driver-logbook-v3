import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Driver Logbook v3',
  description: '運転手のための日報管理システム',
  keywords: ['運転手', '日報', '管理', '運送業'],
  authors: [{ name: 'Driver Logbook Team' }],
  openGraph: {
    title: 'Driver Logbook v3',
    description: '運転手のための日報管理システム',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
