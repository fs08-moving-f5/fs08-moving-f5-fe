'use client';

import Image from 'next/image';

interface CheckBoxProps {
  shape?: 'square' | 'circle';
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBox = ({ shape = 'square', checked, onChange }: CheckBoxProps) => {
  const bgColor = checked ? 'bg-[var(--color-primary-orange-400)]' : 'bg-transparent';

  const borderColor = checked
    ? 'border-[var(--color-primary-orange-400)]'
    : 'border-[var(--color-grayScale-200)]';

  const wrapperSize = shape === 'circle' ? 'w-[24px] h-[24px]' : 'w-[24px] h-[24px]';

  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-[8px]';

  const iconSize = shape === 'circle' ? { width: 10, height: 5 } : { width: 12, height: 6 };

  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center justify-center border ${borderColor} ${bgColor} ${wrapperSize} ${radius} cursor-pointer shadow-md transition`}
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
