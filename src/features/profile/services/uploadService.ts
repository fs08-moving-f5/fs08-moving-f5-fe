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

    const code = responseText.match(/<Code>([^<]+)<\/Code>/)?.[1];
    const message = responseText.match(/<Message>([^<]+)<\/Message>/)?.[1];

    const detail = [code, message].filter(Boolean).join(': ');

    throw new Error(
      detail
        ? `S3 업로드에 실패했습니다. (${putResponse.status}) ${detail}`
        : `S3 업로드에 실패했습니다. (${putResponse.status})`,
    );
  }
};
