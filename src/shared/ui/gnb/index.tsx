import Image from 'next/image';
import Link from 'next/link';

type UserRole = 'guest' | 'user' | 'driver';

const GNB = () => {
  return (
    <div className="flex h-[88px] w-full items-center justify-between px-[160px] py-[26px]">
      <div className="flex items-center gap-[82px]">
        <Link href="/">
          <Image src="img/logo-text.svg" alt="logo" width={116} height={44} />
        </Link>
        <div className="text-black-500 text-2lg font-bold">기사님 찾기</div>
      </div>
      <button type="button">로그인</button>
    </div>
  );
};

export default GNB;
