const pemasukanRepository = require("../repository/pemasukanRepository");

module.exports = {
  create(body) {
    return pemasukanRepository.create(body);
  },

  async getAll() {
    const data = await pemasukanRepository.getAll();
    const count = await pemasukanRepository.count();
    return {
      data,
      count,
    };
  },

  getByPk(id) {
    return pemasukanRepository.getById(id);
  },

  update(id, body) {
    return pemasukanRepository.update(id, body);
  },

  delete(id) {
    return pemasukanRepository.delete(id);
  },
};
