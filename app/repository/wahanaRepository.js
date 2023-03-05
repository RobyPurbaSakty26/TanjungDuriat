const { Wahana } = require("../models");

module.exports = {
  getAll() {
    return Wahana.findAll();
  },

  count() {
    return Wahana.count();
  },

  create(body) {
    return Wahana.create(body);
  },

  update(id, body) {
    return Wahana.update(body, { where: { id } });
  },

  findByPk(id) {
    return Wahana.findByPk(id);
  },

  delete(id) {
    return Wahana.destroy({ where: { id } });
  },
};
