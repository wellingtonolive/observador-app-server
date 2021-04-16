const express = require("express");
const router = express.Router();
const AthleteController = require("../controllers/AthleteController");
const MiddleWaresAutenticacao = require("../config/autenticacao/MiddleWares");

router.post(
  "/athlete",
  MiddleWaresAutenticacao.bearer,
  AthleteController.create
);
router.get(
  "/athlete/:id",
  MiddleWaresAutenticacao.bearer,
  AthleteController.detail
);
router.patch(
  "/athlete/:id",
  MiddleWaresAutenticacao.bearer,
  AthleteController.edition
);
router.delete(
  "/athlete/:id",
  MiddleWaresAutenticacao.bearer,
  AthleteController.delete
);

router.get(
  "/athletes/:id",
  MiddleWaresAutenticacao.bearer,
  AthleteController.athleteList
);

router.get(
  "/athletepdfget/:id",
  MiddleWaresAutenticacao.bearer,
  AthleteController.getpdf
);
router.post(
  "/athletepdfpost/:id",
  MiddleWaresAutenticacao.bearer,
  AthleteController.postdpf
);

module.exports = router;
