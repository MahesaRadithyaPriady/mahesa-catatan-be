const express = require("express");
const catatanController = require("./../controllers/catatanController");
const catatanMiddleware = require("./../middlewares/catatanMiddleware");
const authMiddleware = require("./../middlewares/authMiddleware");
const Router = express.Router();

Router.get("/catatan/", authMiddleware.jwtVerify, catatanController.index);
Router.get(
  "/catatan/:id",
  authMiddleware.jwtVerify,
  catatanController.singleData
);
Router.get("/db/status", (req, res) => {
  const status = 200;
  if (status === 200) {
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Server Online",
      data: {
        version: "1.5.0",
      },
    });
  }
  res.status(400).json({
    status: 400,
    success: false,
    message: "Server Offline",
    data: {
      version: "1.5.0",
    },
  });
});

Router.post(
  "/catatan/",
  catatanMiddleware.validateNameCatatan,
  authMiddleware.jwtVerify,
  catatanController.store
);
Router.put(
  "/catatan/:id",
  catatanMiddleware.cekId,
  authMiddleware.jwtVerify,
  catatanController.update
);
Router.delete(
  "/catatan/:id",
  catatanMiddleware.cekId,
  authMiddleware.jwtVerify,
  catatanController.delete
);
module.exports = Router;
