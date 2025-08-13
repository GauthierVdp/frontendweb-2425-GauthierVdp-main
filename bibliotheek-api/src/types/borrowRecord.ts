import type { Entity, ListResponse } from './common';

export interface BorrowRecord extends Entity {
  borrowDate: Date;
  returnDate: Date | null;
  book: { id: number; title: string };
  member: { id: number; name: string };
}

export interface BorrowRecordCreateInput {
  borrowDate: Date;
  returnDate?: Date;
  bookId: number;
  memberId: number;
}

export interface BorrowRecordUpdateInput extends Partial<BorrowRecordCreateInput> {}

export interface GetAllBorrowRecordsResponse extends ListResponse<BorrowRecord> {}
export interface GetBorrowRecordByIdResponse extends BorrowRecord {}
export interface CreateBorrowRecordResponse extends GetBorrowRecordByIdResponse {}
export interface UpdateBorrowRecordResponse extends GetBorrowRecordByIdResponse {}
