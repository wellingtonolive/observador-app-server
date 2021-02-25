const { Schema, model } = require("mongoose");

const championshipSchema = new Schema(
  {
    name: { type: String },
    localization: { type: String },
    competionDate: { type: Date },
    category: { type: String },
    responsable: { type: String },
    details: { type: String },
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

const championshipModel = model(
  "championship",
  championshipSchema,
  "championship"
);

module.exports = championshipModel;
