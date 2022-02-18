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
}
module.exports = IntroOrContact;
