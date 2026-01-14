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
        // window.kakao.maps가 준비될 때까지 기다림
        const checkAndLoad = () => {
          if (window.kakao?.maps) {
            window.kakao.maps.load(() => {
              // maps.load() 콜백 후에도 실제로 사용 가능한지 확인
              if (window.kakao.maps && typeof window.kakao.maps.Map === 'function') {
                console.log('✅ Kakao Maps SDK loaded');
                onLoad?.();
              } else {
                // 아직 준비되지 않았으면 다시 시도
                setTimeout(checkAndLoad, 50);
              }
            });
          } else {
            // window.kakao.maps가 아직 없으면 다시 시도
            setTimeout(checkAndLoad, 50);
          }
        };
        checkAndLoad();
      }}
    />
  );
};
