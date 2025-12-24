import { SignupFormData, SignupFormErrors } from '../types/types';
import {
  SIGNUP_ERROR_MESSAGES,
  VALIDATION_PATTERNS,
  VALIDATION_RULES,
} from './signupValidation.constants';

// 이름 검증
export const validateName = (name: string): string => {
  if (!name.trim()) {
    return SIGNUP_ERROR_MESSAGES.NAME.REQUIRED;
  }
  if (name.trim().length < VALIDATION_RULES.NAME_MIN_LENGTH) {
    return SIGNUP_ERROR_MESSAGES.NAME.MIN_LENGTH;
  }
  return '';
};

// 이메일 검증
export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return SIGNUP_ERROR_MESSAGES.EMAIL.REQUIRED;
  }
  if (!VALIDATION_PATTERNS.EMAIL.test(email)) {
    return SIGNUP_ERROR_MESSAGES.EMAIL.INVALID_FORMAT;
  }
  return '';
};

// 전화번호 검증
export const validatePhone = (phone: string): string => {
  if (!phone.trim()) {
    return SIGNUP_ERROR_MESSAGES.PHONE.REQUIRED;
  }

  if (/[^0-9-]/.test(phone)) {
    return SIGNUP_ERROR_MESSAGES.PHONE.INVALID_CHARACTERS;
  }

  const cleanPhone = phone.replace(/-/g, '');
  if (!VALIDATION_PATTERNS.PHONE.test(cleanPhone)) {
    return SIGNUP_ERROR_MESSAGES.PHONE.INVALID_FORMAT;
  }
  return '';
};

// 비밀번호 검증
export const validatePassword = (password: string): string => {
  if (!password) {
    return SIGNUP_ERROR_MESSAGES.PASSWORD.REQUIRED;
  }
  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    return SIGNUP_ERROR_MESSAGES.PASSWORD.MIN_LENGTH;
  }
  if (!VALIDATION_PATTERNS.PASSWORD_LETTER.test(password)) {
    return SIGNUP_ERROR_MESSAGES.PASSWORD.MISSING_LETTER;
  }
  if (!VALIDATION_PATTERNS.PASSWORD_NUMBER.test(password)) {
    return SIGNUP_ERROR_MESSAGES.PASSWORD.MISSING_NUMBER;
  }
  if (!VALIDATION_PATTERNS.PASSWORD_SPECIAL.test(password)) {
    return SIGNUP_ERROR_MESSAGES.PASSWORD.MISSING_SPECIAL;
  }
  return '';
};

// 비밀번호 확인 검증
export const validatePasswordConfirm = (password: string, passwordConfirm: string): string => {
  if (!passwordConfirm) {
    return SIGNUP_ERROR_MESSAGES.PASSWORD_CONFIRM.REQUIRED;
  }
  if (password !== passwordConfirm) {
    return SIGNUP_ERROR_MESSAGES.PASSWORD_CONFIRM.NOT_MATCH;
  }
  return '';
};

// 입력시 실시간 검증
export const validateFieldOnChange = (
  fieldName: keyof SignupFormData,
  value: string,
  formData?: SignupFormData,
): string => {
  switch (fieldName) {
    case 'name':
      return validateName(value);
    case 'email':
      return validateEmail(value);
    case 'phone':
      return validatePhone(value);
    case 'password':
      return validatePassword(value);
    case 'passwordConfirm':
      return validatePasswordConfirm(formData?.password || '', value);
    default:
      return '';
  }
};

// 제출시 검증
export const validateSignupFormOnSubmit = (formData: SignupFormData): SignupFormErrors => {
  return {
    name: validateName(formData.name),
    email: validateEmail(formData.email),
    phone: validatePhone(formData.phone),
    password: validatePassword(formData.password),
    passwordConfirm: validatePasswordConfirm(formData.password, formData.passwordConfirm),
  };
};

// 전체 폼 유효성 검사
export const isFormValid = (formData: SignupFormData): boolean => {
  return (
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.password !== '' &&
    formData.passwordConfirm !== '' &&
    formData.password === formData.passwordConfirm
  );
};
