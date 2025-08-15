import Router from '@koa/router';
import Joi from 'joi';
import * as bookService from '../service/book';
import type { KoaContext, KoaRouter, AppState, AppContext } from '../types/xkoa';

import type {
  GetAllBooksResponse,
  GetBookByIdResponse,
  CreateBookResponse,
  UpdateBookResponse,
  BookCreateInput,
  BookUpdateInput,
} from '../types/book';
import type { IdParams } from '../types/common';



const getAllBooks = async (ctx: KoaContext<GetAllBooksResponse>) => {
  const books = await bookService.getAll();
  ctx.body = { items: books };
};
getAllBooks.validationScheme = null;

const getBookById = async (ctx: KoaContext<GetBookByIdResponse, IdParams>) => {
  const id = parseInt(ctx.params.id as unknown as string, 10);
  if (isNaN(id)) {
    ctx.throw(400, "Invalid book ID");
  }
  const book = await bookService.getById(id);
  ctx.body = book;
};
getBookById.validationScheme = {
  params: { id: Joi.number().integer().positive() },
};

const createBook = async (
  ctx: KoaContext<CreateBookResponse, void, BookCreateInput>
) => {
  const bookData = ctx.request.body;
  if (!bookData || !bookData.title || !bookData.authorIds) {
    ctx.throw(400, "Invalid book data");
  }
  try {
    const newBook = await bookService.create(bookData);
    ctx.body = newBook;
    ctx.status = 201;
  } catch (error) {
    if (error instanceof Error) {
      ctx.throw(500, error.message);
    } else {
      ctx.throw(500, 'Unknown error');
    }
  }
};
createBook.validationScheme = {
  body: Joi.object({
    title: Joi.string().required(),
    authorIds: Joi.array().items(Joi.number().integer().positive()).required(),
    // Add other fields as necessary
  }),
};

const updateBook = async (
  ctx: KoaContext<UpdateBookResponse, IdParams, BookUpdateInput>
) => {
  const id = parseInt(ctx.params.id as unknown as string, 10);
  if (isNaN(id)) {
    ctx.throw(400, "Invalid book ID");
  }
  const updatedBook = await bookService.updateById(id, ctx.request.body);
  ctx.body = updatedBook;
};

updateBook.validationScheme = {
  params: { id: Joi.number().integer().positive() },
  body: Joi.object({
    title: Joi.string(),
    authorIds: Joi.array().items(Joi.number().integer().positive()),
    genreIds: Joi.array().items(Joi.number().integer().positive()),
    // Add other fields as necessary
  }),
};

const deleteBook = async (ctx: KoaContext<{ message: string }, IdParams>) => {
  const id = parseInt(ctx.params.id as unknown as string, 10);
  if (isNaN(id)) {
    ctx.throw(400, "Invalid book ID");
  }
  await bookService.deleteById(id);
  ctx.body = { message: "Book deleted successfully" };
  ctx.status = 200;
};

deleteBook.validationScheme = {
  params: { id: Joi.number().integer().positive() },
};

/**
 * Install book routes
 */
export default function installBookRouter(parent: KoaRouter) {
  const router = new Router<AppState, AppContext>({
    prefix: '/books',
  });

  router.get('/', getAllBooks);
  router.get('/:id', getBookById);
  router.post('/', createBook);
  router.put('/:id', updateBook);
  router.delete('/:id', deleteBook);
  // Add other routes as needed

  parent
    .use(router.routes())
    .use(router.allowedMethods());
}