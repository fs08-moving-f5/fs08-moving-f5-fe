'use client';

import { useState } from 'react';
import { ActiveChip, AddressChip, MovingTypeChip } from '@/shared/ui/chip';

const ChipPage = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <ActiveChip text="소형이사" isActive={isActive} setIsActive={setIsActive} />
      <MovingTypeChip movingType="small" />
      <AddressChip />
    </div>
  );
};

export default ChipPage;
