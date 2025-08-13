import type { Prisma } from '@prisma/client';
import type { Entity, ListResponse } from './common';

export interface User extends Entity {
  name: string;
  email: string;
  password_hash: string;
  roles: Prisma.JsonValue; // e.g. string[] if you prefer
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
  // For updating users, you may allow changing just name/email
  name?: string;
  email?: string;
}

// Represents a user object sent back to clients, without sensitive info like password_hash
export interface PublicUser extends Pick<User, 'id' | 'name' | 'email'> {}

// Responses for listing and retrieving users
export interface GetAllUsersResponse extends ListResponse<PublicUser> {}
export interface GetUserByIdResponse extends PublicUser {}
export interface UpdateUserResponse extends GetUserByIdResponse {}
export interface CreateUserResponse extends GetUserByIdResponse {}

// For authentication requests and responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
