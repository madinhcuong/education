const express = require("express");
const router = express.Router();
const { authorizedAdminByPermission } = require("../../helpers/_base_helpers");
const introContactWeb = require("../../controllers/cms/introductionContactWeb.controller");
const IntroContactWeb_Image = new introContactWeb();

router.get(
  "/get-list-introductionOrContact",
  authorizedAdminByPermission("READ_LAYOUTUSER"),
  (req, res) => {
    IntroContactWeb_Image.GetListIntroOrContact(req, res);
  }
);

router.get(
  "/get-introductionOrContactByID/:id",
  authorizedAdminByPermission("READ_LAYOUTUSER"),
  (req, res) => {
    IntroContactWeb_Image.GetIntroOrContactByID(req, res);
  }
);

router.put(
  "/update-introductionOrContact/:id",
  authorizedAdminByPermission("READ_LAYOUTUSER"),
  (req, res) => {
    IntroContactWeb_Image.UpdateIntroOrContactById(req, res);
  }
);

module.exports = router;
