import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBook } from "@/interfaces";

interface IParams {
  searchTerm: string;
  startIndex?: number;
  limit: number;
}

export type BooksResponse = {
  items: IBook[];
};

const API_URL = "https://www.googleapis.com/books/v1/volumes/";

export const googleBooksApi = createApi({
  reducerPath: "googleBooksApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getBooks: builder.query<BooksResponse, IParams>({
      query: ({ searchTerm, startIndex = 0, limit }) =>
        `?q=${searchTerm}&maxResults=${limit}&startIndex=${startIndex}`,
    }),

    // getBooksBySearch: builder.query<IBook[], string>({
    //   query: searchTerms => `?q=${searchTerms}`,
    // }),
  }),
});

// export const { useGetBooksQuery, useGetBooksBySearchQuery } = googleBooksApi;
export const { useGetBooksQuery } = googleBooksApi;
