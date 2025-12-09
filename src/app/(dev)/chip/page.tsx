'use client';

import { useState } from 'react';
import { RegionChip } from '@/shared/ui/chip';

const ChipPage = () => {
  const [isActive, setIsActive] = useState(false);

  return <RegionChip region="서울" isActive={isActive} setIsActive={setIsActive} />;
};

export default ChipPage;
