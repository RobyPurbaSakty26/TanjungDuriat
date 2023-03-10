const { Pemasukan } = require("../models");

module.exports = {
  create(body) {
    return Pemasukan.create(body);
  },

  getAll() {
    return Pemasukan.findAll();
  },

  count() {
    return Pemasukan.count();
  },

  getById(id) {
    return Pemasukan.findByPk(id);
  },

  update(id, body) {
    return Pemasukan.update(body, { where: { id } });
  },

  delete(id) {
    return Pemasukan.destroy(id);
  },
};
