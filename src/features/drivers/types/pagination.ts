//getApi의 리턴 타입 준수
export interface CursorResponse<T> {
  items: T[]; //아이템(요소)
  hasNext?: boolean; //남은 요소가 있는지
  nextCursor?: string; //다음 커서
}
