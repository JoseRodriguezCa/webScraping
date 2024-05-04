require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const charactersRouter = require("./src/api/routes/character");

const app = express();

connectDB();

app.use("/api/v1/characters",charactersRouter)

app.use("*", (req, res, next) => {
  res.status(404).json("route not found");
});

app.listen(3000, () => {
  console.log("escuchando en http://localhost:3000");
});
