'use client';

import { useState } from 'react';
import { Button, LikeButton, Clip, ShareButton, Filter, CheckBox } from '@/shared/ui/button/index';

export type Filters = {
  circleBoolean: boolean;
  squareBoolean: boolean;
};

const ButtonPage = () => {
  const [filters, setFilters] = useState<Filters>({
    circleBoolean: false,
    squareBoolean: false,
  });

  return (
    <div className="developer-page min-h-screen bg-[var(--foreground)]">
      <div className="flex">
        <div className="m-[6px] flex h-full w-full flex-col gap-[8px]">
          <Button>기본 버튼</Button>
          <Button design="secondary">기본 버튼 2</Button>
          <Button disabled={true}>기본 버튼 비활성화</Button>

          <Button variant="outlined" design="primary">
            버튼 2
          </Button>
          <Button variant="outlined" design="secondary">
            버튼 2
          </Button>
          <Button variant="outlined" disabled={true}>
            버튼 2
          </Button>

          <Button size="md" isWriting={true}>
            수정 버튼
          </Button>
          <Button variant="outlined" disabled={true} size="md" isWriting={true}>
            수정 버튼 2
          </Button>

          <Button size="lg">기본 버튼 lg</Button>
          <Button size="md">기본 버튼 md</Button>
          <Button size="sm">기본 버튼 sm</Button>
          <Button size="xs">기본 버튼 xs</Button>
          <Button size="2xs">기본 버튼 2xs</Button>
        </div>
        <div className="m-[6px] flex h-full w-full flex-col gap-[8px]">
          <LikeButton size="lg" />
          <div className="flex gap-[8px]">
            <LikeButton size="md" />
            <LikeButton size="sm" />
          </div>

          <div className="flex gap-[8px]">
            <Clip size="lg" />
            <Clip size="md" />
            <Clip size="sm" />
          </div>

          <div className="flex gap-[8px]">
            <ShareButton
              size="lg"
              platform="kakao"
              kakaoTitle="이 페이지의 제목"
              kakaoDescription="이 페이지 설명"
              kakaoImageUrl="https://example.com/thumb.png"
              kakaoLink="https://example.com/page"
            />
            <ShareButton
              size="md"
              platform="kakao"
              kakaoTitle="이 페이지의 제목"
              kakaoDescription="이 페이지 설명"
              kakaoImageUrl="https://example.com/thumb.png"
              kakaoLink="https://example.com/page"
            />
            <ShareButton
              size="sm"
              platform="kakao"
              kakaoTitle="이 페이지의 제목"
              kakaoDescription="이 페이지 설명"
              kakaoImageUrl="https://example.com/thumb.png"
              kakaoLink="https://example.com/page"
            />
          </div>

          <div className="flex gap-[8px]">
            <ShareButton size="lg" platform="facebook" />
            <ShareButton size="md" platform="facebook" />
            <ShareButton size="sm" platform="facebook" />
          </div>
          <div className="flex gap-[8px]">
            <Filter />

            <CheckBox
              shape="circle"
              checked={filters.circleBoolean}
              onChange={(checked: boolean) =>
                setFilters((prev) => ({ ...prev, circleBoolean: checked }))
              }
            />
            <CheckBox
              shape="square"
              checked={filters.squareBoolean}
              onChange={(checked: boolean) =>
                setFilters((prev) => ({ ...prev, squareBoolean: checked }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonPage;
