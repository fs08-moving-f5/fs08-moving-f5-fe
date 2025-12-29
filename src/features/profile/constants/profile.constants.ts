import type { ServiceType, RegionType } from '../types/types';

export const SERVICES: { key: ServiceType; label: string }[] = [
  { key: 'SMALL_MOVING', label: '소형이사' },
  { key: 'HOME_MOVING', label: '가정이사' },
  { key: 'OFFICE_MOVING', label: '사무실이사' },
];

export const REGIONS: RegionType[] = [
  '서울',
  '경기',
  '인천',
  '강원',
  '충북',
  '충남',
  '대전',
  '세종',
  '전북',
  '전남',
  '광주',
  '경북',
  '경남',
  '대구',
  '부산',
  '울산',
  '제주',
];
