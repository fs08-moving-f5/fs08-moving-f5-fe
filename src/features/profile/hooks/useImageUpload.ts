'use client';

import { useState } from 'react';
import { createProfileImagePutPresign, uploadFileToPresignedUrl } from '../services/uploadService';
import { ALLOWED_IMAGE_MIME_TYPES } from '../constants/image.constants';
import { transformImageForUpload } from '../utils/transformImage';

/**
 * 이미지 업로드 훅
 * - 파일 선택 및 미리보기
 * - presigned URL 발급 후 S3로 직접 업로드
 * - 업로드 완료 후 imageKey 저장 (화면은 미리보기 유지)
 */
export const useImageUpload = (
  initialUrl: string | null = null,
  initialKey: string | null = null,
) => {
  const [imageUrl, setImageUrl] = useState<string | null>(initialUrl);
  const [uploadedImageKey, setUploadedImageKey] = useState<string | null>(initialKey);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setImageUrlWithKey = (nextUrl: string | null, nextKey: string | null) => {
    setImageUrl(nextUrl);
    setUploadedImageKey(nextKey);
  };

  const resetImage = () => {
    setImageUrlWithKey(null, null);
  };

  const setImage = (params: { url: string | null; key: string | null }) => {
    setImageUrlWithKey(params.url, params.key);
  };

  const setImageUrlOnly = (nextUrl: string | null) => {
    if (!nextUrl || nextUrl.startsWith('data:')) {
      setImageUrlWithKey(nextUrl, null);
      return;
    }

    // 외부 URL만 바꾸는 경우(드물지만) 기존 key는 유지
    setImageUrlWithKey(nextUrl, uploadedImageKey);
  };

  const handleImageSelect = async (file: File) => {
    if (isUploading) return;

    setIsUploading(true);
    setError(null);
    setUploadedImageKey(null);

    try {
      if (
        !ALLOWED_IMAGE_MIME_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_MIME_TYPES)[number])
      ) {
        setError(`지원하지 않는 이미지 형식입니다. (${ALLOWED_IMAGE_MIME_TYPES.join(', ')})`);
        return;
      }

      // 0) 512x512 이하(비율 유지)로 리사이즈/압축
      const transformedFile = await transformImageForUpload(file);

      // 1) 미리보기(data URL)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(transformedFile);

      // 2) presigned URL 발급
      const { uploadUrl, key } = await createProfileImagePutPresign({
        contentType: transformedFile.type || 'application/octet-stream',
        fileName: transformedFile.name,
      });

      // 3) S3로 직접 업로드
      await uploadFileToPresignedUrl({ uploadUrl, file: transformedFile });

      // 4) 업로드 완료 후: key 저장 (화면은 미리보기(data URL) 유지)
      setUploadedImageKey(key);
    } catch (err) {
      const message = err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.';
      setError(message);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    imageUrl,
    uploadedImageKey,
    setImageUrl: setImageUrlOnly,
    setImage,
    isUploading,
    error,
    handleImageSelect,
    resetImage,
  };
};
