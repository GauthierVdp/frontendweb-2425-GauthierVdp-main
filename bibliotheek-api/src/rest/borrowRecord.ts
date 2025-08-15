import Router from '@koa/router';
import Joi from 'joi';
import * as borrowRecordService from '../service/borrowRecord';
import validate from '../core/validation';
import type { AppContext, AppState } from '../types/xkoa';
import type { KoaContext, KoaRouter } from '../types/xkoa';
import type {
  GetAllBorrowRecordsResponse,
  GetBorrowRecordByIdResponse,
  CreateBorrowRecordResponse,
  UpdateBorrowRecordResponse,
  BorrowRecordCreateInput,
  BorrowRecordUpdateInput,
} from '../types/borrowRecord';
import type { IdParams } from '../types/common';



const getAllBorrowRecords = async (ctx: KoaContext<GetAllBorrowRecordsResponse>) => {
  const borrowRecords = await borrowRecordService.getAll();
  ctx.body = { items: borrowRecords };
};
getAllBorrowRecords.validationScheme = null;

const getBorrowRecordById = async (ctx: KoaContext<GetBorrowRecordByIdResponse, IdParams>) => {
  const borrowRecord = await borrowRecordService.getById(ctx.params.id);
  ctx.body = borrowRecord;
};
getBorrowRecordById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const createBorrowRecord = async (
  ctx: KoaContext<CreateBorrowRecordResponse, void, BorrowRecordCreateInput>
) => {
  const borrowRecord = await borrowRecordService.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = borrowRecord;
};
createBorrowRecord.validationScheme = {
  body: {
    borrowDate: Joi.date().iso().required(),
    returnDate: Joi.date().iso().optional(),
    bookId: Joi.number().integer().positive().required(),
    memberId: Joi.number().integer().positive().required(),
  },
};

const updateBorrowRecord = async (
  ctx: KoaContext<UpdateBorrowRecordResponse, IdParams, BorrowRecordUpdateInput>
) => {
  const updatedBorrowRecord = await borrowRecordService.updateById(
    ctx.params.id,
    ctx.request.body
  );
  ctx.body = updatedBorrowRecord;
};
updateBorrowRecord.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    borrowDate: Joi.date().iso().optional(),
    returnDate: Joi.date().iso().optional(),
    bookId: Joi.number().integer().positive().optional(),
    memberId: Joi.number().integer().positive().optional(),
  },
};

const deleteBorrowRecord = async (ctx: KoaContext<{ message: string }, IdParams>) => {
  await borrowRecordService.deleteById(ctx.params.id);
  ctx.status = 200;
  ctx.body = { message: 'Borrow record deleted successfully' };
};
deleteBorrowRecord.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

export default (parent: KoaRouter) => {
  const router = new Router<AppState, AppContext>({
    prefix: '/borrowRecords',
  });

  router.get('/', validate(getAllBorrowRecords.validationScheme), getAllBorrowRecords);
  router.get('/:id', validate(getBorrowRecordById.validationScheme), getBorrowRecordById);
  router.post('/', validate(createBorrowRecord.validationScheme), createBorrowRecord);
  router.put('/:id', validate(updateBorrowRecord.validationScheme), updateBorrowRecord);
  router.delete('/:id', validate(deleteBorrowRecord.validationScheme), deleteBorrowRecord);

  parent.use(router.routes()).use(router.allowedMethods());
};
