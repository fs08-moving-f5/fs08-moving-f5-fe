'use client';

import { useState } from 'react';

/**
 * 이미지 업로드 훅
 * - 파일 선택 및 미리보기
 * - 이미지 URL 변환
 * - TODO: 실제 이미지 업로드 API 연동
 */
export const useImageUpload = (initialUrl: string | null = null) => {
  const [imageUrl, setImageUrl] = useState<string | null>(initialUrl);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (file: File) => {
    // 미리보기를 위한 로컬 URL 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // TODO: 실제 서버에 업로드
    // 현재는 base64 데이터 URL을 사용하지만,
    // 실제로는 S3 등에 업로드하고 URL을 받아와야 함
  };

  const resetImage = () => {
    setImageUrl(null);
  };

  return {
    imageUrl,
    setImageUrl,
    isUploading,
    handleImageSelect,
    resetImage,
  };
};
