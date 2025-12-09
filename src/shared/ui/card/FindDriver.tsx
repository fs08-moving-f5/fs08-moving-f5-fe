import Image from 'next/image';

interface FindDriverProps {
  title: string;
  description: string;
  driverName: string;
  rating: number;
  reviewCount: number;
  experience: string;
  moveCount: string;
  likeCount: number;
  chipLabel?: string;
  isLiked?: boolean;
}

const FindDriver = ({
  title,
  description,
  driverName,
  rating,
  reviewCount,
  experience,
  moveCount,
  likeCount,
  chipLabel,
  isLiked = false,
}: FindDriverProps) => {
  return (
    <>
      <div className="w-full max-w-[1200px] rounded-2xl bg-white p-6 shadow-md">
        <div className="relative flex flex-col items-start gap-4">
          {chipLabel && <div>칩이 들어갈 예정</div>}
          <div className="flex flex-1 flex-row gap-6">
            <div className="tab:hidden">
              <Image src="/img/profile.png" alt="Driver Img" width={134} height={134} />
            </div>
            <div>
              {/* 제목 */}
              <h3 className="text-black-500 mb-2 text-xl font-bold">{title}</h3>
              {/* 설명 */}
              <p className="text-black-200 mb-5 text-lg">{description}</p>

              {/* 기사 정보 */}
              <div className="flex items-center gap-4">
                <div className="tab:block hidden">
                  <Image src="/img/profile.png" alt="Driver Img" width={64} height={64} />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Image src="/icons/name.svg" alt="Driver Name Icon" width={24} height={24} />
                    <span className="text-black-500 text-lg font-semibold">{driverName}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Image src="/icons/star.svg" alt="Star Icon" width={20} height={20} />
                    <span className="text-black-500 flex items-center text-sm font-medium">
                      {rating.toFixed(1)}
                    </span>
                    <span className="text-grayScale-500 flex items-center text-sm">
                      ({reviewCount})
                    </span>
                    <span className="text-grayScale-400 mx-1">|</span>
                    <span className="text-black-400 flex items-center text-sm font-medium">
                      경력 {experience}
                    </span>
                    <span className="text-grayScale-400 mx-1">|</span>
                    <span className="text-black-400 flex items-center text-sm font-medium">
                      {moveCount} 확정
                    </span>
                  </div>
                </div>

                {/* 좋아요 */}
                <div className="absolute right-0 bottom-0 flex items-center gap-1.5">
                  <Image
                    src={isLiked ? '/icons/like-on.svg' : '/icons/like-off.svg'}
                    alt="Like Icon"
                    width={28}
                    height={28}
                  />
                  <span className="text-primary-orange-400 text-lg font-medium">{likeCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindDriver;
