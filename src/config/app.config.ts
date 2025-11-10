export const appConfig = {
  PORT: parseInt(process.env.PORT || "3000", 10),
  ENV: process.env.ENV || "development",
  JWTSECRET: process.env.JWTSECRET || "secret",
};
