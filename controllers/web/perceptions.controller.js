const {
  responseOk,
  responseError,
  searchingQueries,
  pagingOptions,
} = require("../../helpers/_base_helpers");

const perceptionsWeb_model = require("../../models/perceptionsWeb.model");

class Perceptions {
  async GetListPerceptions(req, res) {
    try {
      let data = await perceptionsWeb_model.find().sort({ createdAt: -1 });

      return responseOk(res, data);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }
}

module.exports = Perceptions;
