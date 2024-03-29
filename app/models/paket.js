/* eslint-disable no-unused-vars */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paket.hasMany(models.Transaction, {
        foreignKey: "paketId",
      });
    }
  }
  Paket.init(
    {
      idWahana: DataTypes.INTEGER,
      NamePackage: DataTypes.STRING,
      Price: DataTypes.INTEGER,
      Description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Paket",
    }
  );
  return Paket;
};
