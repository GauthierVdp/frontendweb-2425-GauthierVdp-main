import type { Prisma } from '@prisma/client';
import type { Entity, ListResponse } from './common';

export interface User extends Entity {
  name: string;
  email: string;
  password_hash: string;
  roles: Prisma.JsonValue; 
}

export interface UserCreateInput {
  name: string;
  email: string;
  password: string;
}
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  token: string;
}

export interface UserUpdateInput extends Partial<Omit<UserCreateInput, 'password'>> {
  name?: string;
  email?: string;
}

export interface PublicUser extends Pick<User, 'id' | 'name' | 'email'> {}

export interface GetAllUsersResponse extends ListResponse<PublicUser> {}
export interface GetUserByIdResponse extends PublicUser {}
export interface UpdateUserResponse extends GetUserByIdResponse {}
export interface CreateUserResponse extends GetUserByIdResponse {}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
