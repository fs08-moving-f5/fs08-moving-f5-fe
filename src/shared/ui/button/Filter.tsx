'use client';

import { useState } from 'react';
import Image from 'next/image';
import FilterModal from '../modal/FilterModal';
import { Filters } from '@/views/driver/my/requests/DriverEstimateRequestPage';

type FilterProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const Filter = ({ filters, setFilters }: FilterProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleFilter = () => {
    setOpen((prev) => !prev);
  };

  const iconSrc = open ? '/icons/filter_clicked.svg' : '/icons/filter.svg';
  const borderColor = open ? 'border-[var(--color-primary-orange-400)]' : 'border-[#808080]';

  return (
    <div>
      <button
        type="button"
        aria-label="필터"
        className={`flex items-center justify-center border p-[4px] ${borderColor} cursor-pointer rounded-[8px] bg-[var(--color-grayScale-50)] transition hover:bg-[var(--color-grayScale-100)]`}
        onClick={toggleFilter}
      >
        <Image src={iconSrc} alt="filter icon" width={24} height={24} />
      </button>

      {open && (
        <FilterModal filters={filters} setFilters={setFilters} onClose={() => setOpen(false)} />
      )}
    </div>
  );
};

export default Filter;
