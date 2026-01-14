'use client';

interface MyPageOfficeAddressSectionProps {
  address: string | null | undefined;
}

const MyPageOfficeAddressSection = ({ address }: MyPageOfficeAddressSectionProps) => {
  if (!address) {
    return null;
  }

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-lg font-semibold">사무실 주소</h2>
      <p className="text-gray-700">{address}</p>
    </section>
  );
};

export default MyPageOfficeAddressSection;
