import Link from 'next/link';
import Image from 'next/image';

interface MenuItem {
  id: number;
  label: string;
  href: string;
}

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  role: 'guest' | 'user' | 'driver';
}

const menuByGuest = [
  {
    id: 1,
    label: '기사님 찾기',
    href: '/',
  },
  {
    id: 2,
    label: '로그인',
    href: '/',
  },
];

const Menu = ({ isOpen, onClose, menuItems, role }: MenuProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="px-4 py-[10px]">
            <button
              type="button"
              onClick={onClose}
              className="flex w-full cursor-pointer items-center justify-end"
            >
              <Image src="/icons/x.svg" alt="close" width={24} height={24} />
            </button>
          </div>
          <nav className="flex flex-col">
            {role === 'guest'
              ? menuByGuest.map((menu) => (
                  <Link
                    key={menu.id}
                    href={menu.href}
                    onClick={onClose}
                    className="text-black-500 px-5 py-6 text-lg font-medium"
                  >
                    {menu.label}
                  </Link>
                ))
              : menuItems.map((menu) => (
                  <Link
                    key={menu.id}
                    href={menu.href}
                    onClick={onClose}
                    className="text-black-500 px-5 py-6 text-lg font-medium"
                  >
                    {menu.label}
                  </Link>
                ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Menu;
