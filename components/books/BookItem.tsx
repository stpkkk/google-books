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
      <Image
        src={book.volumeInfo.imageLinks?.smallThumbnail || noCover.src}
        alt={book.volumeInfo.title}
        width={180}
        height={240}
        quality={100}
        className="self-center max-w-[180px] max-h-[240px] h-full w-full mb-4 shadow-2xl rounded-lg"
      />
      <div className="flex flex-col flex-grow items-start">
        <div className="text-sm text-gray-400 underline underline-offset-4">
          {book.volumeInfo.categories || ""}
        </div>
        <h3 className="text-xl font-bold mb-2">
          {book.volumeInfo.title || ""}
        </h3>
        <div className="flex-grow" />
        <div className="text-sm text-gray-500">
          {book.volumeInfo.authors || ""}
        </div>
      </div>
    </div>
  );
};

export default BookItem;
