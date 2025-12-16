import type { Metadata } from 'next';
import type { Viewport } from 'next';
import Providers from './providers';
import './globals.css';
import Script from 'next/script';
import { AppToaster } from '@/shared/ui/sonner';

export const metadata: Metadata = {
  title: '무빙 Moving',
  description:
    '믿을 수 있는 이사 전문가와 소비자를 연결하는 매칭 서비스. 조건 입력 후 다양한 기사님의 견적과 후기를 비교해 가장 적합한 전문가를 선택하세요.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Providers>{children}</Providers>
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          strategy="afterInteractive"
        />
        <AppToaster />
      </body>
    </html>
  );
}
