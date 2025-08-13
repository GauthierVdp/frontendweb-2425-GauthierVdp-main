import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { Server as HttpServer } from 'http';

import { initializeData, shutdownData } from './data';
import installMiddlewares from './core/installMiddlewares';
import installRest from './rest';
import type {
  KoaApplication,
  AppState,
  AppContext,
} from './types/xkoa';

export interface Server {
  getApp(): KoaApplication;
  start(): Promise<void>;
  stop(): Promise<void>;
}

export default async function createServer(): Promise<Server> {
  const app = new Koa<AppState, AppContext>();

  installMiddlewares(app);
  app.use(bodyParser());
  await initializeData();
  installRest(app);

  let httpServer: HttpServer;

  return {
    getApp() {
      return app;
    },
    async start() {
      httpServer = app.listen(3000, () => {
        console.log('Server is listening on port 3000');
      });
    },
    async stop() {
      await shutdownData();
      if (httpServer) {
        httpServer.close();
      }
    },
  };
}