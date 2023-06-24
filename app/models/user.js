"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction, {
        foreignKey: "idUser",
      });
    }
  }
  User.init(
    {
      Name: DataTypes.STRING,
      Password: DataTypes.STRING,
      Email: DataTypes.STRING,
      Role: DataTypes.ENUM(["Admin Wahana", "Admin Keuangan"]),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
