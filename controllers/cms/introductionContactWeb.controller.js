const { _extend } = require("util");
const {
  responseOk,
  responseError,
  savelogs,
} = require("../../helpers/_base_helpers");

const introductionContactWeb_model = require("../../models/IntroductionContactWeb.model");

class IntroOrContact {
  async GetListIntroOrContact(req, res) {
    try {
      let data_IntroOrContact = await introductionContactWeb_model.find();

      if (data_IntroOrContact.length < 1) data_IntroOrContact = [];

      return responseOk(res, data_IntroOrContact);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async GetIntroOrContactByID(req, res) {
    try {
      let introductionORcontactWeb = req.params.id;

      let data_IntroOrContact = await introductionContactWeb_model.findById(
        introductionORcontactWeb
      );
      if (!data_IntroOrContact)
        return responseError(res, 400, 118, "INTRO_CONTACT_NOT_FOUND");

      return responseOk(res, data_IntroOrContact);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }

  async UpdateIntroOrContactById(req, res) {
    try {
      let body = _extend({}, req.body);
      let introductionORcontactWeb = req.params.id;

      let data_IntroOrContact = await introductionContactWeb_model.findByIdAndUpdate(
        introductionORcontactWeb,
        body
      );
      if (!data_IntroOrContact)
        return responseError(res, 400, 118, "INTRO_CONTACT_NOT_FOUND");

      savelogs(
        req.authenticatedAdmin._id,
        "UPDATE",
        "Chỉnh sửa thông tin giới thiệu và liên hệ"
      );

      return responseOk(res, "UPADTE_SUCCESS");
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }
}
module.exports = IntroOrContact;
