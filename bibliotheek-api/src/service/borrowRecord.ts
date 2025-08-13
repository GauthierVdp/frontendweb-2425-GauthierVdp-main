import { prisma } from '../data';
import ServiceError from '../core/serviceError';
import handleDBError from './_handleDBError';
import * as bookService from './book';
import * as memberService from './member';
import type {
  BorrowRecord,
  BorrowRecordCreateInput,
  BorrowRecordUpdateInput,
} from '../types/borrowRecord';

export const getAll = async (): Promise<BorrowRecord[]> => {
  return prisma.borrowrecord.findMany({
    include: {
      book: { select: { id: true, title: true } },
      member: { select: { id: true, name: true } },
    },
  });
};

export const getById = async (id: number): Promise<BorrowRecord> => {
  const borrowRecord = await prisma.borrowrecord.findUnique({
    where: { id },
    include: {
      book: { select: { id: true, title: true } },
      member: { select: { id: true, name: true } },
    },
  });

  if (!borrowRecord) {
    throw ServiceError.notFound('No borrow record with this ID exists');
  }

  return borrowRecord;
};

export const create = async (data: BorrowRecordCreateInput): Promise<BorrowRecord> => {
  const { bookId, memberId } = data;

  await bookService.checkBookExists(bookId);
  await memberService.checkMemberExists(memberId);

  try {
    return await prisma.borrowrecord.create({
      data: {
        borrowDate: data.borrowDate,
        returnDate: data.returnDate ?? null,
        bookId,
        memberId,
      },
      include: {
        book: { select: { id: true, title: true } },
        member: { select: { id: true, name: true } },
      },
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const updateById = async (
  id: number,
  changes: BorrowRecordUpdateInput
): Promise<BorrowRecord> => {
  const { bookId, memberId } = changes;

  if (bookId) await bookService.checkBookExists(bookId);
  if (memberId) await memberService.checkMemberExists(memberId);

  try {
    return await prisma.borrowrecord.update({
      where: { id },
      data: changes,
      include: {
        book: { select: { id: true, title: true } },
        member: { select: { id: true, name: true } },
      },
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const deleteById = async (id: number): Promise<void> => {
  try {
    await prisma.borrowrecord.delete({
      where: { id },
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const checkBorrowRecordExists = async (id: number): Promise<void> => {
  const count = await prisma.borrowrecord.count({ where: { id } });

  if (count === 0) {
    throw ServiceError.notFound('No borrow record with this ID exists');
  }
};