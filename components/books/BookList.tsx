"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetBooksQuery } from "@/redux/services/googleBooksApi";
import { setBooksToRender } from "@/redux/features/booksSlice";
import BookItem from "./BookItem";
import LoadMoreButton from "./LoadMoreButton";

function BookList() {
  const dispatch = useAppDispatch();
  const { searchTerm, booksToRender, selectedOptions } = useAppSelector(
    state => state.booksSlice
  );

  const params = {
    searchTerm: searchTerm,
    subject: selectedOptions.categories,
    limit: booksToRender,
    startIndex: 0,
    orderBy: selectedOptions.sorting,
  };

  // const params = {
  //   searchTerm: searchTerm,
  //   subject:
  //     selectedOptions.categories === "all"
  //       ? ""
  //       : `${"+" + selectedOptions.categories + "&"}`,
  //   orderBy: `${"orderBy=" + selectedOptions.sorting}`,
  //   limit: booksToRender,
  //   startIndex: 0,
  // };

  // console.log(params)

  const { data, error, isLoading, isFetching, refetch } =
    useGetBooksQuery(params);

  const isBookNotFounded = data && data.totalItems <= 0;

  useEffect(() => {
    if (searchTerm) {
      dispatch(setBooksToRender(30));
      refetch();
    }
  }, [searchTerm, refetch]);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);

      return (
        <div className="text-center my-16 text-lg font-bold">
          <div>An error has occurred 💥💥💥</div>
          <div>{errMsg}</div>
        </div>
      );
    } else {
      return <div>{error.message}</div>;
    }
  }

  return (
    <div className="w-full p-8 sm:p-4 max-w-[1200px]">
      <div className="flex_center my-4">
        <span className="font-bold">
          {isBookNotFounded
            ? "Can't find this book. Check your prompt!"
            : `Found ${data?.totalItems} results`}
        </span>
      </div>
      {data && data.items && (
        <ul className="grid grid-cols-4 sm:grid-cols-1 gap-4">
          {data.items.map(book => (
            <li key={crypto.randomUUID()}>
              <BookItem book={book} />
            </li>
          ))}
        </ul>
      )}
      {!isBookNotFounded && <LoadMoreButton />}
    </div>
  );
}

export default BookList;


