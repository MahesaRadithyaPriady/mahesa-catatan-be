"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Relasi one-to-many antara User dan catatan
      User.hasMany(models.catatan, {
        foreignKey: "user_id",
        as: "catatans",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username already exists",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8],
            msg: "Password must be at least 8 characters",
          },
        },
      },
      id_role: {
        type: DataTypes.UUID,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          // Enkripsi password sebelum disimpan
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
          // Set id_role ke ID role "user" jika belum diatur
          if (!user.id_role) {
            const role = await sequelize.models.role.findOne({
              where: { nameRole: "user" },
            });
            user.id_role = role ? role.id : null;
          }
        },
      },
      sequelize,
      modelName: "User",
    }
  );

  // Method untuk membandingkan password
  User.prototype.correctPassword = async function (reqPassword) {
    return await bcrypt.compare(reqPassword, this.password);
  };

  return User;
};
