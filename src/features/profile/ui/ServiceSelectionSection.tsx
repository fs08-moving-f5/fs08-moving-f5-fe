import { ActiveChip } from '@/shared/ui/chip';
import { SERVICES } from '../constants';
import type { ServiceType } from '../types/types';

interface ServiceSelectionSectionProps {
  selectedServices: ServiceType[];
  onToggleService: (service: ServiceType) => void;
}

export default function ServiceSelectionSection({
  selectedServices,
  onToggleService,
}: ServiceSelectionSectionProps) {
  return (
    <div className="mobile:mb-8 mb-10">
      <h2 className="mobile:text-xl mb-2 text-2xl font-bold">이용 서비스</h2>
      <p className="text-md mobile:text-sm mb-4 text-gray-500">
        * 이용 서비스는 중복 선택 가능하며, 언제든 수정 가능해요!
      </p>
      <div className="mobile:gap-2 flex flex-wrap gap-3">
        {SERVICES.map((service) => (
          <ActiveChip
            key={service.key}
            text={service.label}
            isActive={selectedServices.includes(service.key)}
            setIsActive={() => onToggleService(service.key)}
          />
        ))}
      </div>
    </div>
  );
}
