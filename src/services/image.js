import rp from "request-promise";
import fs from "fs";
import imgur from "imgur";
import env from "../config/env";

class ImageService {
  /**
   *
   * @param {object} file
   * @returns {string}
   */
  postImage = async (file) => {
    const encode_img = file.buffer.toString("base64");
    let path = "";
    const options = {
      method: "POST",
      url: "https://api.imgur.com/3/image",
      headers: {
        Authorization: `Client-ID ${env.ClientID}`,
      },
      formData: {
        image: encode_img,
      },
    };
    await rp(options, (error, response) => {
      if (error) throw new Error(error);
      const imgurURL = response.body;
      path = JSON.parse(imgurURL).data.link;
    });
    return path;
  };
}
export default new ImageService();
