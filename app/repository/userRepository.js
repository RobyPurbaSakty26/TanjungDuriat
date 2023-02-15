const { User } = require("../models");

module.exports = {
  create(body) {
    return User.create(body);
  },

  getAll() {
    return User.findAll();
  },

  count() {
    return User.count();
  },

  findUser(condition) {
    return User.findOne({ where: condition });
  },

  update(body, id) {
    return User.update(body, { where: { id } });
  },

  delete(id) {
    return User.destroy({ where: { id } });
  },
};
