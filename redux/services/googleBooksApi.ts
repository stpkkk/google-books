import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book } from '@/types';

type GetAllBooksParams = {
  searchTerm: string;
  subject: string;
  startIndex: number;
  maxResults: number;
  orderBy: string;
};

type GetBookParams = {
  volumeId?: string;
};

interface BooksResponse {
  items: Book[];
  totalItems: number;
}

const API_URL = 'https://www.googleapis.com/books/v1/volumes/';
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const googleBooksApi = createApi({
  reducerPath: 'googleBooksApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllBooks: builder.query<BooksResponse, GetAllBooksParams>({
      query: ({ searchTerm, subject, startIndex = 0, maxResults, orderBy }) =>
        `?q=${searchTerm}+${subject}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${orderBy}&key=${apiKey}`,
    }),

    getBook: builder.query<Book, GetBookParams>({
      query: ({ volumeId }) => `${volumeId}?&key=${apiKey}`,
    }),
  }),
});

export const { useGetAllBooksQuery, useGetBookQuery } = googleBooksApi;

