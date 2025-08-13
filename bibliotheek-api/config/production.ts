export default {
  auth: {
    jwt: {
      expirationInterval: 60 * 60, // s (1 hour)
      // secret moet via env of expliciet ingesteld worden
    }
  }
};