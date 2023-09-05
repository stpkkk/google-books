"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useGetBooksQuery } from "@/redux/services/googleBooksApi";
import {
  fetchBooksFailure,
  fetchBooksStart,
  fetchBooksSuccess,
  setBooksToRender,
} from "@/redux/features/booksSlice";
import BookItem from "./BookItem";
import { useAppSelector } from "@/redux/hooks";
import { IBook } from "@/interfaces";

function BookList() {
  const dispatch = useDispatch();
  const { searchTerm, booksToRender } = useAppSelector(
    state => state.booksSlice
  );
  const params = {
    searchTerm,
    limit: booksToRender,
    startIndex: 0,
    // orderBy:
  };

  const { data, error, isError, isLoading, isFetching, refetch } =
    useGetBooksQuery(params, {
      skip: !searchTerm,
    });

  useEffect(() => {
    if (searchTerm) {
      dispatch(setBooksToRender(30));
      refetch();
    }
  }, [searchTerm, refetch]);

  const handleLoadMore = () => {
    const newBooksToRender = booksToRender + 2;
    dispatch(setBooksToRender(newBooksToRender));
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(fetchBooksStart());
    } else if (error) {
      dispatch(fetchBooksFailure(error));
    } else if (data) {
      dispatch(fetchBooksSuccess(data.items));
    }
  }, [data, error, isLoading, dispatch]);

  if (isLoading || isFetching) {
    return <div className="text-black">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="my-16 text-black text-lg font-bold">
        Something went wrong 💥💥💥. Try again!
      </div>
    );
  }

  return (
    <div className="w-full p-8 sm:p-4 bg-white text-black max-w-[1200px]">
      {data && searchTerm ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.items.map((book: IBook) => (
            <li key={book.id}>
              <BookItem book={book} />
            </li>
          ))}
        </ul>
      ) : null}

      {searchTerm && (
        <div className="flex_center p-8">
          <button
            className="max-w-xs w-full mt-auto p-4 text-white bg-black hover:opacity-50"
            onClick={handleLoadMore}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}

export default BookList;

