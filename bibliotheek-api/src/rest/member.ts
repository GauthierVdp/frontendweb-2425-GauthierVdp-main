import Router from '@koa/router';
import Joi from 'joi';
import * as memberService from '../service/member';
import type { KoaContext, KoaRouter, AppState, AppContext } from '../types/xkoa';
import type {
  GetAllMembersResponse,
  GetMemberByIdResponse,
  LoginResponse,
  RegisterMemberRequest,
} from '../types/member';
import type { IdParams } from '../types/common';

/**
 * Member routes
 */

const getAllMembers = async (ctx: KoaContext<GetAllMembersResponse>) => {
  const members = await memberService.getAll();
  ctx.body = { items: members };
};
getAllMembers.validationScheme = null;

const registerMember = async (
  ctx: KoaContext<LoginResponse, void, RegisterMemberRequest>
) => {
  const token = await memberService.register(ctx.request.body);
  ctx.status = 200;
  ctx.body = { token };
};
registerMember.validationScheme = {
  body: Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(12).max(128).required(),
  }),
};

const loginMember = async (
  ctx: KoaContext<LoginResponse, void, { email: string; password: string }>
) => {
  const { email, password } = ctx.request.body;
  const token = await memberService.login(email, password);
  ctx.status = 200;
  ctx.body = { token };
};
loginMember.validationScheme = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(12).max(128).required(),
  }),
};

const getMemberById = async (
  ctx: KoaContext<GetMemberByIdResponse, IdParams>
) => {
  let id: number | undefined;
  if (String(ctx.params.id) === 'me') {
    id = ctx.state.session?.userId;
  } else {
    id = Number(ctx.params.id);
  }
  if (!id || isNaN(id)) {
    ctx.throw(400, 'Invalid or missing member id');
    return;
  }
  const member = await memberService.getById(id);
  ctx.body = member;
};
getMemberById.validationScheme = {
  params: Joi.object({
    id: Joi.alternatives().try(
      Joi.string().valid('me'),
      Joi.number().integer().positive()
    ).required(),
  }),
};

/**
 * Install member routes
 */
export default function installMemberRouter(parent: KoaRouter) {
  const router = new Router<AppState, AppContext>({ prefix: '/members' });

  // Public routes (no authentication)
  router.post('/register', registerMember);
  router.post('/login', loginMember);

  // Protected routes (add authentication middleware if needed)
  router.get('/', getAllMembers);
  router.get('/:id', getMemberById);

  parent
    .use(router.routes())
    .use(router.allowedMethods());
}