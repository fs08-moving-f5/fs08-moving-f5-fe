import Input from '@/shared/ui/input/Input';

interface DriverFieldsSectionProps {
  career: string;
  shortIntro: string;
  description: string;
  errors: {
    career: string;
    shortIntro: string;
    description: string;
  };
  onCareerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onShortIntroChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function DriverFieldsSection({
  career,
  shortIntro,
  description,
  errors,
  onCareerChange,
  onShortIntroChange,
  onDescriptionChange,
}: DriverFieldsSectionProps) {
  return (
    <>
      <div className="mobile:mb-8 mb-10">
        <label className="mobile:text-xl mb-4 block text-2xl font-bold">경력</label>
        <Input
          name="career"
          type="text"
          value={career}
          onChange={onCareerChange}
          placeholder="경력을 숫자로 입력해주세요 (예: 5)"
          errMsg={errors.career}
        />
        <p className="mt-2 text-right text-sm text-gray-400">숫자만 입력 가능</p>
      </div>

      <div className="mobile:mb-8 mb-10">
        <label className="mobile:text-xl mb-4 block text-2xl font-bold">한줄 소개</label>
        <Input
          name="shortIntro"
          type="text"
          value={shortIntro}
          onChange={onShortIntroChange}
          placeholder="간단한 소개를 입력해주세요 (최소 8자)"
          errMsg={errors.shortIntro}
        />
        <p className="mt-2 text-right text-sm text-gray-400">{shortIntro.length}/100</p>
      </div>

      <div className="mobile:mb-8 mb-10">
        <h2 className="mobile:text-xl mb-4 text-2xl font-bold">상세 설명</h2>
        <textarea
          value={description}
          onChange={onDescriptionChange}
          placeholder="자세한 소개를 입력해주세요 (최소 10자, 최대 2000자)"
          maxLength={2000}
          className={`text-md focus:border-primary-orange-400 mobile:text-sm w-full rounded-lg border px-4 py-3 focus:outline-none ${
            errors.description ? 'border-[var(--color-error)]' : 'border-gray-300'
          }`}
          rows={8}
        />
        {errors.description && (
          <div className="mt-1 px-2">
            <span className="text-[13px] font-[500] text-[var(--color-error)]">
              {errors.description}
            </span>
          </div>
        )}
        <p className="mt-2 text-right text-sm text-gray-400">{description.length}/2000</p>
      </div>
    </>
  );
}
