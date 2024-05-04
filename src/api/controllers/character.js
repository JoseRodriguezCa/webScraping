const Character = require("../models/character");
const characters = require("../../../datos.json");

const insertManyCharacters = async (req, res, next) => {
  try {
    await Character.insertMany(characters);
    res.status(201).json("characters subidos con exito");
  } catch (error) {
    res.status(400).json("error en insertMany");
  }
};

const getAllCharacters = async (req, res, next) => {
  try {
    const allCharacters = await Character.find();
    res.status(200).json(allCharacters);
  } catch (error) {
    res.status(400).json("error en getAll");
  }
};

module.exports = { insertManyCharacters, getAllCharacters }