const { Schema, model } = require("mongoose");

const athleteSchema = new Schema(
  {
    idGame: { type: Schema.Types.ObjectId, ref: "Game" },
    name: { type: String },
    year: { type: Number },
    birthDate: { type: Date },
    team: { type: String },
    shirtNumber: { type: Number },
    skillLeg: { type: String },
    shortPass: { type: String },
    longPass: { type: String },
    header: { type: String },
    position: { type: String },
    velocity: { type: String },
    reactionPower: { type: String },
    mobility: { type: String },
    finalization: { type: String },
    comentary: { type: String },
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

const athleteModel = model("athlete", athleteSchema, "athlete");

module.exports = athleteModel;
