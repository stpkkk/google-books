import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch } from '@/redux/hooks';
import { setVolumeId } from '@/redux/features/booksSlice';
import noCover from '../../public/assets/images/book-no-cover.png';
import { Book } from '@/types';

type BookItemProps = {
  book: Book;
};

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const dispatch = useAppDispatch();
  const { imageLinks, title, categories, authors, publishedDate } =
    book.volumeInfo;
  const authorsComma = authors ? authors.join(', ') : '';

  const handleGetVolumeId = (clickedItemId: string) => {
    dispatch(setVolumeId(clickedItemId));
  };

  return (
    <Link href={`/${book.id}`}>
      <div
        className="flex flex-col h-full p-4 bg-gray-100 hover:bg-gray-50 shadow-md rounded-lg cursor-pointer"
        onClick={() => handleGetVolumeId(book.id)}
      >
        <div className="relative overflow-hidden self-center w-[180px] h-[200px]  mb-4 rounded-lg ">
          <Image
            src={imageLinks?.smallThumbnail || noCover.src}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain drop-shadow-custom py-4"
          />
        </div>
        <div className="flex flex-col flex-grow items-start">
          <div className="mb-2">
            <span className="text-sm text-gray-400 underline underline-offset-4">
              {categories || ''}
            </span>
          </div>
          <h3 className="text-md font-bold mb-2">{title || ''}</h3>
          <div className="flex-grow" />
          <div>
            <span className="text-xs">Published: {publishedDate || ''}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">{authorsComma}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookItem;
