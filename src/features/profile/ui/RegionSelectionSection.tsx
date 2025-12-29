import { ActiveChip } from '@/shared/ui/chip';
import { REGIONS } from '../constants';
import type { RegionType } from '../types/types';

interface RegionSelectionSectionProps {
  selectedRegions: RegionType[];
  onToggleRegion: (region: RegionType) => void;
}

export default function RegionSelectionSection({
  selectedRegions,
  onToggleRegion,
}: RegionSelectionSectionProps) {
  return (
    <div className="mobile:mb-8 mb-10">
      <h2 className="mobile:text-xl mb-2 text-2xl font-bold">내가 사는 지역</h2>
      <p className="text-md mobile:text-sm mb-4 text-gray-500">
        **내가 사는 지역은 언제든 수정 가능해요!
      </p>
      <div className="mobile:gap-2 flex flex-wrap gap-3">
        {REGIONS.map((region) => (
          <ActiveChip
            key={region}
            text={region}
            isActive={selectedRegions.includes(region)}
            setIsActive={() => onToggleRegion(region)}
          />
        ))}
      </div>
    </div>
  );
}
