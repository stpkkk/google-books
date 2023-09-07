'use client';
import React, { KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setSearchTerm } from '@/redux/features/booksSlice';
import SearchIcon from './SearchIcon';

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchTermLocal, setSearchTermLocal] = useState<string>('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermLocal(e.target.value);
  };

  const handleSearchButtonClick = () => {
    dispatch(setSearchTerm(searchTermLocal));
    router.push('/');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setSearchTerm(searchTermLocal));
      router.push('/');
    }
  };

  return (
    <div className="relative text-gray-600 flex w-full max-w-[600px] mb-6">
      <input
        className="bg-white h-10 px-5 pr-10 focus:outline-none w-full"
        type="text"
        placeholder="Search..."
        value={searchTermLocal}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-gray-300 p-2 px-4 hover:bg-gray-200"
        onClick={handleSearchButtonClick}
        type="button"
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchInput;



