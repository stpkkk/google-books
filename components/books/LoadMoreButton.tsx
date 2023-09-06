import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBooksToRender } from "@/redux/features/booksSlice";

const LoadMoreButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { booksToRender } = useAppSelector(state => state.booksSlice);

  const handleLoadMore = () => {
    dispatch(setBooksToRender(booksToRender + 2));
  };

  return (
    <div className="flex_center p-8">
      <button
        className="max-w-xs w-full mt-auto p-4 text-white bg-black hover:opacity-50"
        onClick={handleLoadMore}
      >
        Load more
      </button>
    </div>
  );
};

export default LoadMoreButton;
