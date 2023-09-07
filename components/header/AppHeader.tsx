import React from 'react';
import SearchInput from './SearchInput';
import Dropdown from './Dropdown';
import { Categories, SortingBy } from '@/enums';

const AppHeader: React.FC = () => {
  const categoriesArray = Object.values(Categories);
  const sortingByArray = Object.values(SortingBy);

  return (
    <header className="bg-[url('../public/assets/images/library.jpg')] bg-center text-white">
      <div className="flex_center flex-col py-10 px-8 sm:px-4 sm:py-6">
        <h1 className="mb-10 text-5xl font-bold">Search for books</h1>
        <SearchInput />
        <div className="flex_center gap-6 sm:flex-wrap w-full">
          <Dropdown
            items={categoriesArray}
            label={'Categories'}
            dropdownId="categories"
          />
          <Dropdown
            items={sortingByArray}
            label={'Sorting by'}
            dropdownId="sorting"
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
