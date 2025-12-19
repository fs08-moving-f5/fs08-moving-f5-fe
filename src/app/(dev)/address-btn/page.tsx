'use client';

import AddressButton, { AddressParams } from '@/features/estimateRequest/AddressButton';
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
