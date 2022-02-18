const express = require("express");
const router = express.Router();
const { authorizedAdminByPermission } = require("../../helpers/_base_helpers");
const perceptionsWeb = require("../../controllers/cms/perceptionsWeb.controller");
const perceptionsWeb_controller = new perceptionsWeb();

router.get(
  "/get-list-perceptions",
  authorizedAdminByPermission("READ_LAYOUTUSER"),
  (req, res) => {
    perceptionsWeb_controller.GetListPerceptions(req, res);
  }
);

router.get(
  "/get-perceptionsByid/:id",
  authorizedAdminByPermission("READ_LAYOUTUSER"),
  (req, res) => {
    perceptionsWeb_controller.GetPerceptionsByid(req, res);
  }
);

router.post(
  "/create-perceptions",
  authorizedAdminByPermission("READ_LAYOUTUSER"),
  (req, res) => {
    perceptionsWeb_controller.CreatePerceptions(req, res);
  }
);

router.put(
  "/edit-perceptions/:id",
  authorizedAdminByPermission("READ_LAYOUTUSER"),
  (req, res) => {
    perceptionsWeb_controller.EditPerceptions(req, res);
  }
);

router.delete(
  "/delete-perceptions/:id",
  authorizedAdminByPermission("READ_LAYOUTUSER"),
  (req, res) => {
    perceptionsWeb_controller.DeletePerceptions(req, res);
  }
);

module.exports = router;
