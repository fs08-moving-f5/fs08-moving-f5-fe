import { BeforeRequestHook, BeforeRetryHook, HTTPError } from 'ky';
import { storage } from '@/shared/lib/storage';

const setAuthorizationHeader: BeforeRequestHook = (request) => {
  const accessToken = storage.getString('accessToken');

  if (!accessToken) return;
  request.headers.set('Authorization', `Bearer ${accessToken}`);
};

const parseErrorResponse = async (error: HTTPError) => {
  const { response } = error;
  const data = await response.json() as { message?: string };
  try {
    error.message = data.message || response.statusText;
  } catch (e) {
    console.error('Error parsing error response:', e);
  }
  return error;
};

const handleToken: BeforeRetryHook = async ({ error, retryCount }) => {
  //TODO - 토큰 재발급 로직 구현
  // const customError = error as ErrorResponseType;
  // if (customError.status !== 401) return ky.stop; // status code가 401이 아닌 경우 retry를 중지합니다.
  // if (retryCount === DEFAULT_API_RETRY_LIMIT - 1) {
  //   await UserService.onLoginDurationExpired(); // access token을 2번 가져와도 실패한다면, 토큰 만료 로그아웃 시킵니다.
  //   return ky.stop;
  // }
  // await UserService.getAccessTokenByRefreshToken(); // refresh token을 이용하여 access token을 가져옵니다.
};

const handleUnauthorized = async () => {};

export { setAuthorizationHeader, handleToken, parseErrorResponse, handleUnauthorized };
