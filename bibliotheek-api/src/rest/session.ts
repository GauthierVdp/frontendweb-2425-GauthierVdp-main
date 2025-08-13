import Router from '@koa/router';
import Joi from 'joi';
import validate from '../core/validation';
import * as userService from '../service/user';
import type {
  KoaContext,
  KoaRouter,
  AppState,
  AppContext,
} from '../types/xkoa';
import type {
  LoginResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from '../types/user';

const register = async (ctx: KoaContext<RegisterResponse, void, RegisterRequest>) => {
  const { email, password, name } = ctx.request.body;
  const token = await userService.register({ email, password, name });

  ctx.status = 201;
  ctx.body = { token };
};
register.validationScheme = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  },
};

const login = async (ctx: KoaContext<LoginResponse, void, LoginRequest>) => {
  const { email, password } = ctx.request.body;
  const token = await userService.login(email, password);

  ctx.status = 200;
  ctx.body = { token };
};
login.validationScheme = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

export default function installSessionRoutes(parent: KoaRouter) {
  const router = new Router<AppState, AppContext>({
    prefix: '/sessions',
  });

  router.post(
    '/',
    validate(login.validationScheme),
    login,
  );

  router.post(
    '/register',
    validate(register.validationScheme),
    register,
  );

  parent.use(router.routes()).use(router.allowedMethods());
}