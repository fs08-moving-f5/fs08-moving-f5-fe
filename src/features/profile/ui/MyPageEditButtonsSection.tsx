'use client';

import { Button } from '@/shared/ui/button';

interface MyPageEditButtonsSectionProps {
  onProfileEdit: () => void;
  onBasicInfoEdit: () => void;
}

const MyPageEditButtonsSection = ({
  onProfileEdit,
  onBasicInfoEdit,
}: MyPageEditButtonsSectionProps) => {
  return (
    <div className="tab:flex-row mobile:flex-col tab:justify-center mobile:justify-center flex flex-col gap-4">
      <Button onClick={onProfileEdit} isWriting={true}>
        내 프로필 수정
      </Button>
      <Button
        onClick={onBasicInfoEdit}
        isWriting={true}
        variant="outlined"
        design="secondary"
      >
        기본 정보 수정
      </Button>
    </div>
  );
};

export default MyPageEditButtonsSection;
