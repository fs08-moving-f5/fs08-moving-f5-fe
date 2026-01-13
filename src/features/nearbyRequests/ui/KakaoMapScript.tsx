'use client';

import Script from 'next/script';

type Props = {
  onLoad?: () => void;
};

export const KakaoMapScript = ({ onLoad }: Props) => {
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  if (!kakaoKey) {
    return null;
  }

  return (
    <Script
      src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`}
      strategy="afterInteractive"
      onLoad={() => {
        window.kakao.maps.load(() => {
          console.log('✅ Kakao Maps SDK loaded');
          onLoad?.();
        });
      }}
    />
  );
};
