export function convertDateToKRString(date: Date): string {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  if (!(date instanceof Date)) return '날짜 형식 없음';
  const term = Date.now() - date.getTime();
  const oneHour = 1000 * 60 * 60;
  if (term < 24 * oneHour) {
    const termHour = Math.floor(term / oneHour) + 1;
    return `${termHour}시간 전`;
  }
  const year = date.getFullYear();
  const month = date.getMonth();
  const _date = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}.${month}.${_date} ${hours}:${minutes}`;
}
