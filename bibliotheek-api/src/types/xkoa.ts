import type { ParameterizedContext } from 'koa';
import type Application from 'koa';
import type Router from '@koa/router';
import type { JwtPayload } from 'jsonwebtoken';


export interface SessionInfo extends JwtPayload {
  userId: number; 
  roles: string[]; 
}


export interface AppState {
  session: SessionInfo;
}


export interface AppContext<
  Params = unknown,
  RequestBody = unknown,
  Query = unknown,
> {
  request: {
    body: RequestBody;
    query: Query;
  };
  params: Params;
}


export type KoaContext<
  ResponseBody = unknown,
  Params = unknown,
  RequestBody = unknown,
  Query = unknown,
> = ParameterizedContext<
  AppState,
  AppContext<Params, RequestBody, Query>,
  ResponseBody
>;


export interface KoaApplication extends Application<AppState, AppContext> {}


export interface KoaRouter extends Router<AppState, AppContext> {}
