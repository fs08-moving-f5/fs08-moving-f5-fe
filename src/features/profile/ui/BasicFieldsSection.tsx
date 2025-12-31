import Input from '@/shared/ui/input/Input';

interface BasicFieldsSectionProps {
  name: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  errors: Partial<Record<'name' | 'email' | 'phone' | 'currentPassword' | 'newPassword' | 'confirmNewPassword', string>>;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCurrentPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BasicFieldsSection({
  name,
  email,
  phone,
  currentPassword,
  newPassword,
  confirmNewPassword,
  errors,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmNewPasswordChange,
}: BasicFieldsSectionProps) {
  return (
    <>
      <div className="mb-8">
        <label className="mb-2 block text-lg font-bold">이름</label>
        <Input
          name="name"
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="이름을 입력해주세요"
          errMsg={errors.name}
        />
      </div>

      <div className="mb-8">
        <label className="mb-2 block text-lg font-bold">이메일</label>
        <Input
          name="email"
          type="text"
          value={email}
          onChange={onEmailChange}
          placeholder="codeit@email.com"
          errMsg={errors.email}
        />
      </div>

      <div className="mb-8">
        <label className="mb-2 block text-lg font-bold">전화번호</label>
        <Input
          name="phone"
          type="text"
          value={phone}
          onChange={onPhoneChange}
          placeholder="010-1234-5678"
          errMsg={errors.phone}
        />
      </div>

      <div className="mb-8">
        <label className="mb-2 block text-lg font-bold">현재 비밀번호</label>
        <Input
          name="currentPassword"
          type="password"
          value={currentPassword}
          onChange={onCurrentPasswordChange}
          placeholder="현재 비밀번호를 입력해주세요"
          errMsg={errors.currentPassword}
        />
      </div>

      <div className="mb-8">
        <label className="mb-2 block text-lg font-bold">새 비밀번호</label>
        <Input
          name="newPassword"
          type="password"
          value={newPassword}
          onChange={onNewPasswordChange}
          placeholder="새 비밀번호를 입력해주세요"
          errMsg={errors.newPassword}
        />
      </div>

      <div className="mb-8">
        <label className="mb-2 block text-lg font-bold">새 비밀번호 확인</label>
        <Input
          name="confirmNewPassword"
          type="password"
          value={confirmNewPassword}
          onChange={onConfirmNewPasswordChange}
          placeholder="새 비밀번호를 다시 한번 입력해주세요"
          errMsg={errors.confirmNewPassword}
        />
      </div>
    </>
  );
}
