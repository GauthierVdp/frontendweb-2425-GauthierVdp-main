import Router from '@koa/router';
import installHealthRouter from './health';
import installAuthorRouter from './author';
import installBookRouter from './book';
import installMemberRouter from './member';
import installBorrowRecordRouter from './borrowRecord';
import installSessionRoutes from './session'; 
import installGenreRouter from './genre'; 
import type { AppContext, AppState, KoaApplication } from '../types/xkoa';
import { requireAuthentication } from '../core/auth'; 


export default (app: KoaApplication) => {
  const router = new Router<AppState, AppContext>({
    prefix: '/api',
  });

  installSessionRoutes(router);
  installMemberRouter(router);

  router.use(requireAuthentication);

  installHealthRouter(router);
  installAuthorRouter(router);
  installBookRouter(router);
  installBorrowRecordRouter(router);
  installGenreRouter(router);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
