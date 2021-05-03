const express = require("express");
const router = express.Router();
const MiddleWaresAutenticacao = require("../config/autenticacao/MiddleWares");

const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const arquivoController = require("../controllers/ArquivoController");

router.get("/arquivos", arquivoController.consultar);
router.post(
  "/arquivos",
  multer(multerConfig).single("file"),
  arquivoController.salvar
);
router.delete("/arquivos/:id", arquivoController.apagar);

router.get(
  "/generate-pdf/:id",
  MiddleWaresAutenticacao.bearer,
  arquivoController.dpf
);

module.exports = router;
