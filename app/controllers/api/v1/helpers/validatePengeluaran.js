module.exports = {
  validateCreatePengeluaran(req) {
    if (!req.Count || !req.Description) {
      const err = new Error("Input data belum lengkap");
      throw err;
    }
  },
};
