// models/catatan.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class catatan extends Model {
    static associate(models) {
      catatan.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  catatan.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name_catatan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Data Yang Di Kirim Tidak Boleh Kosong!",
          },
        },
      },
      isi_catatan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Data Yang Di Kirimkan Tidak Boleh Kosong!",
          },
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "catatan",
    }
  );
  return catatan;
};
