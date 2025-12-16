import { PageItem } from '@/shared/types/pagination';

interface GenerateNumbersOptions {
  currentPage: number;
  totalPages: number;
  options?: {
    maxVisiblePages?: number;
    edgePageCount?: number;
    siblingCount?: number;
  };
}

const generateNumbers = ({ currentPage, totalPages, options = {} }: GenerateNumbersOptions) => {
  const { maxVisiblePages = 7, edgePageCount = 1, siblingCount = 0 } = options;

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: PageItem[] = [];

  const leftEdgeEnd = edgePageCount;
  const leftSiblingStart = Math.max(1, currentPage - siblingCount);
  const showLeftEllipsis = leftSiblingStart > leftEdgeEnd + 1;

  const rightEdgeStart = totalPages - edgePageCount + 1;
  const rightSiblingEnd = Math.min(totalPages, currentPage + siblingCount);
  const showRightEllipsis = rightSiblingEnd < rightEdgeStart - 1;

  for (let i = 1; i <= leftEdgeEnd; i++) {
    pages.push(i);
  }

  if (showLeftEllipsis) {
    pages.push({
      type: 'ellipsis',
      start: leftEdgeEnd + 1,
      end: leftSiblingStart - 1,
    });
  }

  const middleStart = Math.max(leftEdgeEnd + 1, leftSiblingStart);
  const middleEnd = Math.min(rightEdgeStart - 1, rightSiblingEnd);

  for (let i = middleStart; i <= middleEnd; i++) {
    pages.push(i);
  }

  if (showRightEllipsis) {
    pages.push({
      type: 'ellipsis',
      start: rightSiblingEnd + 1,
      end: rightEdgeStart - 1,
    });
  }

  for (let i = rightEdgeStart; i <= totalPages; i++) {
    pages.push(i);
  }

  return pages;
};

export default generateNumbers;
