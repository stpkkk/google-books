import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBook } from '@/interfaces';

type GetAllBooksParams = {
  searchTerm: string;
  startIndex: number;
  limit: number;
  orderBy: string;
  subject: string;
};

type GetBookParams = {
  volumeId?: string;
};

interface IBooksResponse {
  items: IBook[];
  totalItems: number;
}

const API_URL = 'https://www.googleapis.com/books/v1/volumes/';
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const googleBooksApi = createApi({
  reducerPath: 'googleBooksApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllBooks: builder.query<IBooksResponse, GetAllBooksParams>({
      query: ({ searchTerm, startIndex = 0, limit, orderBy, subject }) =>
        `?q=${searchTerm}+${subject}&orderBy=${orderBy}&maxResults=${limit}&startIndex=${startIndex}&key=${apiKey}`,
    }),

    getBook: builder.query<IBook, GetBookParams>({
      query: ({ volumeId }) => `${volumeId}?&key=${apiKey}`,
    }),
  }),
});

export const { useGetAllBooksQuery, useGetBookQuery } = googleBooksApi;

// `?q=${searchTerm}${subject}${orderBy}&maxResults=${limit}&startIndex=${startIndex}&key=${apiKey}`,
