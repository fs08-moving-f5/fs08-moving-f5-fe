export const EMAIL_VERIFICATION = {
  REDIRECT_QUERY_KEY: 'emailVerify' as const,
  REDIRECT_QUERY_VALUE_SENT: 'sent' as const,

  OAUTH_ERROR_QUERY_KEY: 'oauthError' as const,
  OAUTH_ERROR_MESSAGE_KEY: 'message' as const,

  ERROR_NAME: 'EmailNotVerifiedError' as const,

  TOAST_MESSAGE_SENT: '인증 이메일을 전송했습니다. 메일함을 확인해주세요.',
  TOAST_MESSAGE_VERIFIED: '이메일 인증이 완료되었습니다.',
} as const;
