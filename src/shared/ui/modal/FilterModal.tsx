'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Button, CheckBox } from '../button';
import { ActiveChip } from '../chip';
import { Filters } from '@/views/driver/my/requests/DriverEstimateRequestPage';

type FilterModalProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onClose: () => void;
};

const MOVING_TYPE_LABEL: Record<'small' | 'home' | 'office', string> = {
  small: '소형 이사',
  home: '가정 이사',
  office: '사무실 이사',
};

const FilterModal = ({ filters, setFilters, onClose }: FilterModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 md:items-center"
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-2xl bg-white p-6 md:h-[420px] md:w-[375px] md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2lg font-bold text-[var(--color-black-500)]">필터</h2>
          <button type="button" aria-label="닫기" onClick={onClose}>
            <Image src="/icons/x.svg" alt="X icon" width={24} height={24} />
          </button>
        </div>

        <div className="mb-7 flex flex-col gap-2">
          <h3 className="mt-4 text-lg font-semibold text-[var(--color-black-500)]">이사 유형</h3>
          {/* 이사 유형 */}
          <div className="flex gap-2">
            {(['small', 'home', 'office'] as const).map((type) => (
              <ActiveChip
                key={type}
                text={MOVING_TYPE_LABEL[type]}
                isActive={filters.movingTypes.includes(type)}
                setIsActive={() =>
                  setFilters((prev) => ({
                    ...prev,
                    movingTypes: prev.movingTypes.includes(type)
                      ? prev.movingTypes.filter((t) => t !== type)
                      : [...prev.movingTypes, type],
                  }))
                }
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-[var(--color-black-500)]">지역 및 견적</h3>
          {/* 체크박스 */}
          <div className="mb-6 flex flex-col gap-3">
            <div className="flex gap-2">
              <CheckBox
                checked={filters.onlyDesignated}
                onChange={(checked) => setFilters((prev) => ({ ...prev, onlyDesignated: checked }))}
              />
              지정 견적 요청
            </div>
            <div className="flex gap-2">
              <CheckBox
                checked={filters.onlyServiceable}
                onChange={(checked) =>
                  setFilters((prev) => ({ ...prev, onlyServiceable: checked }))
                }
              />
              서비스 가능 지역
            </div>
          </div>
        </div>

        <div className="md:my-8">
          {/* 조회 버튼 */}
          <Button size="lg" onClick={onClose}>
            조회하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
