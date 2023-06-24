const pemasukanRepository = require("../repository/pemasukanRepository");
const mutasiService = require("./mutasiService");
const transactionService = require("./transactionService");

module.exports = {
  async getAll() {
    const data = await pemasukanRepository.getAll();
    const count = await pemasukanRepository.count();

    return {
      data,
      count,
    };
  },

  getByPk(id) {
    return pemasukanRepository.getByPk(id);
  },

  async create(body) {
    try {
      const transaction = await transactionService.getByDate(
        body.from,
        body.to
      );

      let mutasi = await mutasiService.lastRecord();

      const income = await transactionService.countIcome(body.from, body.to);

      body = {
        FromDate: body.from,
        ToDate: body.to,
        Count: income,
      };

      let pemasukan = await pemasukanRepository.create(body);
      var dataMutasi = {};
      if (mutasi == null) {
        dataMutasi = {
          idIncome: pemasukan.dataValues.id,
          Saldo: 0 + income,
          Date: new Date(),
        };
      } else {
        dataMutasi = {
          idIncome: pemasukan.dataValues.id,
          Saldo: mutasi.dataValues.Saldo + income,
          Date: new Date(),
        };
      }

      await mutasiService.create(dataMutasi);

      pemasukan = {
        ...pemasukan.dataValues,
        transaction,
      };
      return pemasukan;
    } catch (err) {
      throw new Error(err);
    }
  },

  update(id, body) {
    return pemasukanRepository.update(id, body);
  },

  delete(id) {
    return pemasukanRepository.delete(id);
  },
};
