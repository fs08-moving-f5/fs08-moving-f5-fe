'use client';

import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useEffect } from 'react';
import { storage } from '@/shared/lib/storage';

export const useNotificationSse = ({
  isLoggedIn,
  onUnreadCount,
}: {
  isLoggedIn: boolean;
  onUnreadCount: (count: number) => void;
}) => {
  useEffect(() => {
    if (!isLoggedIn) return;

    const accessToken = storage.getString('accessToken');

    const controller = new AbortController();

    fetchEventSource(`${process.env.NEXT_PUBLIC_API_URL}/notifications/stream`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      onopen: async (response) => {
        if (response.ok && response.headers.get('content-type')?.includes('text/event-stream')) {
          console.log('SSE connection opened successfully');
          return;
        } else {
          console.error(`SSE connection failed: ${response.status} ${response.statusText}`);
          throw new Error(`SSE connection failed: ${response.status}`);
        }
      },
      onmessage: (event) => {
        try {
          const data = JSON.parse(event.data);
          if (typeof data.count === 'number') {
            onUnreadCount(data.count);
          }
        } catch (error) {
          console.error('Error parsing notification data:', error);
        }
      },
      onerror: (err) => {
        console.error('SSE connection error:', err);
        // 에러 발생 시 재연결을 위해 에러를 throw하지 않음
        // fetch-event-source가 자동으로 재시도함
      },
    });

    return () => controller.abort();
  }, [isLoggedIn, onUnreadCount]);
};
