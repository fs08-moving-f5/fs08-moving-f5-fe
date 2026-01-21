'use client';

import { ActiveChip } from '@/shared/ui/chip';

interface MyPageServicesSectionProps {
  services: string[];
}

const MyPageServicesSection = ({ services }: MyPageServicesSectionProps) => {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-lg font-semibold">제공 서비스</h2>
      <div className="flex flex-wrap gap-2">
        {services.map((service) => (
          <ActiveChip
            key={service}
            text={
              service === 'SMALL_MOVING'
                ? '소형이사'
                : service === 'HOME_MOVING'
                  ? '가정이사'
                  : '사무실이사'
            }
            isActive={true}
            cursorPointer={false}
            setIsActive={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default MyPageServicesSection;
