'use client';

import React, { useEffect } from 'react';
import { BookList, ErrorHandling, SkeletonBookList } from '@/components';
import BackToTopButton from '@/components/BackToTopButton';
import { setBooks } from '@/redux/features/booksSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetAllBooksQuery } from '@/redux/services/googleBooksApi';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { searchTerm, selectedOptions, startIndex, books } = useAppSelector(
    (state) => state.booksSlice,
  );
  const params = {
    searchTerm: searchTerm || 'книга',
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

  useEffect(() => {
    if (data && data.items) {
      const updatedBooks = [...books, ...data.items];
      dispatch(setBooks(updatedBooks));
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setBooks([]));
    refetch();
  }, [
    refetch,
    selectedOptions.sorting,
    selectedOptions.categories,
    searchTerm,
    dispatch,
  ]);

  if (error) return <ErrorHandling error={error} />;

  return (
    <div className='flex_center w-full min-h-[calc(100vh-272px)] flex-col '>
      {isLoading || isFetching ? (
        <SkeletonBookList />
      ) : (
        <>
          <BookList totalItems={data?.totalItems} />
          <BackToTopButton />
        </>
      )}
    </div>
  );
}
