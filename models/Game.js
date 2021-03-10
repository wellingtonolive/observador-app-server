const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    idChampionship: { type: Schema.Types.ObjectId, ref: "Campeonato" },
    gameName: { type: String },
    dateGame: { type: Date },
    category: { type: String },
    teamA: { type: String },
    teamB: { type: String },
    userID: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    // Tira o __v da db
    toJSON: {
      transform: (doc, returnDoc) => {
        delete returnDoc.__v;
        return returnDoc;
      },
    },
  }
);

const gameModel = model("game", gameSchema, "game");

module.exports = gameModel;
