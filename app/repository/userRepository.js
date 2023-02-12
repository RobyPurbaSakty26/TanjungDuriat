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
};