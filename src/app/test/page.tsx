'use client';

import Input from '@/shared/ui/Input/Input';
import InputSearchBar from '@/shared/ui/Input/InputSearchBar';
import { useState } from 'react';

export default function Test({}) {
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="h-[100vh] bg-white">
      <Input
        size="sm"
        type="password"
        value={value}
        errMsg={value.length > 10 ? '10자 이상' : ''}
        placeholder="아무거나 입력"
        onChange={handleChange}
      />
      <InputSearchBar />
    </div>
  );
}
