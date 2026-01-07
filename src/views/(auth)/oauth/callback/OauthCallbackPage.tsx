
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/store/authStore';
import { api } from '@/shared/api/client';
import type { UserResponse } from '@/shared/types/user';
import { showToast } from '@/shared/ui/sonner';

export default function OauthCallbackPage() {
	const router = useRouter();

	useEffect(() => {
		const run = async () => {
			const params = new URLSearchParams(window.location.search);
			const accessToken = params.get('accessToken');
			const expectedUsertype = sessionStorage.getItem('oauthExpectedUsertype');

			if (!accessToken) {
				router.replace('/');
				return;
			}

			const { storage } = await import('@/shared/lib/storage');
			storage.setString('accessToken', accessToken);

			try {
				const me = await api.get<UserResponse>('auth/me');

				if (
					expectedUsertype &&
					(expectedUsertype === 'USER' || expectedUsertype === 'DRIVER') &&
					me.data.type !== expectedUsertype
				) {
					storage.remove('accessToken');
					useAuthStore.getState().clearAuth();
					showToast({
						kind: 'error',
						message: `이미 ${me.data.type} 계정입니다. ${me.data.type}로 로그인해주세요.`,
					});
					router.replace(`/login/${me.data.type.toLowerCase()}`);
					return;
				}

				useAuthStore.getState().setUser(me.data);
			} catch {
				storage.remove('accessToken');
				useAuthStore.getState().clearAuth();
			}

			sessionStorage.removeItem('oauthExpectedUsertype');

			router.replace('/');
		};

		run();
	}, [router]);

	return null;
}
