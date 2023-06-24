/* eslint-disable no-unused-vars */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mutasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mutasi.init(
    {
      idIncome: DataTypes.INTEGER,
      idExpenditure: DataTypes.INTEGER,
      Saldo: DataTypes.INTEGER,
      Date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Mutasi",
    }
  );
  return Mutasi;
};
