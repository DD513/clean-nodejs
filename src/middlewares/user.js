import passport from "./passport";
import AuthenticateService from "../services/authenticate";

require("dotenv").config();

class UserMiddleware {
  /** 平台會員登入 */
  Authenticate = (req, res, next) => {
    passport.authenticate("local", { session: false }, async (error, user) => {
      if (error) {
        const { status, message } = error;
        res.status(status).json({ message });
        return;
      }
      if (!user) {
        res.status(401).json({ message: "登入失敗" });
        return;
      }
      const payload = AuthenticateService.yieldPayload(user);
      const token = AuthenticateService.yieldToken(payload);
      res.status(200).json({ message: "登入成功", token });
    })(req, res, next);
  };
  //* 驗證token資訊 */
  jwtAuthenticate = async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
      if (info) {
        res.status(401).json({ message: "尚未登入" });
        return;
      }
      if (error) {
        const { status, message } = error;
        res.status(status).json({ message });
        return;
      }
      const { id } = user;
      req.id = id;
      next();
    })(req, res, next);
  };
}
export default new UserMiddleware();
