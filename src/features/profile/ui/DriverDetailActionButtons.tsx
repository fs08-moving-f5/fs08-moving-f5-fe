'use client';

import { Button, LikeButton } from '@/shared/ui/button';

interface DriverDetailActionButtonsProps {
	onRequestEstimate?: () => void;
	onToggleFavorite?: () => void;
	isFavorited?: boolean;
	favoriteDisabled?: boolean;
	disableFavorite?: boolean;
}

const DriverDetailActionButtons = ({
	onRequestEstimate,
	onToggleFavorite,
	isFavorited = false,
	favoriteDisabled = false,
	disableFavorite = false,
}: DriverDetailActionButtonsProps) => {
	const isFavoriteButtonDisabled = favoriteDisabled || disableFavorite;

	return (
		<div className="flex w-full flex-col gap-4">
			<Button size="xl" variant="solid" onClick={onRequestEstimate} aria-label="지정 견적 요청하기">
				지정 견적 요청하기
			</Button>

			<LikeButton
				size="lg"
				liked={isFavorited}
				disabled={isFavoriteButtonDisabled}
				onClick={() => onToggleFavorite?.()}
			/>
		</div>
	);
};

export default DriverDetailActionButtons;
