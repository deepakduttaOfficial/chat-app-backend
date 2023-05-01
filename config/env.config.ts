export default {
  API_URL: process.env.API_URL,
  PORT: process.env.PORT || 8000,
  JWT_SECRET_AUTH: process.env.JWT_SECRET_AUTH,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  DB_URL: process.env.DB_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  COOKIE_KEY: process.env.COOKIE_KEY as string,
  DOMAIN: process.env.DOMAIN as string,
};
