import { MAX_IMAGE_HEIGHT_PX, MAX_IMAGE_WIDTH_PX } from '../constants/image.constants';

const blobToFile = (blob: Blob, fileName: string) => {
  return new File([blob], fileName, { type: blob.type, lastModified: Date.now() });
};

const getExtension = (fileName: string) => {
  const dot = fileName.lastIndexOf('.');
  if (dot === -1) return '';
  return fileName.slice(dot);
};

const replaceExtension = (fileName: string, nextExt: string) => {
  const ext = getExtension(fileName);
  if (!ext) return `${fileName}${nextExt}`;
  return fileName.slice(0, -ext.length) + nextExt;
};

const loadImageElement = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('이미지 정보를 불러오지 못했습니다.'));
    };

    image.src = url;
  });
};

const canvasToBlob = (canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('이미지 변환에 실패했습니다.'));
          return;
        }
        resolve(blob);
      },
      type,
      quality,
    );
  });
};

export type TransformImageOptions = {
  // 최종 포맷 (기본 webp)
  outputType?: 'image/webp' | 'image/jpeg';
  // 0~1 (기본 0.85)
  quality?: number;
};

/**
 * 이미지 파일을 최대 512x512로(비율 유지) 리사이즈/압축하여 반환합니다.
 * - 이미 512 이하인 경우에도 용량 절감을 위해 재인코딩될 수 있습니다.
 */
export const transformImageForUpload = async (
  file: File,
  options: TransformImageOptions = {},
): Promise<File> => {
  const outputType = options.outputType ?? 'image/webp';
  const quality = options.quality ?? 0.85;

  const image = await loadImageElement(file);

  const sourceWidth = image.naturalWidth;
  const sourceHeight = image.naturalHeight;

  if (!sourceWidth || !sourceHeight) {
    throw new Error('이미지 크기를 확인할 수 없습니다.');
  }

  const scale = Math.min(1, MAX_IMAGE_WIDTH_PX / sourceWidth, MAX_IMAGE_HEIGHT_PX / sourceHeight);
  const targetWidth = Math.max(1, Math.round(sourceWidth * scale));
  const targetHeight = Math.max(1, Math.round(sourceHeight * scale));

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('이미지 변환 컨텍스트를 생성할 수 없습니다.');
  }

  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

  const blob = await canvasToBlob(canvas, outputType, quality);

  const nextExt = outputType === 'image/jpeg' ? '.jpg' : '.webp';
  const nextName = replaceExtension(file.name || 'image', nextExt);

  return blobToFile(blob, nextName);
};
