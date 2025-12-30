'use client';

import AddressButton from '@/features/estimateRequest/ui/AddressButton';
import { AddressParams } from '@/features/estimateRequest/types/type';
import { useState } from 'react';

export default function Page() {
  const [from, setFrom] = useState<AddressParams>();
  const [to, setTo] = useState<AddressParams>();
  return (
    <div>
      <AddressButton type="from" address={from} setAddress={setFrom} />
      <AddressButton type="to" address={to} setAddress={setTo} />
    </div>
  );
}
