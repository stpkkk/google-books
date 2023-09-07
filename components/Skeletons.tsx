import React from 'react';
import { useAppSelector } from '@/redux/hooks';

export const SkeletonBookList: React.FC = () => {
  const { startIndex } = useAppSelector((state) => state.booksSlice);
  return (
    <div className="w-full p-8 sm:p-4 max-w-[1200px] animate-pulse">
      <div className="my-4 bg-gray-200 max-w-[153px] h-6 mx-auto rounded-lg" />
      <ul className="grid grid-cols-4 sm:grid-cols-1 gap-4 mb-8">
        {Array.from({ length: startIndex }).map((_, index) => (
          <li key={index}>
            <div className="aspect-square h-[300] w-full overflow-hidden rounded-lg bg-gray-200" />
            <p className="mt-2 h-4 w-1/2 rounded-lg bg-gray-200" />
            <p className="mt-2 block h-4 rounded-lg bg-gray-200 text-sm font-medium" />
            <p className="mt-2 block h-4 rounded-lg bg-gray-200 text-sm font-medium" />
          </li>
        ))}
      </ul>
      <div className="mx-auto p-8 bg-gray-200 max-w-[320px] h-[56px] rounded-lg" />
    </div>
  );
};

export const SkeletonBook: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-272px)] sm:flex-col animate-pulse">
      <div className="flex_center flex-1 bg-gray-100">
        <div className="relative overflow-hidden self-center w-[350px] h-[500px] rounded-lg bg-gray-200" />
      </div>
      <div className="flex flex-1 flex-col gap-4 bg-white p-8 sm:px-4">
        <div className="mt-2 block h-4 max-w-[320px] rounded-lg bg-gray-200 text-sm font-medium" />
        <div className="mt-2 block h-8 max-w-[700px] rounded-lg bg-gray-200 text-sm font-medium" />
        <div className="mt-2 block h-4 max-w-[200px] rounded-lg bg-gray-200 text-sm font-medium" />
        <div className="mt-2 block h-80 w-full rounded-lg bg-gray-200 text-sm font-medium" />
      </div>
    </div>
  );
};
