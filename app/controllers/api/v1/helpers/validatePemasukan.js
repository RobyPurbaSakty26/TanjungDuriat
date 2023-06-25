module.exports = {
  validatePemasukanCreate(body) {
    if (!body.from || !body.to || !body.Keterangan) {
      const err = new Error("Iputan data belum lengkap");
      throw err;
    }
  },
};
