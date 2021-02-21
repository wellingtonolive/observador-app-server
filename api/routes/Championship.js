const express = require("express");
const router = express.Router();
const ChampionshipController = require("../controllers/ChampionshipController");

router.post("/championship", ChampionshipController.create);
router.get("/championship/:id", ChampionshipController.detail);
router.patch("/championship/:id", ChampionshipController.edition);
router.delete("/championship/:id", ChampionshipController.delete);

router.get("/championships", ChampionshipController.championshipsList);

module.exports = router;
