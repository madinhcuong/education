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

const perceptionsWeb_model = require("../../models/perceptionsWeb.model");

class PerceptionsWeb {
  async GetListPerceptions(req, res) {
    try {
      let data = await perceptionsWeb_model.paginate(
        searchingQueries(req),
        pagingOptions(req, null, "image description name createdAt updatedAt", {
          createdAt: -1,
        })
      );

      return responseOk(res, data);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async GetPerceptionsByid(req, res) {
    try {
      let id_Perceptions = req.params.id;
      let data_PerceptionsWeb = await perceptionsWeb_model.findById(
        id_Perceptions
      );
      if (!data_PerceptionsWeb) {
        return responseError(res, 400, 114, "PERCEPTIONS_WEB_NOT_FOUND");
      }

      return responseOk(res, data_PerceptionsWeb);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async CreatePerceptions(req, res) {
    try {
      let body = _extend({}, req.body);
      let data_PerceptionsWeb = await new perceptionsWeb_model({
        name: body.name,
        image: body.image,
        description: body.description,
      }).save();
      if (!data_PerceptionsWeb) {
        return responseError(res, 400, 116, "NOT_CREATE_PERCEPTIONS");
      }

      savelogs(
        req.authenticatedAdmin._id,
        "CREATE",
        "Tạo mới cảm nhận học viên"
      );

      return responseOk(res, "CREATE_SUCCESS");
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async EditPerceptions(req, res) {
    try {
      let id_Perceptions = req.params.id;
      let body = _extend({}, req.body);

      let data_PerceptionsWeb = await perceptionsWeb_model.findByIdAndUpdate(
        id_Perceptions,
        body
      );

      if (!data_PerceptionsWeb) {
        return responseError(res, 400, 114, "PERCEPTIONS_WEB_NOT_FOUND");
      }

      savelogs(
        req.authenticatedAdmin._id,
        "UPDATE",
        "Chỉnh sửa cảm nhận học viên"
      );

      return responseOk(res, "UPDATE_SUCCESS");
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async DeletePerceptions(req, res) {
    try {
      let id_Perceptions = req.params.id;
      let data_PerceptionsWeb = await perceptionsWeb_model.findByIdAndDelete(
        id_Perceptions
      );
      if (!data_PerceptionsWeb) {
        return responseError(res, 400, 114, "PERCEPTIONS_WEB_NOT_FOUND");
      }

      savelogs(req.authenticatedAdmin._id, "DELETE", "Xóa cảm nhận học viên");

      return responseOk(res, "DELETE_SUCCESS");
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }
}

module.exports = PerceptionsWeb;
