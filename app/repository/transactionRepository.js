const { Transaction } = require("../models");

module.exports = {
  create(body) {
    return Transaction.create(body);
  },
};
