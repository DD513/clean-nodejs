import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import _ from "lodash";
import config from "../config/config";
import { users } from "../models";

require("dotenv").config();

const basename = path.basename(__filename);

// dynamic assign current connect mode
const param = config[process.env.APP_ENV];

const sequelize = new Sequelize(
  param.database,
  param.username,
  param.password,
  param
);

const db = {};
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = _.invoke(sequelize, "import", path.resolve(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize;

export default db;
