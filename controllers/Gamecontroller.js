const Game = require("../models/Game");
const Atleta = require("../models/Atleta");

module.exports = {
  async create(req, res) {
    try {
      req.body.userID = req.user._id;
      const result = await Game.create(req.body);
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

      const game = await Game.findOne({ _id: id, userID: user });

      if (game) {
        return res.status(200).json(game);
      }

      return res.status(404).json({ msg: "Game not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
  async edition(req, res) {
    try {
      const { id } = req.params;

      const game = await Game.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });

      if (game) {
        return res.status(200).json(game);
      }

      return res.status(404).json({ msg: "Game not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
  async gameList(req, res) {
    try {
      const { id } = req.params;
      const user = req.user._id;

      const gameList = await Game.find(
        { idChampionship: id, userID: user },
        {}
      );
      return res.status(200).json(gameList);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      const respDelGame = await Game.deleteOne({ _id: id });
      const respDelAthletes = await Atleta.deleteMany({ idGame: id });

      return res.status(200).json({});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
};
