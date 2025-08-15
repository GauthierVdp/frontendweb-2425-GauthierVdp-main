import type { Prisma } from '@prisma/client';
import type { Entity, ListResponse } from './common';

export interface Member extends Entity {
  name: string;
  email: string;
  password_hash: string;
  roles: Prisma.JsonValue;
}

export interface MemberCreateInput {
  name: string;
  email: string;
  password: string;
}

export interface PublicMember extends Pick<Member, 'id' | 'name' | 'email'> {}

export interface MemberUpdateInput extends Pick<MemberCreateInput, 'name' | 'email'> {}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterMemberRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateMemberRequest extends Pick<RegisterMemberRequest, 'name' | 'email'> {}

export interface GetAllMembersResponse extends ListResponse<PublicMember> {}
export interface GetMemberByIdResponse extends PublicMember {}
export interface UpdateMemberResponse extends GetMemberByIdResponse {}

export interface LoginResponse {
  token: string;
}

export interface GetUserRequest {
  id: number | 'me';
}
