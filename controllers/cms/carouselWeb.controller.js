const fs = require("fs");
const { _extend } = require("util");
const uuidv4 = require("uuid/v4");
const {
  responseOk,
  responseError,
  ImportImages,
  searchingQueries,
  pagingOptions,
  savelogs
} = require("../../helpers/_base_helpers");

const fileUpload_model = require("../../models/fileUpload.model");
const carouselWeb_model = require("../../models/carouselWeb.model");

class CarouselWeb {
  async GetListCarousel(req, res) {
    try {
      let data = await carouselWeb_model.paginate(
        searchingQueries(req),
        pagingOptions(req, null, "image createdAt updatedAt", { createdAt: -1 })
      );

      return responseOk(res, data);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async GetCarouselByid(req, res) {
    try {
      let id_Carousel = req.param.id;
      let data_CarouselWeb = await carouselWeb_model.findById(id_Carousel);
      if (!data_CarouselWeb) {
        return responseError(res, 400, 112, "CAROUSEL_WEB_NOT_FOUND");
      }

      return responseOk(res, data_CarouselWeb);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async Upload_image(req, res) {
    try {
      let body = _extend({}, req.body);
      let path_name = await ImportImages(req, res);
      if (path_name) {
        await new fileUpload_model({ path_name: path_name }).save();
      }

      return responseOk(res, path_name);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async CreateCarousel(req, res) {
    try {
      let body = _extend({}, req.body);
      let data_CarouselWeb = await new carouselWeb_model({
        image: body.url,
      }).save();
      if (!data_CarouselWeb) {
        return responseError(res, 400, 110, "UPLOAD_IMAGE_CAROUSEL_ERRORR");
      }

      savelogs(req.authenticatedAdmin._id, "CREATE", "Tạo mới quảng cáo");

      return responseOk(res, "CREATE_SUCCESS");
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async EditCarousel(req, res) {
    try {
      let id_Carousel = req.params.id;
      let body = _extend({}, req.body);

      let data_CarouselWeb = await carouselWeb_model.findByIdAndUpdate(
        id_Carousel,
        {
          image: body.url,
        }
      );

      if (!data_CarouselWeb) {
        return responseError(res, 400, 112, "CAROUSEL_WEB_NOT_FOUND");
      }

      savelogs(
        req.authenticatedAdmin._id,
        "UPDATE",
        "Chỉnh sửa thông tin quảng cáo"
      );

      return responseOk(res, "UPDATE_SUCCESS");
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async DeleteCarousel(req, res) {
    try {
      let id_Carousel = req.params.id;
      let data_CarouselWeb = await carouselWeb_model.findByIdAndDelete(
        id_Carousel
      );
      if (!data_CarouselWeb) {
        return responseError(res, 400, 112, "CAROUSEL_WEB_NOT_FOUND");
      }
      fs.unlinkSync(data_CarouselWeb.image);

      savelogs(req.authenticatedAdmin._id, "DELETE", "Xóa quảng cáo");

      return responseOk(res, "DELETE_SUCCESS");
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }
}

module.exports = CarouselWeb;
