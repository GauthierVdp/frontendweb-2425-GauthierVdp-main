
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { Server as HttpServer } from 'http';
import config from 'config'; // 👈
import { getLogger } from './core/logging'; // 👈
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

  const PORT = config.get<number>('port'); // 👈

  return {
    getApp() {
      return app;
    },
    async start() {
      await new Promise<void>((resolve) => {
        httpServer = app.listen(PORT, () => {
          getLogger().info(`🚀 Server listening on http://localhost:${PORT}`); // 👈
          resolve();
        });
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