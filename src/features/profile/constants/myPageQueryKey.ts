const MY_PAGE_QUERY_KEY = {
  MY_PAGE: ['myPage'] as const,
  MY_PAGE_REVIEWS: (page: number, limit: number) => ['myPage', 'reviews', page, limit] as const,
} as const;

export default MY_PAGE_QUERY_KEY;
