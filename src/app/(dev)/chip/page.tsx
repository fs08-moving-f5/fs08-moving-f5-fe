'use client';

import { useState } from 'react';
import { ActiveChip, MovingTypeChip } from '@/shared/ui/chip';

const ChipPage = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <ActiveChip text="소형이사" isActive={isActive} setIsActive={setIsActive} />
      <MovingTypeChip movingType="small" />
    </div>
  );
};

export default ChipPage;
