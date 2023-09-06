import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBook } from "@/interfaces";

type Params = {
  searchTerm: string;
  startIndex: number;
  limit: number;
  orderBy: string;
  subject: string;
};

interface IBooksResponse {
  items: IBook[];
  totalItems: number;
}

const API_URL = "https://www.googleapis.com/books/v1/volumes/";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const googleBooksApi = createApi({
  reducerPath: "googleBooksApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getBooks: builder.query<IBooksResponse, Params>({
      query: ({ searchTerm, startIndex = 0, limit, orderBy, subject }) =>
        `?q=${searchTerm}+${subject}&orderBy=${orderBy}&maxResults=${limit}&startIndex=${startIndex}&key=${apiKey}`,
    }),
  }),
});

export const { useGetBooksQuery } = googleBooksApi;

// `?q=${searchTerm}${subject}${orderBy}&maxResults=${limit}&startIndex=${startIndex}&key=${apiKey}`,