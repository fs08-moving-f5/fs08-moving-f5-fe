'use client';

import React from 'react';
import Link from 'next/link';
import Input from '@/shared/ui/input/Input';
import Button from '@/shared/ui/button/Button';
import { useLoginForm } from '../hooks/useLoginForm';
import { LoginFormData } from '../types/types';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const { formData, errors, handleChange, validateForm, isValid } = useLoginForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mobile:space-y-4 space-y-6">
        {/* 이메일 */}
        <div>
          <label className="mobile:text-md mb-2 block text-lg text-[var(--color-black-400)]">
            이메일
          </label>
          <Input
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력해 주세요"
            errMsg={errors.email}
          />
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="mobile:text-md mb-2 block text-lg text-[var(--color-black-400)]">
            비밀번호
          </label>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해 주세요"
            errMsg={errors.password}
          />
        </div>

        {/* 로그인 버튼 */}
        <Button
          type="submit"
          variant="solid"
          design="primary"
          size="xl"
          disabled={!isValid || isLoading}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>
      </form>

      {/* 회원가입 링크 */}
      <div className="mobile:text-md mt-6 text-center text-lg">
        <span className="text-[var(--color-black-200)]">아직 회원이 아니신가요? </span>
        <Link href="/signup/user" className="font-semibold text-[var(--color-primary-orange-300)]">
          회원가입
        </Link>
      </div>
    </>
  );
}
