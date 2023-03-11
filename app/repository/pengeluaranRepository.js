const { Pengeluaran } = require("../models");

module.exports = {
  create(body) {
    return Pengeluaran.create(body);
  },

  getAll() {
    return Pengeluaran.findAll();
  },

  count() {
    return Pengeluaran.count();
  },

  getById(id) {
    return Pengeluaran.findByPk(id);
  },

  update(id, body) {
    return Pengeluaran.update(body, { where: { id } });
  },

  delete(id) {
    return Pengeluaran.destroy({ where: { id } });
  },
};
