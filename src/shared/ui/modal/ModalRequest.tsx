'use client';

import { useState, useEffect } from 'react';
import Button from '../button/Button';
import { MovingTypeChip } from '../chip';
import Input from '../input/Input';
import TextArea from '../input/TextArea';

import Image from 'next/image';
import StarRating from '../reviewChart/StarRating';

const ic_x = '/icons/x.svg';
const ic_arrow_right = '/icons/arrow-right.svg';
const ic_name = '/icons/name.svg';
const img_profile = '/img/profile.png';
const ic_star = '/icons/star.svg';
const ic_star_empty = '/icons/star-empty.svg';

interface User {
  name: string;
  role: 'guest' | 'user' | 'driver';
}

type MovingType = 'small' | 'home' | 'office';

interface MovingInfo {
  movingType: MovingType;
  pickedDriver: boolean;
  departure: string;
  destination: string;
  date: string;
}

interface ModalQuetRequestProps {
  type: 'confirm' | 'reject' | 'review';
  user: User;
  mvInfo: MovingInfo;
  price?: number;
  comment: string;
  score?: number;
  setPrice?: (price: number) => void;
  setComment: (comment: string) => void;
  setScore?: (score: number) => void;
  onSubmit?: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ModalQuetRequest({
  type,
  user,
  mvInfo,
  price,
  comment,
  score,
  setPrice,
  setComment,
  setScore,
  onSubmit,
  isOpen,
  setIsOpen,
}: ModalQuetRequestProps) {
  // 모달 닫기 -> 입력 초기화
  useEffect(() => {
    if (!isOpen) {
      setComment('');
      setPrice?.(0);
      setScore?.(0);
    }
  }, [isOpen]);

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice && setPrice(parseInt(e.target.value) ?? 0);
  };
  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const [hoverScore, setHoverScore] = useState(0);
  const starList = [0, 0, 0, 0, 0].map((_, idx) => (idx < (score || 0) ? 1 : 0));

  const title = {
    confirm: '견적 보내기',
    reject: '반려 요청',
    review: '리뷰 쓰기',
  };

  const roleName = {
    guest: '',
    user: '고객',
    driver: '기사',
  };

  const descriptionLabel = {
    confirm: '코멘트를 입력해주세요',
    reject: '반려 사유를 입력해주세요',
    review: '상품 후기를 작성해주세요',
  };

  const submitButton = {
    confirm: '견적 보내기',
    reject: '반려하기',
    review: '리뷰 등록',
  };

  const modalSize = {
    confirm: 'w-[608px] px-[24px] pt-[32px] pb-[40px] mobile:w-[375px]',
    reject: 'w-[608px] px-[24px] pt-[32px] pb-[40px] mobile:w-[375px]',
    review: 'w-[600px] px-[24px] py-[32px] mobile:w-[375px] mobile:px-[24px]',
  };

  const InfoFrame = {
    confirm: 'gap-[20px] border-b border-[var(--color-line-100)] pb-[20px] mobile:gap-[16px]',
    reject:
      'gap-[20px] border-b border-[var(--color-line-100)] pb-[20px] mobile:gap-[16px] mobile:border-none mobile:p-0',
    review: 'gap-0',
  };

  const labelDiv = {
    confirm: 'flex flex-col gap-[16px]',
    reject: 'flex flex-col gap-[16px]',
    review: 'flex flex-col gap-[12px]',
  };

  const userInfoDiv = {
    confirm: '',
    reject: '',
    review: 'py-[16px] border-b border-[var(--color-line-100)] mobile:pt-[14px] mobile:pb-[12px]',
  };

  const mvInfoDiv_1 = {
    confirm: 'mobile:hidden',
    reject: 'mobile:hidden',
    review: 'py-[16px] border-b border-[var(--color-line-100)] mobile:py-[12px]',
  };

  const mvInfoDiv_2 = {
    confirm: 'hidden mobile:block',
    reject: 'hidden mobile:block',
    review: 'hidden',
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit();
  };

  // submit 버튼 disabled 처리
  const isRejectValid = type !== 'reject' || comment.trim().length >= 10;
  const isConfirmValid =
  type !== 'confirm' ||
  (!!price && price >= 10000 && comment.trim().length >= 10);


