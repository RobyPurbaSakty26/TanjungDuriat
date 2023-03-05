const pakteRepository = require("../repository/paketRepository");

module.exports = {
  async create(body) {
    const data = await pakteRepository.create(body);
    const count = await pakteRepository.count();
    return {
      data,
      count,
    };
  },

  async getAll() {
    const data = await pakteRepository.getAll();
    const count = await pakteRepository.count();
    return {
      data,
      count,
    };
  },
};
