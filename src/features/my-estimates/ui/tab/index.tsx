import clsx from 'clsx';
import Link from 'next/link';
import type { PendingEstimatesTabProps } from '@/features/my-estimates/types/pendingTypes';

const PendingEstimatesTab = ({ activeTab }: PendingEstimatesTabProps) => {
  const tabStyles =
    'py-4 flex items-center justify-center cursor-pointer text-xl font-semibold tab:text-md mobile:text-md';
  const activeTabStyles = 'border-b-2 border-solid border-black-500 text-black-500';
  const inactiveTabStyles = 'text-gray-400';

  const tab = {
    pending: {
      label: '대기 중인 견적',
      href: '/user/my/estimates/pending',
    },
    received: {
      label: '받았던 견적',
      href: '/user/my/estimates/received',
    },
  };

  return (
    <div className="w-full bg-white">
      <div className="container-responsive tab:max-w-[600px] mobile:max-w-[327px] tab:py-[10px] mobile:py-[10px] max-w-[1200px] py-4">
        <div className="flex items-center gap-8">
          <Link
            className={clsx(
              tabStyles,
              activeTab === 'pending' ? activeTabStyles : inactiveTabStyles,
            )}
            href={tab.pending.href}
          >
            {tab.pending.label}
          </Link>
          <Link
            className={clsx(
              tabStyles,
              activeTab === 'received' ? activeTabStyles : inactiveTabStyles,
            )}
            href={tab.received.href}
          >
            {tab.received.label}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PendingEstimatesTab;
