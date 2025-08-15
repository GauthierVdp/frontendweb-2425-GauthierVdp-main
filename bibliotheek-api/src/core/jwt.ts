import config from 'config';
import type {
  JwtPayload,
  Secret,
  SignOptions,
  VerifyOptions,
} from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import type { User } from '../types/user';

const JWT_AUDIENCE = config.get<string>('auth.jwt.audience');
const JWT_SECRET = config.get<string>('auth.jwt.secret');
const JWT_ISSUER = config.get<string>('auth.jwt.issuer');
const JWT_EXPIRES_IN = config.get<string>('auth.jwt.expiresIn');

function signJwtAsync(payload: object, secret: Secret, options: SignOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err || !token) return reject(err);
      resolve(token);
    });
  });
}

function verifyJwtAsync(token: string, secret: Secret, options: VerifyOptions): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as JwtPayload);
    });
  });
}

export const generateJWT = async (user: User): Promise<string> => {
  const tokenData = { userId: user.id, roles: user.roles };

  const signOptions = {
    expiresIn: JWT_EXPIRES_IN,
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
    subject: `${user.id}`,
  };

  console.log('Generating JWT with options:', signOptions);

  return signJwtAsync(tokenData, JWT_SECRET, signOptions);
};

export const verifyJWT = async (authToken: string): Promise<JwtPayload> => {
  console.log('Verifying JWT without audience/issuer checks');
  console.log('Token:', authToken);

  return verifyJwtAsync(authToken, JWT_SECRET, {}); 
};