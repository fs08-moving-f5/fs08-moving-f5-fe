const PROFILE_QUERY_KEY = {
  USER_PROFILE: ['profile', 'user'] as const,
  DRIVER_PROFILE: ['profile', 'driver'] as const,
  MY_PROFILE: ['profile', 'me'] as const,
} as const;

export default PROFILE_QUERY_KEY;
