import React from "react";
import Image from "next/image";
import { IBook } from "@/interfaces";
import noCover from "../../public/assets/images/book-no-cover.png";

type BookItemProps = {
  book: IBook;
};

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-100 shadow-md rounded-lg cursor-pointer">
      <div className="relative overflow-hidden self-center w-[180px] h-[200px]  mb-4 rounded-lg ">
        <Image
          src={book.volumeInfo.imageLinks?.thumbnail || noCover.src}
          alt={book.volumeInfo.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain drop-shadow-custom py-4"
        />
      </div>
      <div className="flex flex-col flex-grow items-start">
        <div className="mb-2">
          <span className="text-sm text-gray-400 underline underline-offset-4">
            {book.volumeInfo.categories || ""}
          </span>
        </div>
        <h3 className="text-md font-bold mb-2">
          {book.volumeInfo.title || ""}
        </h3>
        <div className="flex-grow" />
        <div>
          <span className="text-xs">
            Published: {book.volumeInfo.publishedDate || ""}
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-500">
            {book.volumeInfo.authors
              ? book.volumeInfo.authors.map(a => a + " ")
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
