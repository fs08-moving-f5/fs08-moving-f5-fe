/**
 * 이메일 인증 관련 상수
 * - 로그인 페이지 토스트 메시지
 * - 쿼리 파라미터 값
 */

export const EMAIL_VERIFICATION_MESSAGES = {
  SENT: '이메일 인증이 필요합니다. 인증 이메일을 전송했습니다. 이메일을 확인해주세요.',
  VERIFIED: '이메일 인증이 완료되었습니다.',
} as const;

export const EMAIL_VERIFICATION_QUERY = {
  KEY: 'emailVerification',
  SENT: 'sent',
  VERIFIED: 'verified',
} as const;

// 기존 코드 호환용 named export
export const EMAIL_VERIFICATION_EMAIL_SENT_MESSAGE = EMAIL_VERIFICATION_MESSAGES.SENT;
export const EMAIL_VERIFICATION_SUCCESS_MESSAGE = EMAIL_VERIFICATION_MESSAGES.VERIFIED;
