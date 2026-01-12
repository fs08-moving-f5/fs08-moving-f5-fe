import { api } from '@/shared/api/client';
import type {
  CreateProfileImagePutPresignRequest,
  ProfileImagePutPresignData,
} from '../types/types';

export const createProfileImagePutPresign = async (
  params: CreateProfileImagePutPresignRequest,
): Promise<ProfileImagePutPresignData> => {
  const response = await api.post<ProfileImagePutPresignData>(
    'profile/me/profile-image/presign-put',
    params,
  );
  return response.data;
};

export const uploadFileToPresignedUrl = async (params: {
  uploadUrl: string;
  file: File;
}): Promise<void> => {
  const { uploadUrl, file } = params;

  const putResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!putResponse.ok) {
    let responseText = '';
    try {
      responseText = await putResponse.text();
    } catch {
      // ignore
    }

    // S3는 CORS가 허용되어 있으면 XML 에러 바디를 내려줍니다.
    // 여기의 Code/Message를 보면 403 원인(AccessDenied/SignatureDoesNotMatch 등)을 바로 알 수 있습니다.
    // querystring(서명) 노출을 피하려고 URL은 path까지만 로그합니다.
    const safeUrl = uploadUrl.split('?')[0];
    const code = responseText.match(/<Code>([^<]+)<\/Code>/)?.[1];
    const message = responseText.match(/<Message>([^<]+)<\/Message>/)?.[1];

    console.error(`[S3 PUT] failed: ${putResponse.status} ${putResponse.statusText} ${safeUrl}`);
    if (code || message) {
      console.error('[S3 PUT] error detail:', { code, message });
    }
    if (responseText) {
      console.error('[S3 PUT] raw xml:', responseText);
    }

    const detail = [code, message].filter(Boolean).join(': ');

    throw new Error(
      detail
        ? `S3 업로드에 실패했습니다. (${putResponse.status}) ${detail}`
        : `S3 업로드에 실패했습니다. (${putResponse.status})`,
    );
  }
};
