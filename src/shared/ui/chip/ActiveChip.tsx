'use client';

import clsx from 'clsx';

interface ActiveChipProps {
  text: string;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

const ActiveChip = ({ text, isActive, setIsActive }: ActiveChipProps) => {
  const defaultStyle =
    'flex items-center justify-center py-[10px] px-5 rounded-[100px] text-2lg font-medium tab:py-[6px] tab:px-3 tab:text-md mobile:py-[6px] mobile:px-3 mobile:text-sm';
  const activeStyle =
    'border border-solid border-primary-orange-400 bg-primary-orange-100 text-primary-orange-400';
  const inactiveStyle = 'border border-solid border-gray-100 bg-bg-100 text-black-400';

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      type="button"
      className={clsx(defaultStyle, isActive ? activeStyle : inactiveStyle, 'cursor-pointer')}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default ActiveChip;
