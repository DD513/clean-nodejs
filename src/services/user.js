import _ from "lodash";
import { DATE, QueryTypes, Model } from "sequelize";
import user from "../middlewares/user";
import models from "../models/index";
import PasswordService from "./password";

const { users, sequelize } = models;

class UserService {
  //建立使用者
  createUser = async (body) => {
    const { name, email, password } = body;
    const user = await users.create({
      name,
      email,
      password: PasswordService.hashPassword(password),
    });
    return user;
  };

  getUserByEmail = async (email) => {
    const query = `select * from users where email = '${email}'`;
    const [user] = await sequelize.query(query, { type: QueryTypes.SELECT });
    return user;
  };

  // 取得使用者個人資料
  getUserById = async (id) => {
    const user = await users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password", "verificationCode"],
      },
    });
    return user;
  };

  //  判斷該信箱有無使用過
  checkExistUser = async (body) => {
    const { email } = body;
    const user = await users.findOne({
      where: {
        email,
      },
    });
    return user;
  };

  /** 修改使用者的信箱
   *
   * @param {*} id
   * @param {*} email
   */
  editUserEmail = async (id, email) => {
    await users.update(
      {
        email,
      },
      {
        where: {
          id,
        },
      }
    );
  };

  /** 更改使用者
   *
   * @param {string} id
   * @param {string} name
   * @returns {void}
   */
  editUser = async (id, name, file) => {
    await users.update(
      {
        name,
        images: _.isUndefined(file)
          ? null
          : `/static/images/avator/${file.filename}`,
      },
      {
        where: {
          id,
        },
      }
    );
  };

  deleteUser = async (id) => {
    users.destroy({
      where: {
        id,
      },
    });
  };
}

export default new UserService();
