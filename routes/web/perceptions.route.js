const express = require("express");
const router = express.Router();
const perceptions = require("../../controllers/web/perceptions.controller");
const Perceptions_controller = new perceptions();

router.get("/get-list-perceptions", function (req, res) {
  Perceptions_controller.GetListPerceptions(req, res);
});

module.exports = router;
