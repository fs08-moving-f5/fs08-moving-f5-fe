import { CheckBox } from '@/shared/ui/button';

interface FavoritesMenuWrapperProps {
  selectAll: boolean;
  setSelectAll: (selectAll: boolean) => void;
  checkedCount: number;
  totalCount: number;
}

const FavoritesMenuWrapper = ({
  selectAll,
  setSelectAll,
  checkedCount,
  totalCount,
}: FavoritesMenuWrapperProps) => {
  return (
    <div className="container-responsive tab:max-w-[600px] mobile:max-w-[327px] tab:pt-[30px] tab:pb-[18px] mobile:pt-[22px] mobile:pb-[10px] flex max-w-[1200px] items-center justify-between pt-8 pb-7">
      <div className="flex items-center gap-1">
        <CheckBox shape="square" checked={selectAll} onChange={setSelectAll} />
        <div className="text-black-300 text-lg font-normal">
          전체선택({checkedCount}/{totalCount})
        </div>
      </div>
      <button type="button" className="cursor-pointer px-3 font-normal text-gray-400">
        선택 항목 삭제
      </button>
    </div>
  );
};

export default FavoritesMenuWrapper;
