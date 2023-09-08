'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetAllBooksQuery } from '@/redux/services/googleBooksApi';
import { setBooks } from '@/redux/features/booksSlice';
import { BookList, ErrorHandling, SkeletonBookList } from '@/components';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { searchTerm, selectedOptions, startIndex, books } = useAppSelector(
    (state) => state.booksSlice,
  );
  const params = {
    searchTerm,
    subject:
      selectedOptions.categories === 'all'
        ? ''
        : `+subject:${selectedOptions.categories}`,
    maxResults: 30,
    startIndex,
    orderBy: selectedOptions.sorting,
  };
  const { data, error, isLoading, isFetching, refetch } =
    useGetAllBooksQuery(params);

  console.log(params);

  useEffect(() => {
    if (data && data.items) {
      const updatedBooks = [...books, ...data.items];
      dispatch(setBooks(updatedBooks));
    }
  }, [data]);

  useEffect(() => {
    dispatch(setBooks([]));
    refetch();
  }, [refetch, selectedOptions.sorting, selectedOptions.categories]);

  if (error) return <ErrorHandling error={error} />;

  return (
    <div className="flex_center w-full min-h-[calc(100vh-272px)] flex-col ">
      {isLoading || isFetching ? (
        <SkeletonBookList />
      ) : (
        <BookList totalItems={data?.totalItems} />
      )}
    </div>
  );
}
