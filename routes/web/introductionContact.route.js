const express = require("express");
const router = express.Router();
const introContactWeb = require("../../controllers/cms/introductionContactWeb.controller");
const IntroContactWeb_Image = new introContactWeb();

router.get("/get-list-introductionOrContact", (req, res) => {
  IntroContactWeb_Image.GetListIntroOrContact(req, res);
});

module.exports = router;
