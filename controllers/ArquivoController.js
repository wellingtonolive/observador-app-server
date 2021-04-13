const Arquivo = require("../models/Arquivos");
const multer = require("multer");
const multerConfig = require("../config/multerConfig");

const Atleta = require("../models/Atleta");
const Game = require("../models/Game");
const Campeonato = require("../models/Campeonato");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const html = fs.readFileSync("./config/templatePdf.html", "utf8");

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

  async dpf(req, response) {
    function dateNow(date, dayMonth) {
      function twoDigit(number) {
        if (number < 10) {
          return "0" + number;
        } else {
          return number;
        }
      }

      if (dayMonth) {
        const tempdate = new Date(date);
        return (
          twoDigit(tempdate.getUTCDate()) +
          "/" +
          twoDigit(tempdate.getUTCMonth() + 1)
        );
      }

      const tempdate = new Date();
      return (
        twoDigit(tempdate.getUTCDate()) +
        "/" +
        twoDigit(tempdate.getUTCMonth() + 1) +
        "/" +
        tempdate.getUTCFullYear() +
        " " +
        tempdate.toTimeString().split(" ")[0].split(":").splice(0, 2).join(":")
      );
    }
    const { id } = req.params;

    try {
      const respAthlete = await Atleta.findOne({ _id: id });
      const respGame = await Game.findOne({ _id: respAthlete.idGame });
      const respChampionship = await Campeonato.findOne({
        _id: respAthlete.idChampionship,
      });
      console.log(respAthlete);

      const options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        header: {
          height: "10mm",
          contents:
            '<div style="text-align: center;">Ficha gerada através do aplicativo Observadoor</div>',
        },
        footer: {
          height: "10mm",
          contents: {
            first: dateNow(),
            2: "Second page", // Any page number is working. 1-based index
            default:
              '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: "Last Page",
          },
        },
      };

      const athlete = {
        name: respAthlete?.name,
        gameName: respGame.gameName,
        gameCategory: respGame.category,
        gameDate: dateNow(respGame.dateGame, true),
        gameTeamA: respGame.teamA,
        gameTeamB: respGame.teamB,
        championshipName: respChampionship.name,
        championshipCategory: respChampionship.category,
        championshipLocalization: respChampionship.localization,
        championshipResponsable: respChampionship.responsable,
        championshipDetail: respChampionship.details,
        age:
          new Date().getFullYear() -
          (respAthlete?.year !== undefined
            ? respAthlete.year
            : new Date().getFullYear()),
      };

      const document = {
        html: html,
        data: athlete,
        path: `./pdfGenerate/output-${id}.pdf`,
        type: "",
      };

      pdf
        .create(document, options)
        .then((res) => {
          var tempFile = res.filename;

          fs.readFile(tempFile, function (err, data) {
            response.contentType("application/pdf");
            response.set("Content-Disposition", "attachment");
            response.send(data);
          });

          console.log(res.filename);
          const path = res.filename;

          fs.unlink(path, (err) => {
            if (err) throw err;
            console.log("path/file.txt was deleted");
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
      return response.status(500).json(error);
    }
  },
};
