export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  options?: {
    maxVisiblePages?: number;
    edgePageCount?: number;
    siblingCount?: number;
  };
}

export interface EllipsisItem {
  type: 'ellipsis';
  start: number;
  end: number;
}

export type PageItem = number | EllipsisItem;
