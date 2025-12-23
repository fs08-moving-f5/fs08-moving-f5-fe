import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');

export const formatDateWithWeekday = (isoDate: string): string => {
  return dayjs.utc(isoDate).tz('Asia/Seoul').format('YYYY년 MM월 DD일 (dd)');
};

export const formatDateOnlyDate = (isoDate: string): string => {
  return dayjs.utc(isoDate).tz('Asia/Seoul').format('YYYY년 MM월 DD일');
};

export const formatDateWithPeriod = (isoDate: string): string => {
  return dayjs.utc(isoDate).tz('Asia/Seoul').format('YYYY.MM.DD');
};
