'use client';

import { Button } from '@/shared/ui/Button';
import { ReactNode, useState } from 'react';
import Image from 'next/image';
import DaumPostcode, { Address } from './DaumPostCode';
const ic_x = '/icons/x.svg';

export interface AddressParams {
  zonecode: string;
  address: string;
  addressEnglish: string;
  sido: string;
  sidoEnglish: string;
  sigungu: string;
  sigunguEnglish: string;
}

interface AddressButtonProps {
  type: 'from' | 'to';
  address?: AddressParams;
  setAddress: (address: AddressParams) => void;
}

export default function AddressButton({ type, address, setAddress }: AddressButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const style = {
    width: '100%',
    height: '500px',
  };

  const completeHandler = (data: Address) => {
    const { zonecode, address, addressEnglish, sido, sidoEnglish, sigungu, sigunguEnglish } = data;
    setAddress({ zonecode, address, addressEnglish, sido, sidoEnglish, sigungu, sigunguEnglish });
  };

  const closeHandler = (state: 'FORCE_CLOSE' | 'COMPLETE_CLOSE') => {
    if (state === 'FORCE_CLOSE') {
      setIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
    }
  };

  const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };

  const typeName = {
    from: '출발지',
    to: '도착지',
  };

  return (
    <div className="relative h-fit w-fit">
      <div className="mobile:w-[327px] tab:w-[400px] relative flex w-[252px] flex-col gap-[8px]">
        <div className="flex flex-col gap-[12px]">
          <label className="text-[16px] leading-[26px] font-[500]">{typeName[type]}</label>
          <Button size="sm" variant="outlined" design="primary" onClick={toggleHandler}>
            <div className="h-full w-full px-[24px] py-[16px]">
              <p className="truncate">{address ? address.address : `${typeName[type]} 선택하기`}</p>
            </div>
          </Button>
        </div>
        {address && (
          <div className="flex justify-end">
            <button
              onClick={toggleHandler}
              className="font-500 cursor-pointer text-[12px] leading-[24px] text-[var(--color-black-100)] underline"
            >
              수정하기
            </button>
          </div>
        )}
      </div>
      <div
        className={`fixed top-0 left-0 z-30 h-[100vh] w-[100vw] bg-[#00000080] select-none ${isOpen ? 'block' : 'hidden'}`}
      >
        {isOpen && (
          <div className="mobile:w-[400px] fixed top-1/2 left-1/2 flex h-fit max-h-[95%] w-[600px] max-w-[95%] -translate-x-1/2 -translate-y-1/2 flex-col gap-[8px] overflow-hidden rounded-[16px] border border-[var(--color-grayScale-200)] bg-white">
            <div className="mobile:px-[16px] mobile:py-[24px] flex justify-between border-b border-[var(--color-grayScale-400)] px-[24px] py-[32px]">
              <span className="mobile:text-[18px] mobile:font-[700] text-[24px] font-[600]">
                {`${typeName[type]}를 선택해주세요`}
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
            <DaumPostcode onComplete={completeHandler} onClose={closeHandler} />
          </div>
        )}
      </div>
    </div>
  );
}
