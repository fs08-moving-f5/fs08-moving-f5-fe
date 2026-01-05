'use client';

import { ActiveChip } from '@/shared/ui/chip';

interface MyPageRegionsSectionProps {
  regions: string[];
}

const MyPageRegionsSection = ({ regions }: MyPageRegionsSectionProps) => {
  if (!regions || regions.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-lg font-semibold">서비스 가능 지역</h2>
      <div className="flex flex-wrap gap-2">
        {regions.map((region) => (
          <ActiveChip key={region} text={region} isActive={false} setIsActive={() => {}} />
        ))}
      </div>
    </section>
  );
};

export default MyPageRegionsSection;
