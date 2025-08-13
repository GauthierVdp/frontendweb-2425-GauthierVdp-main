export default {
  env: 'NODE_ENV',
  port: 'PORT',
  auth: {
    jwt: {
      secret: 'JWT_SECRET',
      audience: 'JWT_AUDIENCE',
      issuer: 'JWT_ISSUER'
    }
  }
};