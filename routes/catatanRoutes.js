const express = require("express");
const catatanController = require("./../controllers/catatanController");
const catatanMiddleware = require("./../middlewares/catatanMiddleware");
const { Sequelize } = require("sequelize");
const config = require("./../config/config");
const Router = express.Router();

Router.get("/catatan/", catatanController.index);
Router.get("/catatan/:id", catatanController.singleData);
Router.get("/db/test/", (req, res) => {
  const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      host: config.development.host,
      dialect: config.development.dialect,
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });

  res.send("Hello World");
});
Router.post(
  "/catatan/",
  catatanMiddleware.validateNameCatatan,
  catatanController.store
);
Router.put("/catatan/:id", catatanMiddleware.cekId, catatanController.update);
Router.delete(
  "/catatan/:id",
  catatanMiddleware.cekId,
  catatanController.delete
);
module.exports = Router;
