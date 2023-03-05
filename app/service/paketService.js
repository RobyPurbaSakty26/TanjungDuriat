const pakteRepository = require("../repository/wahanaRepository");

module.exports = {
  async create(body) {
    const data = await pakteRepository.create(body);
    const count = await pakteRepository.count();
    return {
      data,
      count,
    };
  },
};
