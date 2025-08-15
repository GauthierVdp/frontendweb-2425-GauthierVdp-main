import Router from '@koa/router';
import Joi from 'joi';
import * as authorService from '../service/author';
import validate from '../core/validation';
import type { AppContext, AppState } from '../types/xkoa';
import type { KoaContext, KoaRouter } from '../types/xkoa';
import type {
  GetAllAuthorsResponse,
  GetAuthorByIdResponse,
  CreateAuthorResponse,
  UpdateAuthorResponse,
  AuthorCreateInput,
  AuthorUpdateInput,
} from '../types/author';
import type { IdParams } from '../types/common';



const getAllAuthors = async (ctx: KoaContext<GetAllAuthorsResponse>) => {
  const authors = await authorService.getAll();
  ctx.body = { items: authors };
};
getAllAuthors.validationScheme = null;

const getAuthorById = async (ctx: KoaContext<GetAuthorByIdResponse, IdParams>) => {
  const author = await authorService.getById(ctx.params.id);
  ctx.body = author;
};
getAuthorById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const createAuthor = async (ctx: KoaContext<CreateAuthorResponse, void, AuthorCreateInput>) => {
  const author = await authorService.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = author;
};
createAuthor.validationScheme = {
  body: {
    name: Joi.string().max(255).required(),
  },
};

const updateAuthor = async (ctx: KoaContext<UpdateAuthorResponse, IdParams, AuthorUpdateInput>) => {
  const author = await authorService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = author;
};
updateAuthor.validationScheme = {
  params: { id: Joi.number().integer().positive() },
  body: {
    name: Joi.string().max(255).optional(),
  },
};

const deleteAuthor = async (ctx: KoaContext<{ message: string }, IdParams>) => {
  const id = parseInt(ctx.params.id as unknown as string, 10);
  if (isNaN(id)) {
    ctx.throw(400, "Invalid author ID");
  }
  await authorService.deleteById(id);
  ctx.body = { message: "Author deleted successfully" };
  ctx.status = 200;
};

deleteAuthor.validationScheme = {
  params: { id: Joi.number().integer().positive() },
};

export default (parent: KoaRouter) => {
  const router = new Router<AppState, AppContext>({
    prefix: '/authors',
  });


  router.get('/', validate(getAllAuthors.validationScheme), getAllAuthors);
  router.get('/:id', validate(getAuthorById.validationScheme), getAuthorById);
  router.post('/', validate(createAuthor.validationScheme), createAuthor);
  router.put('/:id', validate(updateAuthor.validationScheme), updateAuthor);
  router.delete('/:id', validate(deleteAuthor.validationScheme), deleteAuthor);

  parent.use(router.routes()).use(router.allowedMethods());
};
