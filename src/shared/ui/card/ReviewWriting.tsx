'use client';

import Image from 'next/image';
import { MovingTypeChip } from '@/shared/ui/chip';
import { StarSelect } from '@/shared/ui/star';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';

interface ReviewWritingProps {
  driverName: string;
  driverImageUrl?: string;
  movingType?: 'small' | 'home' | 'office';
  pickedDriver?: boolean;
  pickupAddress: string;
  dropoffAddress: string;
  movingDate: string;
  onSubmit: (rating: number, content: string) => void;
  onClose: () => void;
}

const ReviewWriting = ({
  driverName,
  driverImageUrl,
  movingType,
  pickedDriver = false,
  pickupAddress,
  dropoffAddress,
  movingDate,
  onSubmit,
  onClose,
}: ReviewWritingProps) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (rating > 0 && content.trim().length >= 10) {
      onSubmit(rating, content);
    }
  };

  const isSubmitDisabled = rating === 0 || content.trim().length < 10;

  return (
    <article className="mobile:px-5 mobile:py-6 tab:px-6 tab:py-7 flex w-full max-w-[600px] flex-col rounded-2xl bg-white px-10 py-8 shadow-md">
      {/* 헤더 */}
      <header className="mb-8 flex items-center justify-between">
        <h2 className="text-black-500 text-2xl font-bold">리뷰 쓰기</h2>
        <button
          onClick={onClose}
          aria-label="닫기"
          className="text-grayScale-500 hover:text-black-500 transition-colors"
        >
          <Image src="/icons/x.svg" alt="닫기" width={24} height={24} />
        </button>
      </header>

      {/* 칩 영역 */}
      <div className="mb-6 flex w-fit flex-row gap-2">
        {movingType && <MovingTypeChip movingType={movingType} />}
        {pickedDriver && <MovingTypeChip movingType="assign" />}
      </div>

      {/* 기사님 정보 */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Image src="/icons/name.svg" alt="기사님" width={20} height={20} />
          <h3 className="text-black-500 mobile:text-md tab:text-lg text-xl font-semibold">
            {driverName} 기사님
          </h3>
        </div>
        <figure className="mobile:h-12 mobile:w-12 tab:h-14 tab:w-14 h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
          <Image
            src={driverImageUrl || '/img/profile.png'}
            alt={`${driverName} 프로필`}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </figure>
      </div>

      <hr className="border-line-200 my-4 w-full" />

      {/* 이사 정보 */}
      <div className="mobile:text-sm tab:text-sm text-black-300 text-md tab:gap-6 mobile:gap-4 flex flex-row flex-wrap gap-10">
        <div className="flex items-end gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-grayScale-500 mobile:text-sm tab:text-sm text-md w-16 flex-shrink-0">
              출발지
            </span>
            <span className="flex-1">{pickupAddress}</span>
          </div>
          <Image src="/icons/arrow-right.svg" alt="to" width={16} height={16} className="h-fit" />
          <div className="flex flex-col gap-2">
            <span className="text-grayScale-500 mobile:text-sm tab:text-sm text-md w-16 flex-shrink-0">
              도착지
            </span>
            <span className="flex-1">{dropoffAddress}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-grayScale-500 mobile:text-sm tab:text-sm text-md w-16 flex-shrink-0">
            이사일
          </span>
          <span className="flex-1">{movingDate}</span>
        </div>
      </div>

      <hr className="border-line-200 my-4 w-full" />

      {/* 평점 선택 */}
      <div className="mb-6">
        <h4 className="text-black-500 mobile:text-md tab:text-lg mb-3 text-xl font-semibold">
          평점을 선택해 주세요
        </h4>
        <StarSelect rating={rating} onRatingChange={setRating} size={40} />
      </div>

      {/* 후기 작성 */}
      <div className="mb-6">
        <h4 className="text-black-500 mobile:text-md tab:text-lg mb-3 text-xl font-semibold">
          상세 후기를 작성해 주세요
        </h4>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="최소 10자 이상 작성해 주세요."
          className="text-black-500 placeholder:text-grayScale-400 mobile:text-sm mobile:p-3 tab:text-sm tab:p-4 border-line-200 focus:border-primary-orange-400 w-full resize-none rounded-lg border p-4 text-base focus:outline-none"
          rows={6}
          minLength={10}
        />
      </div>

      {/* 제출 버튼 */}
      <Button onClick={handleSubmit} disabled={isSubmitDisabled} size="xl">
        리뷰 등록
      </Button>
    </article>
  );
};

export default ReviewWriting;
