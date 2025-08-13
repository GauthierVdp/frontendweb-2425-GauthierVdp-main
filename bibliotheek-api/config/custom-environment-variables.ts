export default {
  env: 'NODE_ENV',
  port: 'PORT',
  auth: {
    jwt: {
  secret: 'AUTH_JWT_SECRET',
  audience: 'JWT_AUDIENCE',
  issuer: 'JWT_ISSUER'
    }
  }
};