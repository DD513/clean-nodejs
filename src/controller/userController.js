import _ from "lodash";
import models from "../models/index";
import UserService from "../services/user";
import AuthenticateService from "../services/authenticate";

class UserController {
  getUser = async (req, res) => {
    try {
      const { id } = req;
      const user = await UserService.getUserById(id);
      res.status(200).json({ user });
    } catch {
      res.status(400).json({ message: "沒有使用者" });
    }
  };

  postUser = async (req, res) => {
    const { body } = req;
    try {
      const existUser = await UserService.checkExistUser(body);
      if (existUser) {
        res.status(400).json({ message: "該用戶已註冊" });
        return;
      }
      const user = await UserService.createUser(body);
      res.status(200).json({ message: "使用者已經註冊", user });
    } catch (error) {
      res.status(400).json({ message: "輸入內容有誤" });
    }
  };

  //修改使用者資料
  editUser = async (req, res) => {
    try {
      const { id, body, file } = req;
      const { name, email } = body;
      const existUser = await UserService.getUserByEmail(email);
      if (existUser && existUser.id !== id)
        return res.status(400).json({ message: "該信箱已被使用" });
      // 修改信箱
      if (!existUser) {
        await UserService.editUserEmail(id, email);
      }
      // 修改使用者的資料
      UserService.editUser(id, name, file);

      res.status(200).json({ message: "修改成功" });
    } catch {
      res.status(400).json({ message: "修改失敗" });
    }
  };

  deleteUser = async (req, res) => {
    const { id } = req;
    console.log(id);
    try {
      await UserService.deleteUser(id);
      res.status(200).json({ message: "使用者已成功刪除！！" });
    } catch (error) {
      res.status(400).json({ message: "刪除失敗" });
    }
  };
}

export default new UserController();
