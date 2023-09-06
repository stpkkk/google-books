'use client';
import React from 'react';
import { useGetBookQuery } from '@/redux/services/googleBooksApi';
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import noCover from '../../public/assets/images/book-no-cover.png';
import { usePathname } from 'next/navigation';

const BookPage: React.FC = () => {
  const { volumeId } = useAppSelector((state) => state.booksSlice);
  const pathname = usePathname();
  const { data, error, isLoading, isFetching } = useGetBookQuery({
    volumeId: volumeId || pathname,
  });

  const descriptionHtml = { __html: data?.volumeInfo.description } as {
    __html: string;
  };

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    if ('status' in error) {
      const errMsg =
        'error' in error ? error.error : JSON.stringify(error.data);

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
    <div className="flex min-h-[calc(100vh-272px)] sm:flex-col">
      <div className="flex_center flex-1 bg-gray-100">
        <div className="relative overflow-hidden self-center w-[350px] h-[500px] rounded-lg ">
          <Image
            src={data?.volumeInfo.imageLinks?.thumbnail || noCover.src}
            alt={data?.volumeInfo.title || ''}
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain drop-shadow-custom p-4"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 bg-white p-8 sm:px-4">
        <div>
          <span>{data?.volumeInfo.categories?.at(0)}</span>
        </div>
        <h1 className="text-2xl font-bold mb-4">{data?.volumeInfo.title}</h1>
        <div>
          <span className="text-sm text-gray-500 underline underline-offset-4">
            {data?.volumeInfo.authors || ''}
          </span>
        </div>
        {data?.volumeInfo.description && (
          <div className="text-gray-700 border p-4">
            <div dangerouslySetInnerHTML={descriptionHtml} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPage;
