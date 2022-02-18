const express = require("express");
const router = express.Router();
const { authorizedAdminByPermission } = require("../../helpers/_base_helpers");
const carouselWeb = require("../../controllers/cms/carouselWeb.controller");
const CarouselWeb_Image = new carouselWeb();

router.get(
  "/get-list-image-carousel",
  authorizedAdminByPermission("READ_LAYOUTUSER"),
  (req, res) => {
    CarouselWeb_Image.GetListCarousel(req, res);
  }
);

router.get(
  "/get-carouselByid/:id",
  authorizedAdminByPermission("READ_LAYOUTUSER"),
  (req, res) => {
    CarouselWeb_Image.GetCarouselByid(req, res);
  }
);

router.post("/upload-image-carousel", (req, res) => {
  CarouselWeb_Image.Upload_image(req, res);
});

router.post(
  "/create-carousel",
  authorizedAdminByPermission("READ_LAYOUTUSER"),
  (req, res) => {
    CarouselWeb_Image.CreateCarousel(req, res);
  }
);

router.put(
  "/edit-carousel/:id",
  authorizedAdminByPermission("READ_LAYOUTUSER"),
  (req, res) => {
    CarouselWeb_Image.EditCarousel(req, res);
  }
);

router.delete(
  "/delete-carousel/:id",
  authorizedAdminByPermission("READ_LAYOUTUSER"),
  (req, res) => {
    CarouselWeb_Image.DeleteCarousel(req, res);
  }
);

module.exports = router;
