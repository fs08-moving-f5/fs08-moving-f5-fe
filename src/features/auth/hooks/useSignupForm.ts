'use client';

import { useState } from 'react';
import {
  validateFieldOnChange,
  validateSignupFormOnSubmit,
  isFormValid,
} from '../schema/signupSchema';

import type { SignupFormData, SignupFormErrors } from '../types/types';

/**
 * 회원가입 폼 상태 관리 훅
 * - 폼 입력값 관리
 * - 입력 시 실시간 검증 (간단한 검증)
 * - 제출 시 상세 검증
 * - 에러 메시지 관리
 */
export const useSignupForm = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState<SignupFormErrors>({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  });

  /**
   * 입력값 변경 핸들러 (실시간 간단한 검증)
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof SignupFormData;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 입력 시 간단한 검증 (필수 입력 체크 정도)
    const error = validateFieldOnChange(fieldName, value, formData);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  /**
   * 제출 시 전체 폼 상세 검증
   */
  const validateForm = (): boolean => {
    const newErrors = validateSignupFormOnSubmit(formData);
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  /**
   * 폼 초기화
   */
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirm: '',
    });
    setErrors({
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirm: '',
    });
  };

  return {
    formData,
    errors,
    handleChange,
    validateForm,
    resetForm,
    isValid: isFormValid(formData),
  };
};
