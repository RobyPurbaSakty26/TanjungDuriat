/* eslint-disable no-unused-vars */
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class wahana extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      wahana.hasMany(models.Transaction, {
        foreignKey: "idWahana",
      });
    }
  }
  wahana.init(
    {
      NameWahana: DataTypes.STRING,
      Status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Wahana",
    }
  );
  return wahana;
};
