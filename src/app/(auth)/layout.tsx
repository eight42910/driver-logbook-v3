import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ログイン | Driver Logbook',
  description: '運転手日報システムにログインしてください',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Driver Logbook
            </h1>
            <p className="text-sm text-gray-600">
              運転手のための日報管理システム
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
      </div>
    </div>
  );
}
