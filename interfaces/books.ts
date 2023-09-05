export interface IBook {
  id: string;
  volumeInfo: {
    categories?: string[];
    title: string;
    authors: string[];
    publishedDate: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
}
