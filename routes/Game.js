const express = require("express");
const router = express.Router();
const Gamecontroller = require("../controllers/Gamecontroller");
const MiddleWaresAutenticacao = require("../config/autenticacao/MiddleWares");

router.post("/game", MiddleWaresAutenticacao.bearer, Gamecontroller.create);
router.get("/game/:id", MiddleWaresAutenticacao.bearer, Gamecontroller.detail);
router.patch(
  "/game/:id",
  MiddleWaresAutenticacao.bearer,
  Gamecontroller.edition
);
router.delete(
  "/game/:id",
  MiddleWaresAutenticacao.bearer,
  Gamecontroller.delete
);

router.get(
  "/games/:id",
  MiddleWaresAutenticacao.bearer,
  Gamecontroller.gameList
);

module.exports = router;
