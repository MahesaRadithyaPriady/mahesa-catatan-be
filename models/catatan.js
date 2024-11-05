"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class catatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
            msg: "Data Yang Di Kirim Tidak Boleh Kosong !",
          },
        },
      },
      isi_catatan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Data  Yang Di Kirimkan Tidak Boleh Kosong !",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "catatan",
      hooks: {
        afterValidate: (catatan, options) => {
          catatan.name_catatan = catatan.name_catatan.toLowerCase();
        },
      },
    }
  );
  return catatan;
};
