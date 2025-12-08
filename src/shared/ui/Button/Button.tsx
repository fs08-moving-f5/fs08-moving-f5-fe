'use client';

import React from 'react';
import Image from 'next/image';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outlined';
  design?: 'primary' | 'secondary';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs';
  disabled?: boolean;
  isWriting?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  variant = 'solid',
  design = 'primary',
  size = 'xl',
  isWriting = false,
  disabled = false,
  onClick,
  ...props
}: ButtonProps) => {
  const baseStyles = `
    flex justify-center items-center rounded-[16px] font-semibold leading-[26px] transition cursor-pointer
  `;

  const getSizeClasses = () => {
    switch (size) {
      case 'xl':
        return 'max-w-[640px] min-h-[60px] text-[18px]';
      case 'lg':
        return 'max-w-[500px] min-h-[60px] text-[18px]';
      case 'md':
        return 'max-w-[320px] min-h-[64px] text-[16px]';
      case 'sm':
        return 'max-w-[254px] min-h-[54px] text-[16px]';
      case 'xs':
        return 'max-w-[200px] min-h-[60px] text-[18px]';
      case '2xs':
        return 'max-w-[180px] min-h-[64px] text-[18px]';
      default:
        return 'max-w-[640px] min-h-[60px] text-[18px]';
    }
  };

  const solidStyles = () => {
    if (disabled) {
      return `
        bg-[var(--color-grayScale-300)]
        text-[var(--color-bg-100)]
      `;
    }

    switch (design) {
      case 'primary':
        return `
          bg-[var(--color-primary-orange-400)]
          text-[var(--color-bg-100)]
        `;
      case 'secondary':
        return `
          bg-[var(--color-primary-orange-500)]
          text-[var(--color-bg-100)]
        `;
      default:
        return `
        bg-[var(--color-primary-orange-400)]
          text-[var(--color-bg-100)]
          `;
    }
  };

  const outlinedStyles = () => {
    if (disabled) {
      return `
        border border-[var(--color-grayScale-200)]
        text-[var(--color-grayScale-300)]

      `;
    }

    switch (design) {
      case 'primary':
        return `
          border border-[var(--color-primary-orange-400)]
          text-[var(--color-primary-orange-400)]
        `;
      case 'secondary':
        return `
          border border-[var(--color-primary-orange-400)]
          bg-[var(--color-primary-orange-100)]
          text-[var(--color-primary-orange-400)]
          hover:bg-[var(--color-primary-orange-200)]
        `;
      default:
        return `
        border border-[var(--color-primary-orange-400)]
        text-[var(--color-primary-orange-400)]

      `;
    }
  };

  const variantClasses = variant === 'solid' ? solidStyles() : outlinedStyles();

  return (
    <button
      disabled={disabled}
      className={` ${baseStyles} ${getSizeClasses()} ${variantClasses} ${disabled ? 'opacity-60' : 'hover:opacity-90'} `}
      onClick={onClick}
      {...props}
    >
      <span>{children}</span>
      {isWriting && (
        <Image
          src="/icons/writing.svg"
          alt="writing icon"
          width={24}
          height={24}
          className="ml-[6px]"
        />
      )}
    </button>
  );
};

export default Button;
