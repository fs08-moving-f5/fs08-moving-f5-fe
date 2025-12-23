'use client';

import Input from '@/shared/ui/input/Input';
import SearchBar from '@/shared/ui/input/SearchBar';
import TextArea from '@/shared/ui/input/TextArea';
import { useState } from 'react';

/*Input, searchBar, TextArea 컴포넌트 사용 예시입니다. */

export default function Test({}) {
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [textareaValue2, setTextareaValue2] = useState('');
  const handleInputChange =
    (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };
  const handleTextAreaChange =
    (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setter(e.target.value);
    };
  return (
    <div className="h-[100vh] w-full bg-white">
      <Input
        type="text"
        value={inputValue}
        errMsg={inputValue.length > 10 ? '10자 이상' : ''}
        placeholder="일반 텍스트"
        onChange={handleInputChange(setInputValue)}
      />
      <SearchBar onSubmit={undefined} />
      <SearchBar widthFull={true} onSubmit={undefined} />
      <TextArea value={textareaValue2} onChange={handleTextAreaChange(setTextareaValue2)} />
    </div>
  );
}
