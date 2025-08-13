import ServiceError from '../core/serviceError';

const handleDBError = (error: any) => {
  const { code = '', message } = error;

  if (code === 'P2002') {
    // Unique constraint violation
    switch (true) {
      case message.includes('idx_member_email_unique'):
        throw ServiceError.validationFailed('A member with this email already exists');
      case message.includes('idx_author_name_unique'):
        throw ServiceError.validationFailed('An author with this name already exists');
      case message.includes('idx_book_title_unique'):
        throw ServiceError.validationFailed('A book with this title already exists');
      default:
        throw ServiceError.validationFailed('This item already exists');
    }
  }

  if (code === 'P2025') {
    // Record not found
    switch (true) {
      case message.includes('fk_borrowrecord_book'):
        throw ServiceError.notFound('This book does not exist');
      case message.includes('fk_borrowrecord_member'):
        throw ServiceError.notFound('This member does not exist');
      case message.includes('borrowrecord'):
        throw ServiceError.notFound('No borrow record with this id exists');
      case message.includes('book'):
        throw ServiceError.notFound('No book with this id exists');
      case message.includes('author'):
        throw ServiceError.notFound('No author with this id exists');
      case message.includes('member'):
        throw ServiceError.notFound('No member with this id exists');
      default:
        throw ServiceError.notFound('The requested resource could not be found');
    }
  }

  if (code === 'P2003') {
    // Foreign key constraint fails
    switch (true) {
      case message.includes('bookId'):
        throw ServiceError.conflict('This book is still linked to borrow records');
      case message.includes('memberId'):
        throw ServiceError.conflict('This member is still linked to borrow records');
      default:
        throw ServiceError.conflict('This item is still linked to other records');
    }
  }

  // Unknown error
  throw error;
};

export default handleDBError;
