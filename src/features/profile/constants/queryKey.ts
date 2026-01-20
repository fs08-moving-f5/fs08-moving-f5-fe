const PROFILE_QUERY_KEY = {
  USER_PROFILE: ['profile', 'user'] as const,
  DRIVER_PROFILE: ['profile', 'driver'] as const,
  MY_PROFILE: ['profile', 'me'] as const,
  DRIVER_PUBLIC_PROFILE: (driverId: string) => ['profile', 'driver', 'public', driverId] as const,
  DRIVER_PUBLIC_REVIEWS: (driverId: string, page: number, limit: number) =>
    ['profile', 'driver', 'public', driverId, 'reviews', page, limit] as const,
} as const;

export default PROFILE_QUERY_KEY;
