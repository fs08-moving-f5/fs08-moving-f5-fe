'use client';

import Input from '@/shared/ui/Input/Input';
import SearchBar from '@/shared/ui/Input/SearchBar';
import TextArea from '@/shared/ui/Input/TextArea';
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
        size="sm"
        type="text"
        value={inputValue}
        errMsg={inputValue.length > 10 ? '10자 이상' : ''}
        placeholder="일반 텍스트"
        onChange={handleInputChange(setInputValue)}
      />
      <Input
        size="md"
        type="password"
        value={inputValue2}
        errMsg={inputValue2.length > 10 ? '10자 이상' : ''}
        placeholder="비밀번호"
        onChange={handleInputChange(setInputValue2)}
      />
      <SearchBar size="sm" onSubmit={undefined} />
      <SearchBar size="md" onSubmit={undefined} />
      <TextArea size="sm" value={textareaValue} onChange={handleTextAreaChange(setTextareaValue)} />
      <TextArea
        size="md"
        value={textareaValue2}
        onChange={handleTextAreaChange(setTextareaValue2)}
      />
    </div>
  );
}
