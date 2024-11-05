// Middleware Cek id Apakah Atau Tidak

const { catatan } = require("../models/index");

exports.cekId = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      success: false,
      message: "Data Yang Di Kirim Tidak Boleh Kosong !",
    });
    return;
  }
  const cekid = await catatan.findByPk(id);
  if (!cekid) {
    return res.status(400).json({
      status: false,
      message: "Data Yang Di Kirim Tidak Ada Di Rekapan kami !",
    });
  }

  next();
};

exports.validateNameCatatan = async (req, res, next) => {
  const { name_catatan } = req.body;
  if (!name_catatan || name_catatan == undefined || name_catatan == "") {
    return res.status(400).json({
      success: false,

      message: "Data Yang Di Kirim Tidak Boleh Kosong !",
    });
  }
  const validateNameCatatanUnique = await catatan.findOne({
    where: {
      name_catatan,
    },
  });
  if (!validateNameCatatanUnique || validateNameCatatanUnique.length == 0) {
    next();
  } else {
    return res.status(400).json({
      status: 400,
      message: "Data Yang Di Kirim Sudah Ada Di Rekapan kami !",
      request: new Date(),
    });
  }
};
