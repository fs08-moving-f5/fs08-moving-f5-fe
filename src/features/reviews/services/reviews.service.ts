import { apiClient } from '@/shared/api/index';
import type { paths, components } from '@/shared/types/openapi';
import { convertDateType1, convertDateType3 } from '@/shared/lib/convertDate';
import { convertMovingType } from '@/shared/lib/convertMovingType';
import {
  ReviewWritableItem,
  ReviewWrittenItem,
  OffsetPaginationResponse,
  ReviewWritableItemRaw,
  getReviewWrittenItemRaw,
} from '../types/review';

// 작성 가능한 리뷰
export const getReviewWritable = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}): Promise<OffsetPaginationResponse<ReviewWritableItem>> => {
  const res = await apiClient
    .get('review/writable', {
      searchParams: { offset, limit },
    })
    .json<{
      data: {
        items: ReviewWritableItemRaw[];
        total: number;
      };
    }>();

  const list = res.data.items ?? [];

  return {
    data: list.map((r) => {
      const movingType = convertMovingType(r.movingType);

      if (!movingType) {
        throw new Error(`Invalid movingType: ${r.movingType}`);
      }

      return {
        id: r.id,
        driverName: r.driver.name,
        description: r.driver.driverProfile.shortIntro,
        driverImageUrl: r.driver.driverProfile.imageUrl ?? undefined,
        movingType,
        pickedDriver: r.isDesignated,
        pickupAddress: r.from ? `${r.from.sido} ${r.from.sigungu}` : '',
        dropoffAddress: r.to ? `${r.to.sido} ${r.to.sigungu}` : '',
        movingDate: convertDateType1(new Date(r.movingDate)),
        estimatedPrice: r.price ?? 0,
      };
    }),
    total: res.data.total,
  };
};

// 내가 작성한 리뷰
export const getReviewWritten = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}): Promise<OffsetPaginationResponse<ReviewWrittenItem>> => {
  const res = await apiClient
    .get('review/written', {
      searchParams: { offset, limit },
    })
    .json<{
      data: {
        items: getReviewWrittenItemRaw[];
        total: number;
      };
    }>();

  const list = res.data.items ?? [];

  return {
    data: list.map((r) => {
      const movingType = convertMovingType(r.movingType);

      if (!movingType) {
        throw new Error(`Invalid movingType: ${r.movingType}`);
      }

      return {
        id: r.id,
        rating: r.rating,
        content: r.content,
        updatedAt: convertDateType3(new Date(r.updatedAt)),
        driverName: r.driver.name,
        description: r.driver.driverProfile.shortIntro,
        driverImageUrl: r.driver.driverProfile.imageUrl ?? undefined,
        movingType,
        pickedDriver: r.isDesignated,
        pickupAddress: r.from ? `${r.from.sido} ${r.from.sigungu}` : '',
        dropoffAddress: r.to ? `${r.to.sido} ${r.to.sigungu}` : '',
        movingDate: convertDateType1(new Date(r.movingDate)),
      };
    }),
    total: res.data.total,
  };
};

// 리뷰 작성하기
export const createReview = async ({
  reviewId,
  rating,
  content,
}: {
  reviewId: string;
  rating: number;
  content: string;
}) => {
  return apiClient.patch(`review/${reviewId}`, {
    json: {
      rating,
      content,
    },
  });
};
