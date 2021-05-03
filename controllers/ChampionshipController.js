const Championship = require("../models/Campeonato");
const Game = require("../models/Game");
const Atleta = require("../models/Atleta");

module.exports = {
  async create(req, res) {
    try {
      req.body.userID = req.user._id;
      const result = await Championship.create(req.body);
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

      const championship = await Championship.findOne({
        _id: id,
        userID: user,
      });

      if (championship) {
        return res.status(200).json(championship);
      }

      return res.status(404).json({ msg: "Championship not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
  async edition(req, res) {
    try {
      const { id } = req.params;

      const championship = await Championship.findOneAndUpdate(
        { _id: id },
        req.body,
        {
          new: true,
        }
      );

      if (championship) {
        return res.status(200).json(championship);
      }

      return res.status(404).json({ msg: "Championship not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
  async championshipsList(req, res) {
    const user = req.user._id;

    try {
      const championshipsList = await Championship.find(
        { userID: user },
        {
          _id: 1,
          name: 1,
        }
      );
      return res.status(200).json(championshipsList);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      const respDelChampionship = await Championship.deleteOne({ _id: id });
      const respDelGames = await Game.deleteMany({ idChampionship: id });
      const respDelAthletes = await Atleta.deleteMany({ idChampionship: id });

      return res.status(200).json({});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
};
