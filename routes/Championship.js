const express = require("express");
const router = express.Router();
const ChampionshipController = require("../controllers/ChampionshipController");
const MiddleWaresAutenticacao = require("../config/autenticacao/MiddleWares");

router.post(
  "/championship",
  MiddleWaresAutenticacao.bearer,
  ChampionshipController.create
);
router.get(
  "/championship/:id",
  MiddleWaresAutenticacao.bearer,
  ChampionshipController.detail
);
router.patch(
  "/championship/:id",
  MiddleWaresAutenticacao.bearer,
  ChampionshipController.edition
);
router.delete(
  "/championship/:id",
  MiddleWaresAutenticacao.bearer,
  ChampionshipController.delete
);

router.get(
  "/championships",
  MiddleWaresAutenticacao.bearer,
  ChampionshipController.championshipsList
);

module.exports = router;
