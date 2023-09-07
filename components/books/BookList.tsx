'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetAllBooksQuery } from '@/redux/services/googleBooksApi';
import BookItem from './BookItem';
import LoadMoreButton from './LoadMoreButton';
import { ErrorHandling } from '../ErrorHandling';
import { SkeletonBookList } from '../Skeletons';
import { setBooks } from '@/redux/features/booksSlice';

function BookList() {
  const dispatch = useAppDispatch();
  const { searchTerm, selectedOptions } = useAppSelector(
    (state) => state.booksSlice,
  );
  const { startIndex, books } = useAppSelector((state) => state.booksSlice);

  const params = {
    searchTerm,
    subject: selectedOptions.categories,
    maxResults: 30,
    startIndex,
    orderBy: selectedOptions.sorting,
  };

  const { data, error, isLoading, isFetching } = useGetAllBooksQuery(params);

  const isBookNotFounded = data && data.totalItems <= 0;

  useEffect(() => {
    if (data && data.items) {
      const updatedBooks = [...books, ...data.items];
      dispatch(setBooks(updatedBooks));
    }
  }, [data]);

  if (error) return <ErrorHandling error={error} />;

  return isLoading || isFetching ? (
    <SkeletonBookList />
  ) : (
    <div className="w-full p-8 sm:p-4 max-w-[1200px]">
      <div className="flex_center my-4">
        <span className="font-bold">
          {isBookNotFounded
            ? "Can't find this book"
            : `Found ${data?.totalItems} results`}
        </span>
      </div>
      <ul className="grid grid-cols-4 sm:grid-cols-1 gap-4">
        {books.map((book) => (
          <li key={crypto.randomUUID()}>
            <BookItem book={book} />
          </li>
        ))}
      </ul>
      {!isBookNotFounded && <LoadMoreButton />}
    </div>
  );
}

export default BookList;
