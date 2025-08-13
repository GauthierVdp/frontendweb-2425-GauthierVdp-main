import { prisma } from '../data';
import { hashPassword, verifyPassword } from '../core/password';
import ServiceError from '../core/serviceError';
import handleDBError from './_handleDBError';
import Role from '../core/roles';
import { sign as jwtSign } from 'jsonwebtoken';
import config from 'config';
import type {
  PublicMember,
  MemberUpdateInput,
  RegisterMemberRequest,
} from '../types/member';

const MEMBER_SELECT = {
  id: true,
  name: true,
  email: true,
};

export const getAll = async (): Promise<PublicMember[]> => {
  const members = await prisma.member.findMany({
    select: MEMBER_SELECT,
  });
  return members;
};

export const getById = async (id: number): Promise<PublicMember> => {
  const member = await prisma.member.findUnique({
    where: { id },
    select: MEMBER_SELECT,
  });
  if (!member) {
    throw ServiceError.notFound('No member with this id exists');
  }
  return member;
};

export const register = async (data: RegisterMemberRequest): Promise<string> => {
  const { name, email, password } = data;
  const password_hash = await hashPassword(password);

  try {
    const newMember = await prisma.member.create({
      data: {
        name,
        email,
        password_hash,
        roles: { set: [Role.USER] },
      },
    });

    return generateToken(newMember.id, [Role.USER]);
  } catch (error) {
    throw handleDBError(error);
  }
};

export const updateById = async (id: number, changes: MemberUpdateInput): Promise<PublicMember> => {
  try {
    const member = await prisma.member.update({
      where: { id },
      data: changes,
      select: MEMBER_SELECT,
    });
    return member;
  } catch (error) {
    throw handleDBError(error);
  }
};

export const deleteById = async (id: number) => {
  try {
    await prisma.member.delete({
      where: { id },
    });
  } catch (error) {
    throw handleDBError(error);
  }
};

export const login = async (email: string, password: string): Promise<string> => {
  const member = await prisma.member.findUnique({
    where: { email },
  });

  if (!member) {
    throw ServiceError.unauthorized('Invalid email or password');
  }

  const valid = await verifyPassword(password, member.password_hash);
  if (!valid) {
    throw ServiceError.unauthorized('Invalid email or password');
  }

  const roles = Array.isArray(member.roles) ? member.roles : [];
  return generateToken(member.id, roles as string[]);
};

export const checkMemberExists = async (id: number) => {
  const count = await prisma.member.count({
    where: { id },
  });
  if (count === 0) {
    throw ServiceError.notFound('No member with this id exists');
  }
};

function generateToken(userId: number, roles: string[]): string {
  const secret = config.get<string>('auth.jwt.secret');
  const expiresIn = config.get<string>('auth.jwt.expiresIn');
  return jwtSign({ userId, roles }, secret, { expiresIn });
}
