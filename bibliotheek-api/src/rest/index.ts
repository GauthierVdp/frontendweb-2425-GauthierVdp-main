import Router from '@koa/router';
import installHealthRouter from './health';
import installAuthorRouter from './author';
import installBookRouter from './book';
import installMemberRouter from './member';
import installBorrowRecordRouter from './borrowRecord';
import installSessionRoutes from './session'; // Import the session routes
import installGenreRouter from './genre'; // Import the genre routes
import type { AppContext, AppState, KoaApplication } from '../types/xkoa';
import { requireAuthentication } from '../core/auth'; // Import the authentication middleware

/**
 * Main router index for all library routes
 */
export default (app: KoaApplication) => {
  const router = new Router<AppState, AppContext>({
    prefix: '/api',
  });

  // Public routes (no authentication)
  installSessionRoutes(router);
  installMemberRouter(router);

  // Apply authentication middleware to all routes below
  router.use(requireAuthentication);

  // Protected routes
  installHealthRouter(router);
  installAuthorRouter(router);
  installBookRouter(router);
  installBorrowRecordRouter(router);
  installGenreRouter(router);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
