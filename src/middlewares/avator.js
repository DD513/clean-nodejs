import fs from "fs";
import _ from "lodash";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      !fs.existsSync(path.resolve(__dirname, "../../storage/images/avator"))
    ) {
      fs.mkdirSync(path.resolve(__dirname, "../../storage/images/avator"));
    }
    cb(null, path.resolve(__dirname, "../../storage/images/avator"));
  },
  filename: (req, file, cb) => {
    const { originalname, mimetype } = file;
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      cb({ status: 400, message: "頭貼只接受 PNG、JPG、JPEG 類型的檔案" });
    }
    // if (
    //   mimetype !== "image/jpeg" ||
    //   mimetype !== "image/jpg" ||
    //   mimetype !== "image/png"
    // ) {
    //   cb({ status: 400, message: "頭貼只接受 PNG、JPG、JPEG 類型的檔案" });
    //   return;
    // }
    cb(null, `${uuidv4()}${path.extname(originalname)}`);
  },
});

class AvatorMiddleware {
  upload = multer({ storage });
  handleError = (error, req, res, next) => {
    if (error) {
      const { status, message } = error;
      if (status && message) {
        res.status(status).json({ message });
        return;
      }
      res
        .status(400)
        .json({ message: "FormData 傳入錯誤，請以 images 為鍵值" });
      return;
    }
    next();
  };
}

export default new AvatorMiddleware();
