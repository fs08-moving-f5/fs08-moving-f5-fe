// 이미지 업로드 제한 상수

// 허용 이미지 타입(MIME)
export const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

// 이미지 크기(해상도) 제한
// - 서버/디자인 정책에 맞춰 조정 가능
export const MAX_IMAGE_WIDTH_PX = 512;
export const MAX_IMAGE_HEIGHT_PX = 512;
