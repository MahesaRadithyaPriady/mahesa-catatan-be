const { catatan } = require("./../models/index");
exports.index = async (req, res) => {
  try {
    const allCatatan = await catatan.findAll({
      attributes: ["id", "name_catatan", "isi_catatan"],
      order: ["id"],
    });
    if (allCatatan.length == 0) {
      return res.status(200).json({
        success: true,
        message: "Berhasil Mendapatkan Data",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Berhasil Mendapatkan Data",
      data: allCatatan,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.singleData = async (req, res) => {
  try {
    const { id } = req.params;
    const singleData = await catatan.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Berhasil Mendapatkan Data",
      data: singleData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

exports.store = async (req, res) => {
  try {
    const { name_catatan, isi_catatan } = req.body;
    if (
      !name_catatan ||
      !isi_catatan ||
      isi_catatan == undefined ||
      name_catatan == undefined
    ) {
      res.status(400).json({
        success: false,
        message: "Data Yang Di Kirim Tidak Boleh Kosong !",
      });
      return;
    }
    const newCatatan = await catatan.create({
      name_catatan,
      isi_catatan,
    });
    res.status(200).json({
      success: true,
      message: "Berhasil Membuat Catatan",
      data: newCatatan,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_catatan, isi_catatan } = req.body;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "Data Yang Di Kirim Tidak Boleh Kosong !",
      });
      return;
    }
    if (
      !name_catatan ||
      !isi_catatan ||
      isi_catatan == undefined ||
      name_catatan == undefined
    ) {
      res.status(400).json({
        success: false,
        message: "Data Yang Di Kirim Tidak Boleh Kosong !",
      });
      return;
    }

    const updateCatatan = await catatan.update(
      {
        name_catatan,
        isi_catatan,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      success: true,
      message: "Berhasil Mengupdate Catatan",
      status: 200,
      request: new Date(),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCatatan = await catatan.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Berhasil Menghapus Catatan",
      status: 200,
      request: new Date(),
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
      status: 400,
    });
  }
};
