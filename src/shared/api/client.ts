import ky from 'ky';

const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30 * 1000, // 응답대기 30초
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
