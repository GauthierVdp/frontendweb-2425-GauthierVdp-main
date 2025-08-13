export default {
  auth: {
    jwt: {
      expirationInterval: 60 * 60, // s (1 hour)
      secret: '17f6d029a7f0c980c0633b7c90358e49ca74481c4ef44006ea570505c751ea2c64454b3dfe654891df64a198a407aa42a56eb70f657a8d7d471b703753203077',
      audience: 'http://localhost:3000',
      issuer: 'http://localhost:3000'
    }
  }
};