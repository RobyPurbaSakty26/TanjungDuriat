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
};
