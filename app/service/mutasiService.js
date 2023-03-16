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

  async isId(id) {
    const idPk = await this.getByPk(id);
    if (!idPk) {
      const status = 404;
      const message = "Id tidak ditemukan";
      return {
        status,
        message,
      };
    }
  },
};
