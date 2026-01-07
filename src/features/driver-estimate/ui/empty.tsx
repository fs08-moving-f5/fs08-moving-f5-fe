'use client';

import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export interface emptyParmas {
  type: 'request' | 'confirm' | 'reject' | 'writable' | 'written';
}

const EmptySection = ({ type }: emptyParmas) => {
  return (
    <section className="flex w-full flex-col items-center p-45">
      <div className="flex flex-col items-center gap-8">
        <Image src="/img/img-character-empty.svg" alt="empty img" width={260} height={260} />
        <h1 className="font-normal text-nowrap text-[var(--color-gray-400)] sm:text-lg md:text-lg lg:text-2xl">
          {type === 'request' && '아직 받은 요청이 없어요!'}
          {type === 'confirm' && '아직 작성한 견적이 없어요!'}
          {type === 'reject' && '아직 반려한 견적이 없어요!'}
          {type === 'writable' && '작성 가능한 리뷰가 없어요!'}
          {type === 'written' && '아직 등록된 리뷰가 없어요!'}
        </h1>

        {type === 'written' && (
          <Link href="/user/my/reviews/pending" className="w-full">
            <Button size="sm">리뷰 작성하러 가기</Button>
          </Link>
        )}

        {(type === 'confirm' || type === 'reject') && (
          <Link href="/driver/my/requests" className="w-full">
            <Button size="sm">견적 작성하러 가기</Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default EmptySection;
