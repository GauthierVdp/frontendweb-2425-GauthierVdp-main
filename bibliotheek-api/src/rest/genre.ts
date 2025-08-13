// src/rest/genre.ts
import Router from '@koa/router';
import Joi from 'joi';
import * as genreService from '../service/genre';
import validate from '../core/validation';
import type { AppContext, AppState } from '../types/xkoa';
import type { KoaContext, KoaRouter } from '../types/xkoa';
import type {
  GetAllGenresResponse,
  GetGenreByIdResponse,
  CreateGenreResponse,
  UpdateGenreResponse,
  GenreCreateInput,
  GenreUpdateInput,
} from '../types/genre';
import type { IdParams } from '../types/common';

/**
 * Genre routes
 */

const getAllGenres = async (ctx: KoaContext<GetAllGenresResponse>) => {
  const genres = await genreService.getAll();
  ctx.body = { items: genres };
};
getAllGenres.validationScheme = null;

const getGenreById = async (ctx: KoaContext<GetGenreByIdResponse, IdParams>) => {
  const genre = await genreService.getById(ctx.params.id);
  ctx.body = genre;
};
getGenreById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const createGenre = async (ctx: KoaContext<CreateGenreResponse, void, GenreCreateInput>) => {
  const genre = await genreService.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = genre;
};
createGenre.validationScheme = {
  body: {
    name: Joi.string().max(255).required(),
  },
};

const updateGenre = async (ctx: KoaContext<UpdateGenreResponse, IdParams, GenreUpdateInput>) => {
  const genre = await genreService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = genre;
};
updateGenre.validationScheme = {
  params: { id: Joi.number().integer().positive() },
  body: {
    name: Joi.string().max(255).optional(),
  },
};

const deleteGenre = async (ctx: KoaContext<{ message: string }, IdParams>) => {
  const id = parseInt(ctx.params.id as unknown as string, 10);
  if (isNaN(id)) {
    ctx.throw(400, 'Invalid genre ID');
  }
  await genreService.deleteById(id);
  ctx.body = { message: 'Genre deleted successfully' };
  ctx.status = 200;
};
deleteGenre.validationScheme = {
  params: { id: Joi.number().integer().positive() },
};

export default (parent: KoaRouter) => {
  const router = new Router<AppState, AppContext>({
    prefix: '/genres',
  });

  // Require authentication for all genre routes

  router.get('/', validate(getAllGenres.validationScheme), getAllGenres);
  router.get('/:id', validate(getGenreById.validationScheme), getGenreById);
  router.post('/', validate(createGenre.validationScheme), createGenre);
  router.put('/:id', validate(updateGenre.validationScheme), updateGenre);
  router.delete('/:id', validate(deleteGenre.validationScheme), deleteGenre);

  parent.use(router.routes()).use(router.allowedMethods());
};
