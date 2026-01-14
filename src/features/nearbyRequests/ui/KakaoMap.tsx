'use client';

import { useEffect, useRef } from 'react';
import { NearbyRequestList } from '../types';

type LatLng = {
  lat: number;
  lng: number;
};

type Props = {
  center: LatLng;
  requests: NearbyRequestList;
  onSelectRequest: (id: string) => void;
};

const KakaoMap = ({ center, requests, onSelectRequest }: Props) => {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const officeMarkerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requestMarkersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapDivRef.current) return;
    if (mapRef.current) return;

    // window.kakao.maps가 준비될 때까지 기다림
    const initMap = () => {
      if (!window.kakao?.maps) {
        // 아직 준비되지 않았으면 잠시 후 다시 시도
        setTimeout(initMap, 50);
        return;
      }

      const mapCenter = new window.kakao.maps.LatLng(center.lat, center.lng);

      mapRef.current = new window.kakao.maps.Map(mapDivRef.current, {
        center: mapCenter,
        level: 3,
      });
    };

    initMap();
  }, [center.lat, center.lng]);

  useEffect(() => {
    if (!mapRef.current) return;

    const nextCenter = new window.kakao.maps.LatLng(center.lat, center.lng);
    mapRef.current.panTo(nextCenter);
  }, [center.lat, center.lng]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (officeMarkerRef.current) {
      officeMarkerRef.current.setMap(null);
      officeMarkerRef.current = null;
    }

    const pos = new window.kakao.maps.LatLng(center.lat, center.lng);
    const marker = new window.kakao.maps.Marker({
      position: pos,
    });
    marker.setMap(mapRef.current);

    officeMarkerRef.current = marker;
  }, [center.lat, center.lng]);

  useEffect(() => {
    if (!mapRef.current) return;

    // (1) 기존 마커들을 모두 제거
    requestMarkersRef.current.forEach((marker) => marker.setMap(null));
    requestMarkersRef.current = [];

    // (2) 새로운 마커들을 생성하고 추가
    requests.forEach((req) => {
      const pos = new window.kakao.maps.LatLng(req.fromAddress.lat, req.fromAddress.lng);

      const marker = new window.kakao.maps.Marker({
        position: pos,
      });

      marker.setMap(mapRef.current);

      window.kakao.maps.event.addListener(marker, 'click', () => {
        onSelectRequest(req.estimateRequestId);
      });

      requestMarkersRef.current.push(marker);
    });
  }, [requests, onSelectRequest]);

  return <div ref={mapDivRef} className="h-full w-full bg-gray-100" />;
};

export default KakaoMap;
