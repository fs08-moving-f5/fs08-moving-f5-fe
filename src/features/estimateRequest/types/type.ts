export type MovingType = 'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING';

export interface AddressParams {
  zoneCode: string;
  address: string;
  addressEnglish: string;
  sido: string;
  sidoEnglish: string;
  sigungu: string;
  sigunguEnglish: string;
}
