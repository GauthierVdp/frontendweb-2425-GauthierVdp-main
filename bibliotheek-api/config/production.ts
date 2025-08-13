export default {
  auth: {
    jwt: {
      expirationInterval: 60 * 60, // s (1 hour)
      secret: process.env.JWT_SECRET || 'your_production_secret',
      audience: 'https://your-production-url.com',
      issuer: 'https://your-production-url.com'
    }
  }
};