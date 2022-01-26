import { Router } from "express";
import UserController from "../controller/userController";
import UserMiddleware from "../middlewares/user";

const router = Router();

//需要token才能新增資料
//登入-->獲取token
router.post("/", UserMiddleware.Authenticate);

// 註冊使用者
router.post("/register", UserController.postUser);

// 修該使用者資料
router.patch("/", UserMiddleware.jwtAuthenticate, UserController.editUser);

// 需要token才能刪除資料
router.delete("/", UserMiddleware.jwtAuthenticate, UserController.deleteUser);

export default router;
