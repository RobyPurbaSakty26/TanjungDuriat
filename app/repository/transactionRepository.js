const { Op } = require("sequelize");
const { Transaction } = require("../models");

module.exports = {
  create(body) {
    return Transaction.create(body);
  },
  findByDate(from, to) {
    return Transaction.findAll({
      where: {
        // [Op.between]: [{ date: from }, { date: to }],
        date: {
          [Op.and]: {
            [Op.gte]: from,
            [Op.lte]: to,
          },
        },
      },
    });
  },
};
