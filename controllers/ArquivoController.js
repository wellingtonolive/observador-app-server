const Arquivo = require("../models/Arquivos");
const multer = require("multer");
const multerConfig = require("../config/multerConfig");

module.exports = {
  async consultar(req, res) {
    const arquivos = await Arquivo.find();
    return res.json(arquivos);
  },

  async salvar(req, res) {
    try {
      console.log(req.body);
      console.log(req.file);
      /*const { originalname: name, size, key, location: url = "" } = req.file;
            console.log(location)
            console.log(url)
            const arquivo = await Arquivo.create({
                name,
                size,
                key,
                url
            });

            return res.status(200).json(arquivo);*/
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async apagar(req, res) {
    try {
      const arquivo = await Arquivos.findById(req.params.id);
      arquivo.remove();
      return res.status(200);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: error,
      });
    }
  },
};
