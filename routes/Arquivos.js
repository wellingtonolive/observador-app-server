const router = require("express").Router();
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

router.get("/generate-pdf/:id", arquivoController.dpf);

module.exports = router;
