require("dotenv").config();

const env = {
  Env: process.env.APP_ENV,
  Host: process.env.APP_HOST,
  Port: process.env.APP_PORT,
  AppKey: process.env.APP_KEY,
  DatabaseHost: process.env.DB_HOST,
  DatabasePort: process.env.DB_PORT,
  Database: process.env.DB_DATABASE,
  DatabasePort: process.env.DB_PORT,
  DatabaseDialect: process.env.DB_DIALECT,
  DatabaseUsername: process.env.DB_USERNAME,
  DatabasePassword: process.env.DB_PASSWORD,
  DatabaseLogging: process.env.DB_LOGGING,
  DatabaseOperator: process.env.DB_OPERATOR,
};

export default env;
