const {
  insertManyCharacters,
  getAllCharacters,
} = require("../controllers/character");

const charactersRouter = require("express").Router();

charactersRouter.post("/insertMany", insertManyCharacters);
charactersRouter.get("/", getAllCharacters);

module.exports = charactersRouter;
