const transactionRepository = require("../repository/transactionRepository");
const paketService = require("./paketService");
const userService = require("./userService");
const wahanaService = require("./wahanaService");

module.exports = {
  async create(body) {
    try {
      const user = await userService.getByPk(body.idUser);
      if (!user) {
        const err = new Error("id user tidak ditemukan");
        throw err;
      }
      const wahana = await wahanaService.findByPk(body.idWahana);
      if (!wahana) {
        const err = new Error("Id wahana tidak ditemukan");
        throw err;
      }
      if (wahana.Status != true) {
        const err = new Error("Wahana sedang tidak tersedia");
        throw err;
      }

      const paket = await paketService.getByPk(body.paketId);
      if (!paket) {
        const err = new Error("Paket tidak tersedia");
        throw err;
      }
      const countPrice = body.countTiket * paket.Price;
      const date = new Date();
      body = {
        ...body,
        countPrice,
        date,
      };

      let transaction = await transactionRepository.create(body);
      transaction = {
        ...transaction.dataValues,
        nameWahana: wahana.NameWahana,
        namePackage: paket.NamePackage,
      };

      return transaction;
    } catch (err) {
      throw new Error(err);
    }
  },

  getByDate(from, to) {
    return transactionRepository.findByDate(from, to);
  },

  async countIcome(from, to) {
    const data = await this.getByDate(from, to);
    let saldo = 0;
    for (let i = 0; i < data.length; i++) {
      saldo = saldo + data[i].dataValues.countPrice;
    }
    return saldo;
  },
};
