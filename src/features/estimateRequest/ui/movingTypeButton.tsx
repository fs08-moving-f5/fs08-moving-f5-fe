import { MovingType } from '../types/type';
import Image from 'next/image';
const ic_check = '/icons/select.svg';
const ic_check_empty = '/icons/select-empty.svg';

interface MovingTypeButtonProps {
  movingType: MovingType | null;
  setMovingType: (type: MovingType) => void;
}

export default function MovingTypeSelect({ movingType, setMovingType }: MovingTypeButtonProps) {
  const buttonList: MovingTypeCheckProps[] = [
    {
      name: 'SMALL_MOVING',
      title: '소형이사',
      description: '원룸, 투룸 20평대 미만',
      img: '/img/moving-type/small.png',
      isActive: movingType === 'SMALL_MOVING',
      setMovingType: setMovingType,
    },
    {
      name: 'HOME_MOVING',
      title: '가정이사',
      description: '쓰리룸, 20평대 이상',
      img: '/img/moving-type/home.png',
      isActive: movingType === 'HOME_MOVING',
      setMovingType: setMovingType,
    },
    {
      name: 'OFFICE_MOVING',
      title: '사무실이사',
      description: '사무실, 상업공간',
      img: '/img/moving-type/office2.png',
      isActive: movingType === 'OFFICE_MOVING',
      setMovingType: setMovingType,
    },
  ];
  return (
    <ul className="mobile:grid-rows-3 mobile:grid-cols-1 box-border grid h-fit w-full grid-cols-3 gap-[16px]">
      {buttonList.map((props, idx) => (
        <li key={idx}>
          <MovingTypeCheck {...props} />
        </li>
      ))}
    </ul>
  );
}

interface MovingTypeCheckProps {
  name: MovingType;
  title: string;
  description: string;
  img: string;
  isActive: boolean;
  setMovingType: (type: MovingType) => void;
}
function MovingTypeCheck({
  name,
  title,
  description,
  img,
  isActive,
  setMovingType,
}: MovingTypeCheckProps) {
  const buttonStyle = {
    on: 'border-2 border-[var(--color-primary-orange-400)] bg-[var(--color-primary-orange-100)]',
    off: 'border-2 border-[var(--color-bg-200)] bg-[var(--color-bg-200)]',
  };
  return (
    <button
      onClick={() => setMovingType(name)}
      className={`mobile:flex-row mobile:h-fit flex h-[222px] w-full cursor-pointer flex-col gap-[16px] rounded-[16px] p-[20px_16px_16px_16px] leading-none outline-none select-none hover:brightness-95 ${buttonStyle[isActive ? 'on' : 'off']}`}
    >
      <div className="mobile:flex-col flex w-full gap-[8px]">
        <div className="flex items-start">
          <Image src={isActive ? ic_check : ic_check_empty} alt="ic_check" width={24} height={24} />
        </div>
        <div className="flex flex-col">
          <span
            className={`text-start text-[16px] leading-[26px] font-[600] ${isActive ? 'text-[var(--color-primary-orange-400)]' : 'text-[var(--color-black-500)]'}`}
          >
            {title}
          </span>
          <span
            className={`text-start text-[14px] leading-[24px] font-[400] ${isActive ? 'text-[var(--color-primary-orange-400)]' : 'text-[var(--color-black-500)]'}`}
          >
            {description}
          </span>
        </div>
      </div>
      <div className="flex justify-end">
        <Image
          src={img}
          alt="img"
          width={120}
          height={120}
          className="h-full min-h-[120px] w-fit min-w-[120px]"
        />
      </div>
    </button>
  );
}
