'use client';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
const searchIcon_sm = '/icons/SearchBar/ic_search_sm.svg';
const searchIcon_md = '/icons/SearchBar/ic_search_md.svg';
const deleteIcon_sm = '/icons/SearchBar/ic_x_circle_sm.svg';
const deleteIcon_md = '/icons/SearchBar/ic_x_circle_md.svg';

interface SerarchBarProps {
  widthFull?: boolean;
  onSubmit: (value: string) => void;
}

export default function SearchBar({ widthFull = false, onSubmit }: SerarchBarProps) {
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setValue('');
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value.trim());
  };

  const divSize = `mobile:h-[52px] min-w-0 w-full h-[64px] ${widthFull ? 'w-full' : 'mobile:max-w-[260px] max-w-[560px]'}`;
  const inputSize =
    'h-full w-full mobile:pl-[46px] mobile:pr-[16px] mobile:py-[14px] mobile:group-focus-within:pl-[16px] mobile:group-focus-within:pr-[76px] pl-[68px] pr-[24px] py-[14px] group-focus-within:pl-[24px] group-focus-within:pr-[112px]';
  const borderType = 'outline-none border-none';
  const textSize = 'mobile:text-[14px] text-[18px]';
  const text = `${textSize} font-[400] text-[var(--color-black-400)] plaseholder-[var(--color-gray-400, #999)]`;
  const inputStyle = `${inputSize} ${borderType} ${text}`;
  const IconTranformL = 'mobile:left-[16px] left-[24px]';
  const IconTranformR = 'mobile:right-[16px] right-[24px]';
  const IconSize = 'mobile:h-[24px] mobile:w-[24px] h-[36px] w-[36px]';
  const IconGap = 'mobile:g-[6px] g-[8px]';

  return (
    <form
      onSubmit={handleSubmit}
      className={`group relative flex h-fit w-fit items-center justify-start ${divSize}`}
    >
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="텍스트를 입력해주세요."
        className={`group-focus flex rounded-[16px] bg-[var(--color-bg-200)] p-[14px] ${inputStyle}`}
      />
      <div className={`absolute block group-focus-within:hidden ${IconSize} ${IconTranformL}`}>
        <Image
          src={searchIcon_sm}
          alt="serchIcon"
          width={36}
          height={36}
          className="mobile:block hidden"
        />
        <Image
          src={searchIcon_md}
          alt="serchIcon"
          width={36}
          height={36}
          className="mobile:hidden"
        />
      </div>
      <div className={`absolute hidden group-focus-within:flex ${IconGap} ${IconTranformR}`}>
        <button type="button" onClick={handleDelete} className={`flex cursor-pointer ${IconSize}`}>
          <Image
            src={deleteIcon_sm}
            alt="deleteIcon"
            width={36}
            height={36}
            className={`mobile:block hidden hover:brightness-95 ${IconSize}`}
          />
          <Image
            src={deleteIcon_md}
            alt="deleteIcon"
            width={36}
            height={36}
            className={`mobile:hidden hover:brightness-95 ${IconSize}`}
          />
        </button>
        <button type="submit" className={`flex cursor-pointer ${IconSize}`}>
          <Image
            src={searchIcon_sm}
            alt="serchIcon"
            width={36}
            height={36}
            className={`mobile:block hidden hover:brightness-80 ${IconSize}`}
          />
          <Image
            src={searchIcon_md}
            alt="serchIcon"
            width={36}
            height={36}
            className={`mobile:hidden hover:brightness-80 ${IconSize}`}
          />
        </button>
      </div>
    </form>
  );
}
