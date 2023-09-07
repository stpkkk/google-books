export type Book = {
  id: string;
  volumeInfo: {
    categories?: string[];
    title: string;
    authors: string[];
    publishedDate: string;
    description: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
};
