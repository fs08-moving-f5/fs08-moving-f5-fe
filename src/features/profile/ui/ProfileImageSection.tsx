import Image from 'next/image';

interface ProfileImageSectionProps {
  imageUrl: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileImageSection({ imageUrl, onImageUpload }: ProfileImageSectionProps) {
  return (
    <div className="mobile:mb-8 mb-10">
      <h2 className="mobile:text-xl mb-4 text-2xl font-bold">프로필 이미지</h2>
      <div className="flex items-center justify-center">
        <label
          htmlFor="profile-image"
          className="hover:border-primary-orange-400 mobile:h-[120px] mobile:w-[120px] flex h-[160px] w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="프로필 이미지"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <svg
                className="mobile:h-10 mobile:w-10 mb-2 h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="mobile:text-xs text-sm">이미지 추가</span>
            </div>
          )}
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
          />
        </label>
      </div>
    </div>
  );
}
