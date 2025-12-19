import { BackendMovingType, FrontMovingType } from '@/shared/types/driverEstimate';

export function convertMovingType(
  type: BackendMovingType | null | undefined,
): FrontMovingType | undefined {
  if (!type) return undefined;

  switch (type) {
    case 'SMALL_MOVING':
      return 'small';
    case 'HOME_MOVING':
      return 'home';
    case 'OFFICE_MOVING':
      return 'office';
    default:
      return undefined;
  }
}
