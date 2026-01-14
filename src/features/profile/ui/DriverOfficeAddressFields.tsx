'use client';

import { useState } from 'react';
import Image from 'next/image';
import DaumPostcode, { Address } from '@/features/estimateRequest/ui/DaumPostCode';
import { AddressParams } from '@/features/estimateRequest/types/type';

const ic_x = '/icons/x.svg';

interface DriverOfficeAddressFieldsProps {
  address?: AddressParams;
  setAddress: (address: AddressParams) => void;
}

export default function DriverOfficeAddressFields({
  address,
  setAddress,
}: DriverOfficeAddressFieldsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const completeHandler = (data: Address) => {
    const { zonecode, address, addressEnglish, sido, sidoEnglish, sigungu, sigunguEnglish } = data;
    setAddress({
      zoneCode: zonecode,
      address,
      addressEnglish,
      sido,
      sidoEnglish,
      sigungu,
      sigunguEnglish,
    });
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

  return (
    <div className="mobile:mb-8 mb-10">
      <label className="mobile:text-xl mb-4 block text-2xl font-bold">사무실 주소</label>
      <div className="flex w-full min-w-0 flex-col gap-[4px]">
        <div className="relative flex h-[54px] w-full items-center">
          <button
            type="button"
            onClick={toggleHandler}
            aria-label="사무실 주소 입력하기"
            className={`flex h-full w-full items-center justify-start rounded-[16px] border bg-[#fff] px-[14px] py-[14px] text-left transition-colors ${
              address
                ? 'border-[var(--color-line-200)] text-[var(--color-black-400)]'
                : 'border-[var(--color-line-200)] text-[var(--color-gray-400)]'
            } hover:border-[var(--color-primary-orange-400)] focus:border-[var(--color-primary-orange-400)] focus:shadow-[0_4px_4px_-1px_rgba(249,80,46,0.20),0_4px_4px_-1px_rgba(249,80,46,0.10)] focus:outline-none`}
          >
            <span className={`truncate text-[18px] font-[400] ${address ? '' : ''}`}>
              {address ? address.address : '사무실 주소를 선택해주세요'}
            </span>
          </button>
        </div>
        {address && (
          <div className="flex justify-end px-[8px]">
            <button
              type="button"
              onClick={toggleHandler}
              className="cursor-pointer text-[12px] leading-[24px] font-[500] text-[var(--color-black-100)] underline transition-colors hover:text-[var(--color-primary-orange-400)]"
            >
              수정하기
            </button>
          </div>
        )}
      </div>
      <p className="mt-2 text-right text-sm text-gray-400">
        사무실 주소를 기준으로 근처 견적을 추천해드립니다
      </p>

      {/* 주소 검색 모달 */}
      <div
        className={`fixed inset-0 z-30 bg-[#00000080] transition-opacity select-none ${
          isOpen ? 'block opacity-100' : 'hidden opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      >
        {isOpen && (
          <div
            className="mobile:w-[400px] fixed top-1/2 left-1/2 flex h-fit max-h-[95vh] w-[600px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 flex-col gap-[8px] overflow-hidden rounded-[16px] border border-[var(--color-grayScale-200)] bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile:px-[16px] mobile:py-[24px] flex items-center justify-between border-b border-[var(--color-grayScale-400)] px-[24px] py-[32px]">
              <span className="mobile:text-[18px] mobile:font-[700] text-[24px] font-[600] text-[var(--color-black-400)]">
                사무실 주소를 선택해주세요
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
                aria-label="닫기"
              >
                <Image
                  src={ic_x}
                  alt="닫기"
                  width={36}
                  height={36}
                  className="mobile:w-[24px] mobile:h-[24px] h-[36px] w-[36px]"
                />
              </button>
            </div>
            <div className="overflow-hidden">
              <DaumPostcode onComplete={completeHandler} onClose={closeHandler} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
