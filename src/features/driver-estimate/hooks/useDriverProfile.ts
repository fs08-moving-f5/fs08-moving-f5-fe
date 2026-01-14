import { useQuery } from '@tanstack/react-query';
import { getDriverProfile } from '@/features/profile/services/profileService';

export const useDriverProfile = () => {
  return useQuery({
    queryKey: ['driverProfile'],
    queryFn: getDriverProfile,
  });
};
