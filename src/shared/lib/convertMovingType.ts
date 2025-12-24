import {
  BackendMovingType,
  FrontMovingType,
} from '@/features/driver-estimate/types/driverEstimate';

// Backend → Front
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

// Front → Backend
export function convertMovingTypeToBackend(
  type: FrontMovingType | undefined,
): BackendMovingType | undefined {
  if (!type) return undefined;

  switch (type) {
    case 'small':
      return 'SMALL_MOVING';
    case 'home':
      return 'HOME_MOVING';
    case 'office':
      return 'OFFICE_MOVING';
    default:
      return undefined;
  }
}
