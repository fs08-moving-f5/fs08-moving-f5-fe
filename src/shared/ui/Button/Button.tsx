'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outlined';
  design?: 'primary' | 'secondary';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs';
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  variant = 'solid',
  design = 'primary',
  size = 'xl',
  disabled = false,
  onClick,
  ...props
}: ButtonProps) => {
  const baseStyles = `
    flex justify-center items-center rounded-[16px] font-semibold leading-[26px] transition
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
        return '';
    }
  };

  const solidStyles = () => {
    if (disabled) {
      return `
        bg-[var(--color-grayScale-300)]
        text-[var(--color-grayScale-50)]
      `;
    }

    if (design === 'primary') {
      return `
        bg-[var(--color-primary-orange-400)]
        text-[var(--color-bg-100)]
        hover:bg-[var(--color-primary-orange-500)]
      `;
    }

    if (design === 'secondary') {
      return `
        bg-[var(--color-primary-orange-500)]
        text-[var(--color-bg-100)]
        hover:bg-[var(--color-primary-orange-400)]
      `;
    }

    return '';
  };

  const outlinedStyles = () => {
    if (disabled) {
      return `
        border border-[var(--color-grayScale-200)]
        text-[var(--color-grayScale-300)]
        bg-transparent
        shadow-[4px_4px_10px_rgba(195,217,242,0.20)]
      `;
    }

    if (design === 'primary') {
      return `
        border border-[var(--color-primary-orange-400)]
        text-[var(--color-primary-orange-400)]
        bg-transparent
        shadow-[4px_4px_10px_rgba(195,217,242,0.20)]
      `;
    }

    if (design === 'secondary') {
      return `
        border border-[var(--color-primary-orange-400)]
        bg-[var(--color-primary-orange-100)]
        text-[var(--color-primary-orange-400)]
        shadow-[4px_4px_10px_rgba(195,217,242,0.20)]
        hover:bg-[var(--color-primary-orange-200)]
      `;
    }

    return '';
  };

  const variantClasses = variant === 'solid' ? solidStyles() : outlinedStyles();

  return (
    <button
      disabled={disabled}
      className={` ${baseStyles} ${getSizeClasses()} ${variantClasses} ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:opacity-90'} `}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
