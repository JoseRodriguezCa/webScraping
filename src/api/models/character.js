const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "characters",
  }
);

const Character = mongoose.model("characters", characterSchema, "characters");

module.exports = Character;
