import type { ParameterizedContext } from 'koa';
import type Application from 'koa';
import type Router from '@koa/router';
import type { JwtPayload } from 'jsonwebtoken';

/**
 * SessionInfo type, representing the session data extracted from a JWT token.
 */
export interface SessionInfo extends JwtPayload {
  userId: number; // The user's unique ID
  roles: string[]; // Roles assigned to the user, e.g., ['user', 'admin']
}

/**
 * Application-wide state structure.
 */
export interface AppState {
  session: SessionInfo;
}

/**
 * Application-wide context structure.
 */
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

/**
 * Parameterized context structure for Koa.
 */
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

/**
 * Extended Koa application type.
 */
export interface KoaApplication extends Application<AppState, AppContext> {}

/**
 * Extended Koa router type.
 */
export interface KoaRouter extends Router<AppState, AppContext> {}
