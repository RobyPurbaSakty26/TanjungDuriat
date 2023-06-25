module.exports = {
  validateGetByDate(req) {
    if (!req.from || !req.to) {
      const err = new Error("Input data belum lengkap");
      throw err;
    }
  },
};
