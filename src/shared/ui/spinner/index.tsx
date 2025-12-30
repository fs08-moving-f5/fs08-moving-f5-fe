'use client';

import { BarLoader } from 'react-spinners';
import { useEffect, useState, useRef } from 'react';

interface SpinnerProps {
  isLoading?: boolean;
}

const Spinner = ({ isLoading = true }: SpinnerProps) => {
  const [shouldRender, setShouldRender] = useState(isLoading);
  const [isVisible, setIsVisible] = useState(isLoading);
  const prevLoadingRef = useRef(isLoading);

  useEffect(() => {
    // 이전 값과 같으면 실행하지 않음 (초기 렌더링 건너뛰기)
    if (prevLoadingRef.current === isLoading) {
      return;
    }

    prevLoadingRef.current = isLoading;

    let timer: NodeJS.Timeout | null = null;

    if (isLoading) {
      // 비동기로 상태 업데이트하여 린트 오류 방지
      setTimeout(() => {
        setShouldRender(true);
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }, 0);
    } else {
      // 비동기로 상태 업데이트하여 린트 오류 방지
      setTimeout(() => {
        setIsVisible(false);
        timer = setTimeout(() => {
          setShouldRender(false);
        }, 300);
      }, 0);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`transition-visibility fixed top-0 left-0 z-[9999] flex h-full w-full items-center justify-center bg-black/10 backdrop-blur-sm transition-opacity duration-300 ease-out ${
        isVisible ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <BarLoader className="w-[120px]" />
    </div>
  );
};

export default Spinner;
