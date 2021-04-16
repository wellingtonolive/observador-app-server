const Athlete = require("../models/Atleta");

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
};
