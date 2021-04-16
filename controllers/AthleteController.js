const Athlete = require("../models/Atleta");
const Game = require("../models/Game");
const Championship = require("../models/Campeonato");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const html = fs.readFileSync("./config/templatePdf.html", "utf8");

module.exports = {
  async create(req, res) {
    try {
      req.body.userID = req.user._id;
      const result = await Athlete.create(req.body);
      return res.status(201).json({ result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
  async detail(req, res) {
    try {
      const { id } = req.params;
      const user = req.user._id;

      const athlete = await Athlete.findOne({ _id: id, userID: user });

      if (athlete) {
        return res.status(200).json(athlete);
      }

      return res.status(404).json({ msg: "Athlete not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
  async edition(req, res) {
    try {
      const { id } = req.params;

      const athlete = await Athlete.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });

      if (athlete) {
        return res.status(200).json(athlete);
      }

      return res.status(404).json({ msg: "Athlete not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
  async athleteList(req, res) {
    try {
      const { id } = req.params;
      const user = req.user._id;

      const athleteList = await Athlete.find({ idGame: id, userID: user }, {});
      return res.status(200).json(athleteList);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      const athlete = await Athlete.deleteOne({ _id: id });

      return res.status(200).json({});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },

  async getpdf(req, response) {
    function dateNow(date, dayMonth, getDate) {
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

      if (getDate) {
        const tempdate = new Date(date);
        return (
          twoDigit(tempdate.getUTCDate()) +
          "/" +
          twoDigit(tempdate.getUTCMonth() + 1) +
          "/" +
          tempdate.getUTCFullYear()
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
      const respAthlete = await Athlete.findOne({
        _id: id,
        userID: req.user._id,
      });
      const respGame = await Game.findOne({
        _id: respAthlete.idGame,
        userID: req.user._id,
      });
      const respChampionship = await Championship.findOne({
        _id: respAthlete.idChampionship,
        userID: req.user._id,
      });

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
        name: respAthlete?.name,
        year: respAthlete?.year,
        birthDate: dateNow(respAthlete?.birthDate, false, true),
        team: respAthlete?.team,
        skillLeg: respAthlete?.skillLeg,
        shirtNumber: respAthlete?.shirtNumber,
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
            //response.contentType("application/pdf");
            //response.set("Content-Disposition", "attachment");
            //response.set("Content-Security-Policy", "default-src *");
            //response.set( "Content-Security-Policy", "default-src 'none'; connect-src 'self';font-src 'self'; img-src 'self' data: https:; style-src 'self' ; script-src 'self'" );
            response.send(data);
          });

          const path = res.filename;

          fs.unlink(path, (err) => {
            if (err) throw err;
            console.log(`output-${id}.pdf was deleted`);
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
  async postdpf(req, res) {},
};
