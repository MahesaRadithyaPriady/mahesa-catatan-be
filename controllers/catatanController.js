const { catatan, User } = require("./../models/index");

exports.index = async (req, res) => {
  try {
    const allCatatan = await catatan.findAll({
      attributes: ["id", "name_catatan", "isi_catatan", "user_id"],
      order: [["id", "ASC"]],
      include: [{ model: User, as: "user", attributes: ["username"] }],
    });
    res.status(200).json({
      success: true,
      message: "Berhasil Mendapatkan Data",
      data: allCatatan,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
    });
  }
};

exports.singleData = async (req, res) => {
  try {
    const { id } = req.params;
    const singleData = await catatan.findOne({
      where: { id },
      include: [{ model: User, as: "user", attributes: ["username"] }],
    });
    if (!singleData) {
      return res.status(404).json({
        success: false,
        message: "Catatan tidak ditemukan",
      });
    }
    res.status(200).json({
      success: true,
      message: "Berhasil Mendapatkan Data",
      data: singleData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.store = async (req, res) => {
  try {
    const { name_catatan, isi_catatan, user_id } = req.body;

    if (!name_catatan || !isi_catatan) {
      return res.status(400).json({
        success: false,
        message: "Data Yang Di Kirim Tidak Boleh Kosong !",
      });
    }

    const newCatatan = await catatan.create({
      name_catatan,
      isi_catatan,
      user_id, // Menggunakan user_id yang diterima dari request
    });
    res.status(201).json({
      success: true,
      message: "Berhasil Membuat Catatan",
      data: newCatatan,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_catatan, isi_catatan } = req.body;

    if (!name_catatan || !isi_catatan) {
      return res.status(400).json({
        success: false,
        message: "Data Yang Di Kirim Tidak Boleh Kosong !",
      });
    }

    const updateCatatan = await catatan.update(
      { name_catatan, isi_catatan },
      { where: { id } }
    );

    if (!updateCatatan[0]) {
      return res.status(404).json({
        success: false,
        message: "Catatan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil Mengupdate Catatan",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCatatan = await catatan.destroy({ where: { id } });

    if (!deleteCatatan) {
      return res.status(404).json({
        success: false,
        message: "Catatan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil Menghapus Catatan",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
