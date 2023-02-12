const userRepository = require("../repository/userRepository");

module.exports = {
  create(body) {
    return userRepository.create(body);
  },

  async getAll() {
    try {
      const data = await userRepository.getAll();
      const count = await userRepository.count();

      return {
        data: data,
        count: count,
      };
    } catch (err) {
      throw err;
    }
  },
};
