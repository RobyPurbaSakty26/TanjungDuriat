module.exports = {
  validateCreatePaket(req) {
    if (!req.idWahana || !req.NamePackage || !req.Price || !req.Description) {
      const err = new Error("Input data belum lengkap");
      throw err;
    }
  },
};
