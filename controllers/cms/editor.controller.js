const { _extend } = require("util");
const {
  responseOk,
  responseError,
  savelogs,
} = require("../../helpers/_base_helpers");
const fs = require("fs");
const dir = "uploads";
const uuidv4 = require("uuid/v4");
const sizeOf = require("image-size");
const Jimp = require("jimp");
const { url_backend } = require("../../config/base.config");

class Editor {
  async Upload_image(req, res) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      let file = req.files.upload;

      let name = file.name.split(".");
      let typeFile = name[name.length - 1];

      let uuid = uuidv4();
      if (file.name.match(/\.(jpg|png)$/i)) {
        let pathFile = `${dir}/${uuid}.${typeFile}`;

        let upLoad = await file.mv(pathFile, async (err) => {
          if (!err) {
            var dimensions = sizeOf(pathFile);
            Jimp.read(pathFile, (err, lenna) => {
              if (err) return err.message;
              lenna
                //.resize(256, 256)
                .quality(60) // set
                .write(pathFile);
            });
          } else return "IMAGES_UPLOAD_FAIL";
        });

        if (!upLoad) {
          res.status(200).json({
            uploaded: true,
            url: `${url_backend}/${pathFile}`,
          });
        }
      }
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }
}
module.exports = Editor;
