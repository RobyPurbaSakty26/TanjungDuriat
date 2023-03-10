const paketRepository = require("../repository/paketRepository");

module.exports = {
  async create(body) {
    const data = await paketRepository.create(body);
    const count = await paketRepository.count();
    return {
      data,
      count,
    };
  },

  async getAll() {
    const data = await paketRepository.getAll();
    const count = await paketRepository.count();
    return {
      data,
      count,
    };
  },

  getByPk(id) {
    return paketRepository.getByPk(id);
  },

  update(id, body) {
    return paketRepository.update(id, body);
  },

  delete(id) {
    return paketRepository.delete(id);
  },
};
