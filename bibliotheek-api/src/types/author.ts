// author.ts
import type { Entity, ListResponse } from './common';

export interface Author extends Entity {
  name: string;
}

export interface AuthorCreateInput {
  name: string;
}

export interface AuthorUpdateInput extends Partial<AuthorCreateInput> {}

export interface GetAllAuthorsResponse extends ListResponse<Author> {}
export interface GetAuthorByIdResponse extends Author {}
export interface CreateAuthorResponse extends GetAuthorByIdResponse {}
export interface UpdateAuthorResponse extends GetAuthorByIdResponse {}

