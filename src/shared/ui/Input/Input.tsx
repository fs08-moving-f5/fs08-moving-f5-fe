'use client';
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';

//public 경로 기반
const eyeVisible = '/icons/Input/eye-visible.svg';
const eyeInvisible = '/icons/Input/eye-invisible.svg';

interface InputProps {
  name?: string;
  value?: string;
  errMsg?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'number';
  focusOn?: boolean;
}

export default function Input({
  name = '',
  value = '',
  errMsg = '',
  placeholder = '',
  onChange,
  type = 'text',
  focusOn = true,
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const handleClickEye = () => {
    setIsVisible(!isVisible);
  };

  const width = 'min-w-0 w-full w-[640px]';
  const borderType = {
    default: `outline-none border border-[var(--color-line-200)] ${focusOn && 'focus:border-[var(--color-primary-orange-400)]'}`,
    error: 'outline-none border border-[var(--color-error)]',
  };
  const shadow =
    focusOn &&
    'focus:shadow-[0_4px_4px_-1px_rgba(249,80,46,0.20),0_4px_4px_-1px_rgba(249,80,46,0.10)]';
  const text = `text-[18px] font-[400] text-[var(--color-black-400)] plaseholder-[var(--color-gray-400, #999)]`;
  const inputStyle = `${borderType[errMsg ? 'error' : 'default']} ${shadow} ${text}`;

  return (
    <div className={`flex flex-col gap-[4px] ${width}`}>
      <div className={`relative flex h-[54px] w-full items-center justify-start`}>
        <input
          name={name}
          type={type === 'password' ? (isVisible ? 'text' : 'password') : type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`flex h-full w-full rounded-[16px] bg-[#fff] p-[14px] ${inputStyle}`}
        />
        {type === 'password' && (
          <button
            onClick={handleClickEye}
            className="absolute right-[14px] h-[24px] w-[24px] cursor-pointer"
          >
            <Image
              src={isVisible ? eyeVisible : eyeInvisible}
              alt="eyeIcon"
              width={24}
              height={24}
              className="hover:brightness-50"
            />
          </button>
        )}
      </div>
      {errMsg && (
        <div className="h-[22px] px-[8px]">
          <span className="text-[13px] font-[500] text-[var(--color-error)]">{errMsg}</span>
        </div>
      )}
    </div>
  );
}
