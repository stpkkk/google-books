import React from 'react';
import BookItem from './BookItem';
import LoadMoreButton from './LoadMoreButton';
import { useAppSelector } from '@/redux/hooks';

type BookListProps = {
  totalItems?: number;
};

const BookList: React.FC<BookListProps> = ({ totalItems }) => {
  const { books } = useAppSelector((state) => state.booksSlice);

  const isBookNotFounded = books && (totalItems || 0) <= 0;

  return (
    <div className='w-full p-8 sm:p-4 max-w-[1200px]'>
      <div className='flex_center my-4'>
        <span className='font-bold'>
          {isBookNotFounded
            ? 'Can not find this book'
            : `Found ${totalItems} results`}
        </span>
      </div>
      <ul className='grid grid-cols-4 sm:grid-cols-1 gap-4'>
        {books.map((book) => (
          <li key={crypto.randomUUID()}>
            <BookItem book={book} />
          </li>
        ))}
      </ul>
      {!isBookNotFounded && <LoadMoreButton />}
    </div>
  );
};

export default BookList;
