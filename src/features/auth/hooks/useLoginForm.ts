'use client';

import { useState } from 'react';
import {
  LoginFormErrors,
  validateFieldOnChange,
  validateLoginFormOnSubmit,
  isFormValid,
} from '../schema/loginSchema';

import type { LoginFormData } from '../types/types';

/**
 * 로그인 폼 상태 관리 훅
 * - 폼 입력값 관리
 * - 입력 시 실시간 검증
 * - 제출 시 상세 검증
 * - 에러 메시지 관리
 */
export function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginFormErrors>({
    email: '',
    password: '',
  });

  /**
   * 입력값 변경 핸들러 (실시간 간단한 검증)
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof LoginFormData;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 입력 시 간단한 검증
    const error = validateFieldOnChange(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  /**
   * 제출 시 전체 폼 상세 검증
   */
  const validateForm = (): boolean => {
    const newErrors = validateLoginFormOnSubmit(formData);
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  /**
   * 폼 초기화
   */
  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
    });
    setErrors({
      email: '',
      password: '',
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
}
