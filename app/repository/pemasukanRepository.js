const { Income } = require("../models");
module.exports = {
  create(body) {
    return Income.create(body);
  },

  getAll() {
    return Income.findAll();
  },

  count() {
    return Income.count();
  },

  getByPk(id) {
    return Income.findByPk(id);
  },

  update(id, body) {
    return Income.update(body, { where: { id } });
  },

  delete(id) {
    return Income.destroy({ where: { id } });
  },
};
