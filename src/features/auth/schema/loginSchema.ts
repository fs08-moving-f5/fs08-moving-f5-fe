import { LoginFormData } from '../types/types';
import { LOGIN_ERROR_MESSAGES, LOGIN_VALIDATION_PATTERNS } from './loginValidation.constants';

// 로그인 폼 에러
export interface LoginFormErrors {
  email: string;
  password: string;
}

// 이메일 검증
export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return LOGIN_ERROR_MESSAGES.EMAIL.REQUIRED;
  }
  if (!LOGIN_VALIDATION_PATTERNS.EMAIL.test(email)) {
    return LOGIN_ERROR_MESSAGES.EMAIL.INVALID_FORMAT;
  }
  return '';
};

// 비밀번호 검증
export const validatePassword = (password: string): string => {
  if (!password) {
    return LOGIN_ERROR_MESSAGES.PASSWORD.REQUIRED;
  }
  return '';
};

// 입력시 실시간 검증
export const validateFieldOnChange = (fieldName: keyof LoginFormData, value: string): string => {
  switch (fieldName) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    default:
      return '';
  }
};

// 제출시 검증
export const validateLoginFormOnSubmit = (formData: LoginFormData): LoginFormErrors => {
  return {
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };
};

// 전체 폼 유효성 검사
export const isFormValid = (formData: LoginFormData): boolean => {
  return formData.email.trim() !== '' && formData.password !== '';
};
