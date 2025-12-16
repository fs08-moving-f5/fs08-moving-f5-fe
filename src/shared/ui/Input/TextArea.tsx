'use client';
import React from 'react';

interface TextAreaProps {
  name?: string;
  value?: string;
  errMsg?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  size?: 'sm' | 'md';
}

export default function TextArea({
  name = '',
  value = '',
  errMsg = value && value.length < 10 ? '10자 이상 입력해주세요' : '',
  placeholder = '최소 10자 이상 입력해주세요',
  onChange,
  size = 'md',
}: TextAreaProps) {
  const boxSize = {
    sm: 'h-[160px] min-w-0 w-full max-w-[327px] pl-[16px] pr-[12px] py-[14px]',
    md: 'h-[160px] min-w-0 w-full max-w-[560px] pl-[24px] pr-[14px] py-[12px]',
  };
  const borderType = {
    default: 'outline-none border border-[var(--color-line-200)]',
    error: 'outline-none border border-[var(--color-error)]',
  };
  const text = `text-[18px] font-[400] text-[var(--color-black-400)] plaseholder-[var(--color-gray-400, #999)]`;
  const scrollbar = 'overflow-y-auto resize-none textAreaScroll';
  //'overflow-y-auto resize-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100';
  const inputStyle = `${text} ${scrollbar}`;

  return (
    <div className="flex flex-col gap-[4px]">
      <div
        className={`flex h-[54px] w-fit items-center justify-start rounded-[16px] bg-[#fff] ${boxSize[size]} ${borderType[errMsg ? 'error' : 'default']}`}
      >
        <textarea
          rows={4}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`flex h-full w-full outline-none ${inputStyle}`}
        />
      </div>
      {errMsg && (
        <div className="h-[22px] px-[8px]">
          <span className="text-[13px] font-[500] text-[var(--color-error)]">{errMsg}</span>
        </div>
      )}
    </div>
  );
}
