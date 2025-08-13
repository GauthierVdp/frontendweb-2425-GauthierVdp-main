import { prisma } from '../data';
import ServiceError from '../core/serviceError';
import handleDBError from './_handleDBError';
import type {
  Book,
  BookCreateInput,
  BookUpdateInput
} from '../types/book';

// Helper to map Prisma's author/genre to API's authors/genres
function mapPrismaBookToBook(prismaBook: any): Book {
  return {
    id: prismaBook.id,
    title: prismaBook.title,
    authors: Array.isArray(prismaBook.author) ? prismaBook.author : [],
    genres: Array.isArray(prismaBook.genre) ? prismaBook.genre : [],
  };
}

export const getAll = async (): Promise<Book[]> => {
  const books = await prisma.book.findMany({
    include: {
      author: { select: { id: true, name: true } },
      genre: { select: { id: true, name: true } },
    },
  });
  return books.map(mapPrismaBookToBook);
};

export const getById = async (id: number): Promise<Book> => {
  if (isNaN(id)) {
    throw new Error("Invalid book id");
  }

  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true } },
      genre: { select: { id: true, name: true } },
    },
  });

  if (!book) {
    throw ServiceError.notFound('No book with this id exists');
  }

  return mapPrismaBookToBook(book);
};

export const create = async (data: BookCreateInput): Promise<Book> => {
  if (!data || !data.title || !data.authorIds || !data.genreIds) {
    throw new Error("Invalid book data");
  }
  const { title, authorIds, genreIds } = data;

  // Check if all authors exist
  const authorsCount = await prisma.author.count({
    where: {
      id: { in: authorIds }
    }
  });

  if (authorsCount !== authorIds.length) {
    throw new Error("One or more authors do not exist");
  }

  // Check if all genres exist
  const genresCount = await prisma.genre.count({
    where: {
      id: { in: genreIds }
    }
  });

  if (genresCount !== genreIds.length) {
    throw new Error("One or more genres do not exist");
  }

  try {
    const created = await prisma.book.create({
      data: {
        title,
        author: {
          connect: authorIds.map(id => ({ id })),
        },
        genre: {
          connect: genreIds.map(id => ({ id })),
        },
      },
      include: {
        author: { select: { id: true, name: true } },
        genre: { select: { id: true, name: true } },
      },
    });
    return mapPrismaBookToBook(created);
  } catch (error) {
    throw handleDBError(error);
  }
};

export const updateById = async (id: number, changes: BookUpdateInput): Promise<Book> => {
  const { title, authorIds, genreIds } = changes;

  try {
    // Build update object dynamically
    const data: any = {};
    if (title !== undefined) data.title = title;
    if (authorIds !== undefined) {
      data.author = {
        set: authorIds.map(aid => ({ id: aid })),
      };
    }
    if (genreIds !== undefined) {
      data.genre = {
        set: genreIds.map(gid => ({ id: gid })),
      };
    }

    const updated = await prisma.book.update({
      where: { id },
      data,
      include: {
        author: { select: { id: true, name: true } },
        genre: { select: { id: true, name: true } },
      },
    });
    return mapPrismaBookToBook(updated);
  } catch (error) {
    throw handleDBError(error);
  }
};

export const deleteById = async (id: number) => {
  try {
    await prisma.book.delete({ where: { id } });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const checkBookExists = async (id: number) => {
  const count = await prisma.book.count({ where: { id } });
  if (count === 0) {
    throw ServiceError.notFound('No book with this id exists');
  }
};