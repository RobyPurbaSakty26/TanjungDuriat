const pemasukanRepository = require("../repository/pemasukanRepository");

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

  create(body) {
    return pemasukanRepository.create(body);
  },

  update(id, body) {
    return pemasukanRepository.update(id, body);
  },

  delete(id) {
    return pemasukanRepository.delete(id);
  },
};
