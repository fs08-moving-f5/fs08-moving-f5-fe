export type MovingType = 'SMALL_MOVING' | 'HOME_MOVING' | 'OFFICE_MOVING';

export interface AddressParams {
  zonecode: string;
  address: string;
  addressEnglish: string;
  sido: string;
  sidoEnglish: string;
  sigungu: string;
  sigunguEnglish: string;
}
