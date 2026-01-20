'use client';

import { useState } from 'react';
import { createProfileImagePutPresign, uploadFileToPresignedUrl } from '../services/uploadService';
import { ALLOWED_IMAGE_MIME_TYPES } from '../constants/image.constants';
import { transformImageForUpload } from '../utils/transformImage';

/**
 * 이미지 업로드 훅
 * - 파일 선택 및 미리보기
 * - 실제 presigned URL 발급 및 S3 업로드는 "저장/수정" 시점에만 수행
 * - 업로드 완료 후 imageKey 저장 (화면은 미리보기 유지)
 */
export const useImageUpload = (
  initialUrl: string | null = null,
  initialKey: string | null = null,
) => {
  const [imageUrl, setImageUrl] = useState<string | null>(initialUrl);
  const [uploadedImageKey, setUploadedImageKey] = useState<string | null>(initialKey);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setImageUrlWithKey = (nextUrl: string | null, nextKey: string | null) => {
    setImageUrl(nextUrl);
    setUploadedImageKey(nextKey);
  };

  const resetImage = () => {
    setImageUrlWithKey(null, null);
    setPendingFile(null);
  };

  const setImage = (params: { url: string | null; key: string | null }) => {
    setImageUrlWithKey(params.url, params.key);
    setPendingFile(null);
  };

  const setImageUrlOnly = (nextUrl: string | null) => {
    if (!nextUrl || nextUrl.startsWith('data:')) {
      setImageUrlWithKey(nextUrl, uploadedImageKey);
      return;
    }

    // 외부 URL만 바꾸는 경우(드물지만) 기존 key는 유지
    setImageUrlWithKey(nextUrl, uploadedImageKey);
  };

  const handleImageSelect = async (file: File) => {
    // 파일 선택 시점에는 "미리보기"만 만들고,
    // 실제 presign 발급/업로드는 사용자가 "수정하기"를 눌렀을 때만 수행합니다.
    if (isUploading) return;

    setError(null);

    try {
      if (
        !ALLOWED_IMAGE_MIME_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_MIME_TYPES)[number])
      ) {
        setError(`지원하지 않는 이미지 형식입니다. (${ALLOWED_IMAGE_MIME_TYPES.join(', ')})`);
        return;
      }

      // 0) 512x512 이하(비율 유지)로 리사이즈/압축
      const transformedFile = await transformImageForUpload(file);
      setPendingFile(transformedFile);

      // 1) 미리보기(data URL)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(transformedFile);
    } catch (err) {
      const message = err instanceof Error ? err.message : '이미지 변환에 실패했습니다.';
      setError(message);
      setPendingFile(null);
    }
  };

  const uploadPendingImage = async (): Promise<string | null> => {
    if (!pendingFile) return uploadedImageKey;
    if (isUploading) return null;

    setIsUploading(true);
    setError(null);

    try {
      // 1) presigned URL 발급
      const { uploadUrl, key } = await createProfileImagePutPresign({
        contentType: pendingFile.type || 'application/octet-stream',
        fileName: pendingFile.name,
      });

      // 2) S3로 직접 업로드
      await uploadFileToPresignedUrl({ uploadUrl, file: pendingFile });

      // 3) 업로드 완료 후: key 저장
      setUploadedImageKey(key);
      setPendingFile(null);
      return key;
    } catch (err) {
      const message = err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.';
      setError(message);
      return null;
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
    uploadPendingImage,
    resetImage,
  };
};
