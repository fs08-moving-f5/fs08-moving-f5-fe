import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');

export const formatDateWithWeekday = (isoDate: string): string => {
  if (!isoDate) return '';

  return dayjs.utc(isoDate).tz('Asia/Seoul').format('YYYY년 MM월 DD일 (dd)');
};

export const formatDateOnlyDate = (isoDate: string): string => {
  if (!isoDate) return '';

  return dayjs.utc(isoDate).tz('Asia/Seoul').format('YYYY년 MM월 DD일');
};

export const formatDateWithPeriod = (isoDate: string): string => {
  if (!isoDate) return '';

  return dayjs.utc(isoDate).tz('Asia/Seoul').format('YYYY.MM.DD');
};

export const formatDateAgo = (isoDate?: string): string => {
  if (!isoDate) return '';

  const now = dayjs();
  const date = dayjs.utc(isoDate).tz('Asia/Seoul');
  const diffInMinutes = now.diff(date, 'minute');
  const diffInHours = now.diff(date, 'hour');
  const diffInDays = now.diff(date, 'day');

  if (diffInMinutes < 60) {
    return `${Math.max(1, diffInMinutes)}분 전`;
  }

  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  if (diffInDays < 2) {
    return '1일 전';
  }

  return `${diffInDays}일 전`;
};
