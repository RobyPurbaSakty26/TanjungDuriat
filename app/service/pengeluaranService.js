const pengeluaranRepository = require("../repository/pengeluaranRepository");
const mutasiService = require("./mutasiService");

module.exports = {
  async create(body) {
    try {
      let mutasi = await mutasiService.lastRecord();
      const { Count } = body;

      // validate conditon
      if (mutasi.dataValues.Saldo < Count) {
        const err = new Error("Saldo anda tidak mencukupi");
        throw err;
      }

      // create pengeluaran
      const pengeluaran = await pengeluaranRepository.create(body);
      // udapte mutasi
      const dataMutasi = {
        idExpenditure: pengeluaran.dataValues.id,
        Saldo: mutasi.dataValues.Saldo - Count,
        Date: new Date(),
      };

      // create data mutasi
      const newMutasi = await mutasiService.create(dataMutasi);

      return pengeluaran, newMutasi;
    } catch (err) {
      throw new Error(err);
    }
  },

  async getAll() {
    const data = await pengeluaranRepository.getAll();
    const count = await pengeluaranRepository.count();
    return {
      data,
      count,
    };
  },

  getByPk(id) {
    return pengeluaranRepository.getById(id);
  },

  update(id, body) {
    return pengeluaranRepository.update(id, body);
  },

  delete(id) {
    return pengeluaranRepository.delete(id);
  },
};
