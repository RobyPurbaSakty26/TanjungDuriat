/* eslint-disable no-unused-vars */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.User, {
        foreignKey: "idUser",
      });
      transaction.belongsTo(models.Wahana, {
        foreignKey: "idWahana",
      });
      transaction.belongsTo(models.Paket, {
        foreignKey: "paketId",
      });
    }
  }
  transaction.init(
    {
      idWahana: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
      paketId: DataTypes.INTEGER,
      countTiket: DataTypes.INTEGER,
      countPrice: DataTypes.INTEGER,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return transaction;
};
