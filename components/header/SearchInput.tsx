'use client';
import React, { ChangeEvent } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setSearchTerm } from '@/redux/features/booksSlice';
import SearchIcon from './SearchIcon';

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="relative text-gray-600 flex w-full max-w-[600px] mb-6">
      <input
        type="text"
        className="bg-white h-10 px-5 pr-10 focus:outline-none w-full"
        placeholder="Search..."
        onChange={handleInputChange}
      />
      <div className="absolute right-0 top-0 mt-2.5 mr-3">
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchInput;
