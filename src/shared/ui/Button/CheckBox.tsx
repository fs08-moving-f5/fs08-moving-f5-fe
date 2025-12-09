'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface CheckBoxProps {
  shape?: 'square' | 'circle';
}

const CheckBox = ({ shape = 'square' }: CheckBoxProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  const toggle = () => {
    setChecked((prev) => !prev);
  };

  const bgColor = checked ? 'bg-[var(--color-primary-orange-400)]' : 'bg-transparent';

  const borderColor = checked
    ? 'border-[var(--color-primary-orange-400)]'
    : 'border-[var(--color-grayScale-200)]';

  const wrapperSize = shape === 'circle' ? 'w-[24px] h-[24px]' : 'w-[28px] h-[28px]';

  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-[8px]';

  const iconSize = shape === 'circle' ? { width: 10, height: 5 } : { width: 15, height: 6 };

  return (
    <button
      onClick={toggle}
      className={`flex items-center justify-center border ${borderColor} ${bgColor} ${wrapperSize} ${radius} cursor-pointer transition`}
    >
      {checked && (
        <Image
          src="/icons/check.svg"
          alt="check icon"
          width={iconSize.width}
          height={iconSize.height}
        />
      )}
    </button>
  );
};

export default CheckBox;
