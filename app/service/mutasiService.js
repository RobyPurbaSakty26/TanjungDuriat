const mutasiRepository = require("../repository/mutasiRepository");

module.exports = {
  async getAll() {
    const data = await mutasiRepository.getAll();
    const count = await mutasiRepository.count();

    return {
      data,
      count,
    };
  },

  getByPk(id) {
    return mutasiRepository.getByPk(id);
  },

  create(body) {
    return mutasiRepository.create(body);
  },

  update(id, body) {
    return mutasiRepository.update(id, body);
  },

  delete(id) {
    return mutasiRepository.delete(id);
  },
  lastRecord() {
    return mutasiRepository.lastRecord();
  },
};
