// src/service/genre.ts
import { prisma } from '../data';
import ServiceError from '../core/serviceError';
import handleDBError from './_handleDBError';
import type {
  Genre,
  GenreCreateInput,
  GenreUpdateInput,
} from '../types/genre';

export const getAll = async (): Promise<Genre[]> => {
  return prisma.genre.findMany();
};

export const getById = async (id: number): Promise<Genre> => {
  const genre = await prisma.genre.findUnique({ where: { id } });

  if (!genre) {
    throw ServiceError.notFound('No genre with this id exists');
  }

  return genre;
};

export const create = async (data: GenreCreateInput): Promise<Genre> => {
  try {
    return await prisma.genre.create({
      data,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const updateById = async (id: number, changes: GenreUpdateInput): Promise<Genre> => {
  try {
    return await prisma.genre.update({
      where: { id },
      data: changes,
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const deleteById = async (id: number) => {
  try {
    await prisma.genre.delete({ where: { id } });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const checkGenreExists = async (id: number) => {
  const count = await prisma.genre.count({ where: { id } });
  if (count === 0) {
    throw ServiceError.notFound('No genre with this id exists');
  }
};
