/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import path from "path";
import fs from "fs";
import _ from "lodash";
import { Sequelize, DataTypes } from "sequelize";
import DatabaseService from "../services/database";

const basename = path.basename(__filename);
const sequelize = DatabaseService.connect();

const db = {};

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((name) => {
  if (db[name].associate) db[name].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
