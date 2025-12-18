'use client';

import React from 'react';
import Link from 'next/link';
import Input from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button';
import { useSignupForm } from '../hooks/useSignupForm';
import { SignupFormData } from '../types/types';

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const { formData, errors, handleChange, validateForm, isValid } = useSignupForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 mobile:space-y-4">
        {/* 이름 */}
        <div>
          <label className="mb-2 block text-lg text-[var(--color-black-400)] mobile:text-md">
            이름
          </label>
          <Input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="성함을 입력해 주세요"
            errMsg={errors.name}
          />
        </div>

        {/* 이메일 */}
        <div>
          <label className="mb-2 block text-lg text-[var(--color-black-400)] mobile:text-md">
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

        {/* 전화번호 */}
        <div>
          <label className="mb-2 block text-lg text-[var(--color-black-400)] mobile:text-md">
            전화번호
          </label>
          <Input
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            placeholder="숫자만 입력해 주세요"
            errMsg={errors.phone}
          />
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="mb-2 block text-lg text-[var(--color-black-400)] mobile:text-md">
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

        {/* 비밀번호 확인 */}
        <div>
          <label className="mb-2 block text-lg text-[var(--color-black-400)] mobile:text-md">
            비밀번호 확인
          </label>
          <Input
            name="passwordConfirm"
            type="password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            placeholder="비밀번호를 다시 한번 입력해 주세요"
            errMsg={errors.passwordConfirm}
          />
        </div>

        {/* 시작하기 버튼 */}
        <div className="pt-4 w-full">
          <Button
            type="submit"
            size="xl"
            variant="solid"
            design="primary"
            disabled={!isValid}
          >
            시작하기
          </Button>
        </div>
      </form>

      {/* 로그인 링크 */}
      <div className="mt-6 text-center text-md text-[var(--color-black-300)] mobile:text-sm">
        이미 무빙 회원이신가요?{' '}
        <Link 
          href="/login" 
          className="font-semibold text-[var(--color-primary-orange-400)] hover:text-[var(--color-primary-orange-500)]"
        >
          로그인
        </Link>
      </div>
    </>
  );
}
