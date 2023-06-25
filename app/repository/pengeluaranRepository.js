const { Expenditure } = require("../models");

module.exports = {
  create(body) {
    return Expenditure.create(body);
  },

  getAll() {
    return Expenditure.findAll();
  },

  count() {
    return Expenditure.count();
  },

  getById(id) {
    return Expenditure.findByPk(id);
  },

  update(id, body) {
    return Expenditure.update(body, { where: { id } });
  },

  delete(id) {
    return Expenditure.destroy({ where: { id } });
  },
};
