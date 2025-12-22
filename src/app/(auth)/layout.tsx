import { LoginedGuard } from '@/shared/lib/guard';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LoginedGuard>{children}</LoginedGuard>
    </>
  );
}
