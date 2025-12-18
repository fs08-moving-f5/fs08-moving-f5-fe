import GNB from "@/shared/ui/gnb";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GNB />
      {children}
    </>
  );
}