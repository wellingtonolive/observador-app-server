const Game = require("../models/Game");

module.exports = {
  async create(req, res) {
    try {
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

      const game = await Game.findOne({ _id: id });

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

      const gameList = await Game.find({ idChampionship: id }, {});
      return res.status(200).json(gameList);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      const game = await Game.deleteOne({ _id: id });

      return res.status(200).json({});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
};
