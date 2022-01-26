/* eslint-disable import/no-cycle */
import passport from "passport";
import LocalStrategy from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import PasswordService from "../services/password";
import UserService from "../services/user";

require("dotenv").config();

// jwt option
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_KEY,
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, cb) => {
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        return cb({ status: 404, message: "沒有該用戶" }, false);
      }
      const compare = PasswordService.comparePassword(password, user.password);

      if (compare !== true) {
        return cb({ status: 400, message: "輸入的密碼有誤" }, false);
      }
      return cb(null, user);
    }
  )
);

passport.use(
  new JwtStrategy(options, async (payload, cb) => {
    const currentTime = new Date().getTime();
    if (currentTime > payload.expireTime) {
      return cb({ status: 400, message: "Token過期，請重新登入" });
    }
    return cb(null, payload);
  })
);
export default passport;
