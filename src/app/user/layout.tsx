import { AuthGuard } from '@/shared/lib/guard';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthGuard>{children}</AuthGuard>
    </>
  );
}
