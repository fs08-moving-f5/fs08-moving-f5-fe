import Image from 'next/image';
import clsx from 'clsx';

type MovingType = 'small' | 'home' | 'office' | 'assign';

interface MovingTypeChipProps {
  movingType: MovingType;
}

const movingTypeMap = {
  small: {
    icon: '/icons/solid/box.svg',
    text: '소형이사',
  },
  home: {
    icon: '/icons/solid/home.svg',
    text: '가정이사',
  },
  office: {
    icon: '/icons/solid/company.svg',
    text: '사무실이사',
  },
  assign: {
    icon: '/icons/solid/document.svg',
    text: '지정 견적 요청',
  },
};

const MovingTypeChip = ({ movingType }: MovingTypeChipProps) => {
  const { icon, text } = movingTypeMap[movingType];

  return (
    <div
      className={clsx(
        'mobile:py-[2px] mobile:pr-[7px] mobile:pl-1 mobile:gap-[2px] mobile:rounded-[4px] flex items-center justify-center gap-1 rounded-[6px] py-1 pr-[7px] pl-[5px] shadow-[4px_4px_8px_0_rgba(217,217,217,0.10)]',
        movingType === 'assign' ? 'bg-secondary-red-100' : 'bg-primary-orange-100',
      )}
    >
      <Image src={icon} alt="movingIcon" width={20} height={20} />
      <div
        className={clsx(
          'text-md mobile:text-sm font-semibold',
          movingType === 'assign' ? 'text-secondary-red-200' : 'text-primary-orange-400',
        )}
      >
        {text}
      </div>
    </div>
  );
};

export default MovingTypeChip;
