const pengeluaranRepository = require("../repository/pengeluaranRepository");

module.exports = {
  create(body) {
    return pengeluaranRepository.create(body);
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
