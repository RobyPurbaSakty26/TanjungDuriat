/* eslint-disable no-unused-vars */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pengeluaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pengeluaran.init(
    {
      idUser: DataTypes.INTEGER,
      Date: DataTypes.DATE,
      Count: DataTypes.INTEGER,
      Description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Expenditure",
    }
  );
  return Pengeluaran;
};