  return (
    <div
      className={`fixed top-0 left-0 z-30 h-full w-full bg-[#00000080] select-none ${isOpen ? 'block' : 'hidden'}`}
    >
      <div
        className={`mobile:rounded-b-[0px] mobile:bottom-0 mobile:top-auto mobile:translate-y-0 fixed top-1/2 left-1/2 flex h-fit max-h-[95vh] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border-none bg-white ${modalSize[type]}`}
      >
        <form onSubmit={handleSubmit} className="mobile:gap-[26px] flex w-full flex-col gap-[40px]">
          <div className="flex justify-between">
            <span className="mobile:text-[18px] mobile:font-[700] text-[24px] font-[600]">
              {title[type]}
            </span>
            <button
              aria-label="모달 닫기"
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
          <div className="scrollbar-hide flex flex-col gap-[32px] overflow-x-hidden overflow-y-auto">
            <div className={`flex flex-col ${InfoFrame[type]}`}>
              {/* 이사 유형 */}
              <ul className="flex gap-[8px]">
                <li>
                  <MovingTypeChip movingType={mvInfo.movingType} />
                </li>

                {mvInfo.pickedDriver && (
                  <li>
                    <MovingTypeChip movingType="assign" />
                  </li>
                )}
              </ul>
              {/* 유저 정보 */}
              <span
                className={`text-[20px] leading-[32px] font-[600] text-[var(--color-black-300)] ${userInfoDiv[type]}`}
              >
                {user.role === 'driver' ? (
                  <div className="flex h-fit w-full justify-between">
                    <div className="flex flex-col justify-between">
                      <Image src={ic_name} alt="ic_name" width={15.4} height={17.5} />
                      <span>
                        {user.name} {roleName[user.role]}님
                      </span>
                    </div>
                    <Image src={img_profile} alt="img_profile" width={50} height={50} />
                  </div>
                ) : (
                  <span>
                    {user.name} {roleName[user.role]}님
                  </span>
                )}
              </span>
              {/* 이사 정보 (출발지, 도착지, 이사일)*/}
              <div
                className={`mobile:justify-between mobile:gap-0 flex gap-[40px] ${mvInfoDiv_1[type]}`}
              >
                <div className="flex gap-[12px]">
                  <div className="flex w-fit flex-col items-start">
                    <span className="mobile:text-[12px] mobile:leading-[18px] h-fit w-fit text-[14px] leading-[24px] font-[400] text-[#808080]">
                      출발지
                    </span>
                    <span className="mobile:text-[14px] mobile:leading-[22px] h-fit w-fit text-[16px] leading-[26px] font-[500] text-[var(--color-black-500)]">
                      {mvInfo.departure}
                    </span>
                  </div>
                  <div className="flex items-end">
                    <Image
                      src={ic_arrow_right}
                      alt="ic_arrow_right"
                      width={16}
                      height={23}
                      className="mobile:w-[12px] h-[23px] w-[16px]"
                    />
                  </div>
                  <div className="flex w-fit flex-col items-start">
                    <span className="mobile:text-[12px] mobile:leading-[18px] h-fit w-fit text-[14px] leading-[24px] font-[400] text-[#808080]">
                      도착지
                    </span>
                    <span className="mobile:text-[14px] mobile:leading-[22px] h-fit w-fit text-[16px] leading-[26px] font-[500] text-[var(--color-black-500)]">
                      {mvInfo.destination}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <span className="mobile:text-[12px] mobile:leading-[18px] h-fit w-fit text-[14px] leading-[24px] font-[400] text-[#808080]">
                    이사일
                  </span>
                  <span className="mobile:text-[14px] mobile:leading-[22px] h-fit w-fit text-[16px] leading-[26px] font-[500] text-[var(--color-black-500)]">
                    {mvInfo.date}
                  </span>
                </div>
              </div>
              <div className={`flex flex-col gap-[8px] ${mvInfoDiv_2[type]}`}>
                <div className="flex gap-[12px]">
                  <div className="flex w-fit gap-[8px]">
                    <span className="h-fit w-fit text-[14px] leading-[24px] font-[400] text-[#808080]">
                      출발지
                    </span>
                    <span className="h-fit w-fit text-[14px] leading-[26px] font-[500] text-[var(--color-black-500)]">
                      {mvInfo.departure}
                    </span>
                  </div>
                  <div className="flex items-end">
                    <Image
                      src={ic_arrow_right}
                      alt="ic_arrow_right"
                      width={16}
                      height={23}
                      className="mobile:w-[12px] h-[23px] w-[16px]"
                    />
                  </div>
                  <div className="flex w-fit gap-[8px]">
                    <span className="h-fit w-fit text-[14px] leading-[24px] font-[400] text-[#808080]">
                      도착지
                    </span>
                    <span className="h-fit w-fit text-[14px] leading-[26px] font-[500] text-[var(--color-black-500)]">
                      {mvInfo.destination}
                    </span>
                  </div>
                </div>
                <div className="flex w-fit gap-[8px]">
                  <span className="h-fit w-fit text-[14px] leading-[24px] font-[400] text-[#808080]">
                    이사일
                  </span>
                  <span className="h-fit w-fit text-[14px] leading-[26px] font-[500] text-[var(--color-black-500)]">
                    {mvInfo.date}
                  </span>
                </div>
              </div>
            </div>
            {/* 견적가 입력 */}
            {type === 'confirm' && (
              <div className={labelDiv[type]}>
                <span className="text-[16px] leading-[26px] font-[600]">견적가를 입력해주세요</span>
                <Input
                  type="number"
                  value={price?.toString()}
                  onChange={handleChangePrice}
                  placeholder="견적가 입력"
                  focusOn={false}
                />
              </div>
            )}
            {/* 평점 입력하기 */}
            {type === 'review' && (
              <div className={labelDiv[type]}>
                <span className="text-[16px] leading-[26px] font-[600]">평점을 선택해주세요</span>
                <StarRating
                  type="post"
                  value={score}
                  onChange={(value) => {
                    if (setScore) {
                      setScore(value);
                    }
                  }}
                />
              </div>
            )}
            {/* 글 작성 (코멘트, 반려 사유, 리뷰) */}
            <div className={labelDiv[type]}>
              <span className="text-[16px] leading-[26px] font-[600]">
                {descriptionLabel[type]}
              </span>
              <TextArea
                value={comment}
                onChange={handleChangeComment}
                placeholder="최소 10자 이상 입력해주세요"
              />
            </div>
          </div>
          <Button type="submit" size="xl" disabled={!isRejectValid || !isConfirmValid}>
            {submitButton[type]}
          </Button>
        </form>
      </div>
    </div>
  );
}
