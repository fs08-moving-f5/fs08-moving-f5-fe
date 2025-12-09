'use client';
import React from 'react';
import Image from 'next/image';
import searhIcon_sm from './ic_search_sm.svg';
import searhIcon_md from './ic_search_md.svg';
import deleteIcon_sm from './ic_x_circle_sm.svg';
import deleteIcon_md from './ic_x_circle_md.svg';
import { useState } from 'react';

interface SerarchBarProps {
  size?: 'sm' | 'md';
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchBar({ size = 'md', onSubmit }: SerarchBarProps) {
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setValue('');
  };
  const divSize = {
    sm: 'h-[52px] min-w-0 w-full max-w-[260px]',
    md: 'h-[64px] min-w-0 w-full max-w-[560px]',
  };
  const inputSize = {
    sm: 'h-full w-full pl-[46px] pr-[16px] py-[14px] group-focus-within:pl-[16px] group-focus-within:pr-[76px]',
    md: 'h-full w-full pl-[68px] pr-[24px] py-[14px] group-focus-within:pl-[24px] group-focus-within:pr-[112px]',
  };
  const borderType = 'outline-none border-none';
  const textSize = {
    sm: 'text-[14px]',
    md: 'text-[18px]',
  };
  const text = `${textSize[size]} font-[400] text-[var(--color-black-400)] plaseholder-[var(--color-gray-400, #999)]`;
  const inputStyle = `${inputSize[size]} ${borderType} ${text}`;
  const IconTranformR = {
    sm: 'right-[16px]',
    md: 'right-[24px]',
  };
  const IconSize = {
    sm: 'h-[24px] w-[24px]',
    md: 'h-[36px] w-[36px]',
  };
  const IconGap = {
    sm: 'g-[6px]',
    md: 'g-[8px]',
  };
  const searchIcon = {
    sm: searhIcon_sm,
    md: searhIcon_md,
  };
  const deleteIcon = {
    sm: deleteIcon_sm,
    md: deleteIcon_md,
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`group relative flex h-fit w-fit items-center justify-start ${divSize[size]}`}
    >
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="텍스트를 입력해주세요."
        className={`group-focus flex rounded-[16px] bg-[var(--color-bg-200)] p-[14px] ${inputStyle}`}
      />
      <Image
        src={searchIcon[size]}
        alt="serchIcon"
        className={`absolute left-[24px] block group-focus-within:hidden ${IconSize[size]}`}
      />
      <div
        className={`absolute hidden group-focus-within:flex ${IconGap[size]} ${IconTranformR[size]}`}
      >
        <button
          type="button"
          onClick={handleDelete}
          className={`flex h-fit w-fit cursor-pointer ${IconSize[size]}`}
        >
          <Image
            src={deleteIcon[size]}
            alt="deleteIcon"
            className={`hover:brightness-95 ${IconSize[size]}`}
          />
        </button>
        <button type="submit" className={`flex h-fit w-fit cursor-pointer ${IconSize[size]}`}>
          <Image
            src={searchIcon[size]}
            alt="serchIcon"
            className={`hover:brightness-80 ${IconSize[size]}`}
          />
        </button>
      </div>
    </form>
  );
}
