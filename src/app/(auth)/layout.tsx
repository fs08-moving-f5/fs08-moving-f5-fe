import { LoginedGuard } from '@/shared/lib/guard';
import GNB from '@/shared/ui/gnb';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LoginedGuard>
      <GNB />
      {children}
      </LoginedGuard>
    </>
  );
}
