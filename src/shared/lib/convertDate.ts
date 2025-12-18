// type-1 : 2025년 12월 25일 (목)
export function convertDateType1(date: Date): string {
  if (!(date instanceof Date)) {
    date = new Date(date); //ISOstring 형식 등 변형 가능한 경우 변형
  }
  if (!(date instanceof Date)) return '날짜 형식 없음';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = date.getDay();
  type weekType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
  const KRWeek = {
    0: '일',
    1: '월',
    2: '화',
    3: '수',
    4: '목',
    5: '금',
    6: '토',
  };
  return `${year}년 ${month}월 ${day}일 (${KRWeek[weekday as weekType]})`;
}

// type-2 : 2025.12.25 10:25 or 3시간전 (24시간 이내)
export function convertDateType2(date: Date): string {
  if (!(date instanceof Date)) {
    date = new Date(date); //ISOstring 형식 등 변형 가능한 경우 변형
  }
  if (!(date instanceof Date)) return '날짜 형식 없음';

  const term = Date.now() - date.getTime();
  const oneHour = 1000 * 60 * 60;
  if (term < 24 * oneHour) {
    const termHour = Math.floor(term / oneHour) + 1;
    return `${termHour}시간 전`;
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const _date = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}.${month}.${_date} ${hours}:${minutes}`;
}
