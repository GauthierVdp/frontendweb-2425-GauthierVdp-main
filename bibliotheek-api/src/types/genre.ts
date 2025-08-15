import type { Entity, ListResponse } from './common';

export interface Genre extends Entity {
  name: string;
}

export interface GenreCreateInput {
  name: string;
}

export interface GenreUpdateInput extends Partial<GenreCreateInput> {}

export interface GetAllGenresResponse extends ListResponse<Genre> {}
export interface GetGenreByIdResponse extends Genre {}
export interface CreateGenreResponse extends GetGenreByIdResponse {}
export interface UpdateGenreResponse extends GetGenreByIdResponse {}
