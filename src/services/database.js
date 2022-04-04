import Sequelize from "sequelize";
import { createNamespace } from "cls-hooked";
import config from "../config/config";
import env from "../config/env";

class DatabaseService {
  connect = () => {
    const cls = createNamespace("sequelize-transaction");
    const { Env } = env;
    const param = config[Env];
    Sequelize.useCLS(cls);
    const sequelize = new Sequelize(
      param.database,
      param.username,
      param.password,
      param
    );
    return sequelize;
  };
}

export default new DatabaseService();
