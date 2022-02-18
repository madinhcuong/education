const {
  responseOk,
  responseError,
  searchingQueries,
  pagingOptions,
} = require("../../helpers/_base_helpers");

const carouselWeb_model = require("../../models/carouselWeb.model");

class Carousel {
  async GetListCarousel(req, res) {
    try {
      let data = await carouselWeb_model.find().sort({ createdAt: -1 });

      return responseOk(res, data);
    } catch (err) {
      console.log(err);
      return responseError(res, 500, 0, "ERROR");
    }
  }
}

module.exports = Carousel;
