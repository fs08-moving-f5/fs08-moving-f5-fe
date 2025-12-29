interface ProfileSetupHeaderProps {
  error?: string;
}

export default function ProfileSetupHeader({ error }: ProfileSetupHeaderProps) {
  return (
    <>
      <div className="mobile:mb-6 mb-10">
        <h1 className="mobile:text-2xl mb-2 text-4xl font-bold">프로필 등록</h1>
        <p className="mobile:text-md text-lg text-gray-500">
          추가 정보를 입력하여 회원가입을 완료해주세요.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
          <p className="text-sm">{error}</p>
        </div>
      )}
    </>
  );
}
