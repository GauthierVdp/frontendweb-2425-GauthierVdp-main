import { prisma } from '../data';
import ServiceError from '../core/serviceError';
import handleDBError from './_handleDBError';
import type {
  Author,
  AuthorCreateInput,
  AuthorUpdateInput,
} from '../types/author';

export const getAll = async (): Promise<Author[]> => {
  return prisma.author.findMany();
};

export const getById = async (id: number): Promise<Author> => {
  const author = await prisma.author.findUnique({ where: { id } });

  if (!author) {
    throw ServiceError.notFound('No author with this id exists');
  }

  return author;
};

export const create = async (data: AuthorCreateInput): Promise<Author> => {
  try {
    return await prisma.author.create({
      data,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const updateById = async (id: number, changes: AuthorUpdateInput): Promise<Author> => {
  try {
    return await prisma.author.update({
      where: { id },
      data: changes,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const deleteById = async (id: number) => {
  try {
    await prisma.author.delete({ where: { id } });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const checkAuthorExists = async (id: number) => {
  const count = await prisma.author.count({ where: { id } });
  if (count === 0) {
    throw ServiceError.notFound('No author with this id exists');
  }
};
