'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import noCover from '../../public/assets/images/book-no-cover.png';
import { ErrorHandling, SkeletonBook } from '@/components';
import { useAppSelector } from '@/redux/hooks';
import { useGetBookQuery } from '@/redux/services/googleBooksApi';

const BookPage: React.FC = () => {
  const { volumeId } = useAppSelector((state) => state.booksSlice);
  const pathname = usePathname();
  const { data, error, isLoading, isFetching } = useGetBookQuery({
    volumeId: volumeId || pathname,
  });
  const { imageLinks, title, categories, authors, description } =
    data?.volumeInfo || {};
  const descriptionHtml = { __html: description || '' };

  if (error) return <ErrorHandling error={error} />;

  return isLoading || isFetching ? (
    <SkeletonBook />
  ) : (
    <div className='flex min-h-[calc(100vh-272px)] sm:flex-col'>
      <div className='flex_center flex-1 bg-gray-100'>
        <div className='relative overflow-hidden self-center w-[350px] h-[500px] rounded-lg'>
          <Image
            src={imageLinks?.thumbnail || noCover.src}
            alt={title || ''}
            fill
            quality={100}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='object-contain drop-shadow-custom p-4'
          />
        </div>
      </div>
      <div className='flex flex-1 flex-col gap-4 bg-white p-8 sm:px-4'>
        <div>
          <span>{categories?.[0]}</span>
        </div>
        <h1 className='text-2xl font-bold mb-4'>{title}</h1>
        <div>
          <span className='text-sm text-gray-500 underline underline-offset-4'>
            {authors || ''}
          </span>
        </div>
        {description && (
          <div className='text-gray-700 border p-4'>
            <div dangerouslySetInnerHTML={descriptionHtml} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPage;
