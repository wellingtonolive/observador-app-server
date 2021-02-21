const express = require("express");
const router = express.Router();
const AthleteController = require("../controllers/AthleteController");

router.post("/athlete", AthleteController.create);
router.get("/athlete/:id", AthleteController.detail);
router.patch("/athlete/:id", AthleteController.edition);
router.delete("/athlete/:id", AthleteController.delete);

router.get("/athletes/:id", AthleteController.athleteList);

module.exports = router;
