import bcrypt, { hash } from "bcrypt";

class PasswordService {
  hashPassword = (password) => {
    const salt = 10;
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };
  comparePassword = (plain, hash) => {
    const compare = bcrypt.compareSync(plain, hash);
    return compare;
  };
}
export default new PasswordService();