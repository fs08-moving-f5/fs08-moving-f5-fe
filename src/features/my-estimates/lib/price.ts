export function formatPrice(price: number | string): string {
  const numPrice = typeof price === 'string' ? Number(price) : price;

  if (!numPrice) {
    return '0원';
  }

  return `${numPrice.toLocaleString('ko-KR')}원`;
}
