const { Op } = require("sequelize");
const { Mutasi } = require("../models");
module.exports = {
  getAll() {
    return Mutasi.findAll();
  },

  getByPk(id) {
    return Mutasi.findByPk(id);
  },

  count() {
    return Mutasi.count();
  },

  create(body) {
    return Mutasi.create(body);
  },

  update(id, body) {
    return Mutasi.update(body, { where: { id } });
  },

  delete(id) {
    return Mutasi.destroy({ where: { id } });
  },
  lastRecord() {
    return Mutasi.findOne({
      order: [["createdAt", "DESC"]],
    });
  },

  getByDate(from, to) {
    console.log("Repository", from, to);

    return Mutasi.findAll({
      where: {
        Date: {
          [Op.and]: {
            [Op.gte]: from,
            [Op.lte]: to,
          },
        },
      },
    });
  },
};
