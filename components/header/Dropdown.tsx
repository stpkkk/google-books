"use client";
import React, { useState } from "react";

type DropdownProps = {
  items: string[];
  label: string;
};

const Dropdown: React.FC<DropdownProps> = ({ items, label }) => {
  const [selectedOption, setSelectedOption] = useState(items[0]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (item: string) => {
    setSelectedOption(item);
    setIsOpen(false);
  };

  return (
    <div className="relative flex_center gap-4 max-w-xs w-full">
      <label className="whitespace-nowrap" htmlFor={label}>
        {label}
      </label>
      <div className="relative text-black bg-white max-w-xs w-full">
        <button
          onClick={toggleDropdown}
          className="outline-none h-10 w-full border-gray-300 rounded-md pl-3 pr-10 py-2 text-left"
        >
          {selectedOption}
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className={`w-5 h-5 transition-transform transform ${
                isOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
        {isOpen && (
          <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md ">
            {items.map(item => (
              <li
                key={item}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={() => selectOption(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
