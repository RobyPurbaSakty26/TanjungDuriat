/* eslint-disable no-unused-vars */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pemasukan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pemasukan.init(
    {
      idUser: DataTypes.INTEGER,
      FromDate: DataTypes.DATE,
      ToDate: DataTypes.DATE,
      Count: DataTypes.INTEGER,
      Keterangan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Income",
    }
  );
  return Pemasukan;
};
