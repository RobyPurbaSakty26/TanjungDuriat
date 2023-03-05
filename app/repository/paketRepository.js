const { Paket } = require("../models");
module.exports = {
  create(body) {
    return Paket.create(body);
  },

  count() {
    return Paket.count();
  },

  getAll() {
    return Paket.findAll();
  },

  update(id, body) {
    return Paket.update(body, { where: id });
  },

  getByPk(id) {
    return Paket.findByPk(id);
  },
};
