'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wahana extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  wahana.init({
    paket: DataTypes.STRING,
    domisili: DataTypes.STRING,
    nama_wahana: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'wahana',
  });
  return wahana;
};