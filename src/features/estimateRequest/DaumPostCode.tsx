'use client';

import { useEffect, useRef } from 'react';

export interface Address {
  zonecode: string;
  address: string;
  addressEnglish: string;
  addressType: 'R' | 'J';
  userSelectedType: 'R' | 'J';
  noSelected: 'Y' | 'N';
  userLanguageType: 'K' | 'E';
  roadAddress: string;
  roadAddressEnglish: string;
  jibunAddress: string;
  jibunAddressEnglish: string;
  autoRoadAddress: string;
  autoRoadAddressEnglish: string;
  autoJibunAddress: string;
  autoJibunAddressEnglish: string;
  buildingCode: string;
  buildingName: string;
  apartment: 'Y' | 'N';
  sido: string;
  sidoEnglish: string;
  sigungu: string;
  sigunguEnglish: string;
  sigunguCode: string;
  roadnameCode: string;
  bcode: string;
  roadname: string;
  roadnameEnglish: string;
  bname: string;
  bnameEnglish: string;
  bname1: string;
  bname1English: string;
  bname2: string;
  bname2English: string;
  hname: string;
  query: string;
}

//전역 타입 추가 daum
declare global {
  interface Window {
    daum: any;
  }
}

type PopupState = 'FORCE_CLOSE' | 'COMPLETE_CLOSE';

interface DaumPostcodeProps {
  onComplete: (data: Address) => void;
  onClose: (state: PopupState) => void;
}

export default function DaumPostcode({ onComplete, onClose }: DaumPostcodeProps) {
  const wrapPef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
    if (window && window.daum) {
      new window.daum.Postcode({
        oncomplete: (data: Address) => {
          onComplete({ ...data });
        },
        onClose: (state: PopupState) => {
          onClose(state);
        },
        width: '100%',
        height: '100%',
        maxSuggestItems: 5,
      }).embed(wrapPef.current);
    }
  }, []);

  return <div ref={wrapPef} className="h-[500px] w-full"></div>;
}
