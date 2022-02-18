const express = require("express");
const router = express.Router();
const carousel = require("../../controllers/web/carousel.controller");
const Carousel_controller = new carousel();

router.get("/get-list-carousel", function (req, res) {
  Carousel_controller.GetListCarousel(req, res);
});

module.exports = router;
