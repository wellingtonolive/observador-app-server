const express = require("express");
const router = express.Router();
const Gamecontroller = require("../controllers/Gamecontroller");

router.post("/game", Gamecontroller.create);
router.get("/game/:id", Gamecontroller.detail);
router.patch("/game/:id", Gamecontroller.edition);
router.delete("/game/:id", Gamecontroller.delete);

router.get("/games/:id", Gamecontroller.gameList);

module.exports = router;
