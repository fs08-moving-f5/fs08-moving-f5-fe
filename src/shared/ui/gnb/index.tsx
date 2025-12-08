import Image from 'next/image';
import Link from 'next/link';

interface User {
  role: 'guest' | 'user' | 'driver';
  name: string;
}

const menuByRole = {
  guest: [{ id: 1, label: '기사님 찾기', href: '/' }],
  user: [
    {
      id: 1,
      label: '받은 요청',
      href: '/',
    },
    {
      id: 2,
      label: '내 견적 관리',
      href: '/',
    },
  ],
  driver: [
    {
      id: 1,
      label: '견적 요청',
      href: '/',
    },
    {
      id: 2,
      label: '기사님 찾기',
      href: '/',
    },
    {
      id: 3,
      label: '내 견적 관리',
      href: '/',
    },
  ],
};

const GNB = () => {
  // TODO: 로그인 기능 완성되면 API 요청해서 유저 정보 가져오기
  const user: User = {
    role: 'user',
    name: '김가나',
  };

  return (
    <div className="mobile:h-[54px] mobile:py-[10px] tab:py-[19px] tab:px-[72px] mobile:px-[24px] tab:h-]54px] flex h-[88px] w-full items-center justify-between bg-white px-[160px] py-[26px]">
      <div className="flex items-center gap-[82px]">
        <Link href="/">
          <Image
            src="img/logo-text.svg"
            alt="logo"
            width={116}
            height={44}
            className="mobile:w-[88px] tab:w-[88px] mobile:h-[34px] tab:h-[34px]"
          />
        </Link>
        <div className="mobile:hidden tab:hidden flex items-center gap-10">
          {menuByRole[user.role].map((menu) => (
            <Link key={menu.id} href={menu.href}>
              <div className="text-black-500 text-2lg font-bold">{menu.label}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mobile:hidden tab:hidden">
        {user.role === 'guest' && <button type="button">로그인</button>}
        {user.role !== 'guest' && (
          <div className="flex items-center gap-8">
            <Image src="icons/alarm.svg" alt="alarm" width={36} height={36} />
            <div className="flex items-center gap-4">
              <Image src="icons/profile.svg" alt="profile" width={36} height={36} />
              <div className="text-black-500 text-2lg font-medium">{user.name}</div>
            </div>
          </div>
        )}
      </div>
      <div className="mobile:flex tab:flex hidden items-center">
        {user.role === 'guest' && (
          <button type="button">
            <Image src="icons/menu.svg" alt="menu" width={24} height={24} />
          </button>
        )}
        {user.role !== 'guest' && (
          <div className="flex items-center gap-6">
            <button type="button">
              <Image src="icons/alarm.svg" alt="alarm" width={24} height={24} />
            </button>
            <button type="button">
              <Image src="icons/profile.svg" alt="profile" width={24} height={24} />
            </button>
            <button type="button">
              <Image src="icons/menu.svg" alt="menu" width={24} height={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GNB;
