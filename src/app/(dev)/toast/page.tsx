'use client';

import { showToast } from '@/shared/ui/sonner';

const ToastPage = () => {
  return (
    <button onClick={() => showToast({ kind: 'success', message: '링크가 복사되었어요.' })}>
      Toast 표시하기
    </button>
  );
};

export default ToastPage;
