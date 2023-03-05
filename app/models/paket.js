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
    }
  }
  Paket.init(
    {
      idWahana: DataTypes.INTEGER,
      NamaPaket: DataTypes.STRING,
      Harga: DataTypes.INTEGER,
      Keterangan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Paket",
    }
  );
  return Paket;
};
