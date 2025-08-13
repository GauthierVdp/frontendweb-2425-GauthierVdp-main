import Router from '@koa/router';
import * as healthService from '../service/health';
import type { KoaContext, KoaRouter } from '../types/xkoa';
import type { PingResponse, VersionResponse } from '../types/health';
import validate from '../core/validation';
import type { AppContext, AppState } from '../types/xkoa';

/**
 * Health check routes
 */

const ping = async (ctx: KoaContext<PingResponse>) => {
  ctx.status = 200;
  ctx.body = healthService.ping();
};
ping.validationScheme = null;

const getVersion = async (ctx: KoaContext<VersionResponse>) => {
  ctx.status = 200;
  ctx.body = healthService.getVersion();
};
getVersion.validationScheme = null;

export default function installHealthRouter(parent: KoaRouter) {
  const router = new Router<AppState, AppContext>({ prefix: '/health' });

  router.get('/ping', validate(ping.validationScheme), ping);
  router.get('/version', validate(getVersion.validationScheme), getVersion);

  parent
    .use(router.routes())
    .use(router.allowedMethods());
}
