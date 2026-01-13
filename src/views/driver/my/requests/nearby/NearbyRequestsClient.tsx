'use client';

import { useEffect, useState } from 'react';
import KakaoMap from '@/features/nearbyRequests/ui/KakaoMap';
import { KakaoMapScript } from '@/features/nearbyRequests/ui/KakaoMapScript';
import {
  useGetMyPageQuery,
  useGetNearbyQuery,
} from '@/features/nearbyRequests/hooks/queries/useNearbyRequestsQuery';

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };

const NearbyRequestsClient = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: nearbyRequests = [] } = useGetNearbyQuery(20);
  const { data: myPage } = useGetMyPageQuery();

  useEffect(() => {
    console.log('selectedId', selectedId);
  }, [selectedId]);

  return (
    <div className="w-full">
      <KakaoMapScript onLoad={() => setIsScriptLoaded(true)} />

      {isScriptLoaded && (
        <KakaoMap
          center={{
            lat: myPage?.profile?.officeLat ?? DEFAULT_CENTER.lat,
            lng: myPage?.profile?.officeLng ?? DEFAULT_CENTER.lng,
          }}
          requests={nearbyRequests}
          onSelectRequest={(id) => setSelectedId(id)}
        />
      )}
    </div>
  );
};

export default NearbyRequestsClient;
