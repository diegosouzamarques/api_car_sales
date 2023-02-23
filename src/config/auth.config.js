export default {
  secretKey: process.env.SECRETKEY,
  jwtExpiration: parseInt(process.env.JWTEXPIRATION),
  jwtRefreshExpiration: parseInt(process.env.JWTREFRESHEXPIRATION)
};
