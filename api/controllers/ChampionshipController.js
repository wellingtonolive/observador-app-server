const Championship = require("../models/Campeonato");

module.exports = {
  async create(req, res) {
    try {
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

      const championship = await Championship.findOne({ _id: id });

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
    try {
      const championshipsList = await Championship.find(
        {},
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

      const championship = await Championship.deleteOne({ _id: id });

      return res.status(200).json({});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  },
};
