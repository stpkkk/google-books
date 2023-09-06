'use client';
import React, { KeyboardEvent, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setSearchTerm } from '@/redux/features/booksSlice';
import SearchIcon from './SearchIcon';
import { useRouter } from 'next/navigation';

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTermLocal] = useState<string>('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermLocal(e.target.value);
  };

  const handleSearchButtonClick = () => {
    dispatch(setSearchTerm(searchTerm));
    router.push('/');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setSearchTerm(searchTerm));
      router.push('/');
    }
  };

  return (
    <div className="relative text-gray-600 flex w-full max-w-[600px] mb-6">
      <input
        type="text"
        className="bg-white h-10 px-5 pr-10 focus:outline-none w-full"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-gray-300 p-2 px-4 hover:bg-gray-200"
        onClick={handleSearchButtonClick}
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchInput;



