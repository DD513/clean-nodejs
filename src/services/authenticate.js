import jwt from "jsonwebtoken";
import env from "../config/env";

class AuthenticateService {
  /**產生驗證內容
   * @param 使用者資訊
   * ＠baseMinute 到期時間（預設10）
   */
  yieldPayload = (param, baseMinute = 60) => {
    const { id } = param;
    const expireTime = new Date().getTime() + baseMinute * 60 * 1000;
    const payload = {
      id,
      expireTime,
    };
    return payload;
  };

  /** token 加密 */
  yieldToken = (token) => jwt.sign(token, env.AppKey);

  /** token 解密 */
  decodeToken = (token) => {
    try {
      return jwt.verify(token, env.AppKey);
    } catch (error) {
      return false;
    }
  };
}

export default new AuthenticateService();
