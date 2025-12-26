import { ReactNode } from 'react';
import Image from 'next/image';
import Button from '../button/Button';
const ic_x = '/icons/x.svg';

interface ModalConfirmProps {
  title: string;
  content: string | ReactNode;
  btnText: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClick?: () => void;
}
export default function ModalConfirm({
  title,
  content,
  btnText,
  isOpen,
  setIsOpen,
  onClick,
}: ModalConfirmProps) {
  return (
    <div
      className={`fixed top-0 left-0 z-30 h-full w-full bg-[#00000080] select-none ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className="mobile:p-[24px_16px] mobile:gap-[24px] fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-[40px] rounded-[16px] border border-[var(--color-grayScale-200)] bg-[var(--color-grayScale-50)] p-[32px_24px_40px_24px]">
        <div className="mobile:gap-[32px] flex flex-col gap-[40px]">
          <div className="flex justify-between">
            <span className="mobile:text-[18px] mobile:font-[700] text-[24px] font-[600]">
              {title}
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer hover:brightness-50"
            >
              <Image
                src={ic_x}
                alt="ic_close"
                width={36}
                height={36}
                className="mobile:w-[24px] mobile:h-[24px] h-[36px] w-[36px]"
              />
            </button>
          </div>
          <div className="text-[18px] font-[500]">{content}</div>
        </div>
        {onClick && (
          <div>
            <div className="mobile:hidden block h-fit w-[560px]">
              <Button size="xl" onClick={onClick}>
                {btnText}
              </Button>
            </div>
            <div className="mobile:block hidden h-fit w-[260px]">
              <Button size="sm" onClick={onClick}>
                {btnText}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
