import type { Entity, ListResponse } from './common';
import type { Author } from './author';
import type { Genre } from './genre';

export interface Book extends Entity {
  title: string;
  authors: Pick<Author, 'id' | 'name'>[];
  genres: Pick<Genre, 'id' | 'name'>[];
}

export interface BookCreateInput {
  title: string;
  authorIds: number[];
  genreIds: number[]; 
}

export interface BookUpdateInput extends Partial<BookCreateInput> {
  genreIds?: number[];
}

export interface GetAllBooksResponse extends ListResponse<Book> {}
export interface GetBookByIdResponse extends Book {}
export interface CreateBookResponse extends GetBookByIdResponse {}
export interface UpdateBookResponse extends GetBookByIdResponse {}
