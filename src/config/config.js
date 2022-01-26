import env from "./env";
require("dotenv").config();

// 下面這邊會寫一隻 config/env.js 來取得這邊的內容
const {
  DatabaseUsername,
  DatabasePassword,
  Database,
  DatabaseHost,
  DatabasePort,
  DatabaseDialect,
  DatabaseLogging,
  DatabaseOperator,
} = env;

module.exports = {
  development: {
    username: DatabaseUsername,
    password: DatabasePassword,
    database: Database,
    host: DatabaseHost,
    port: DatabasePort,
    logging: DatabaseLogging.toLowerCase() === "true",
    dialect: DatabaseDialect,
    operatorsAliases: DatabaseOperator,
  },
  test: {
    username: DatabaseUsername,
    password: DatabasePassword,
    database: Database,
    host: DatabaseHost,
    port: DatabasePort,
    logging: DatabaseLogging.toLowerCase() === "true",
    dialect: DatabaseDialect,
    operatorsAliases: DatabaseOperator,
  },
  production: {
    username: DatabaseUsername,
    password: DatabasePassword,
    database: Database,
    host: DatabaseHost,
    port: DatabasePort,
    logging: DatabaseLogging.toLowerCase() === "true",
    dialect: DatabaseDialect,
    operatorsAliases: DatabaseOperator,
  },
};
