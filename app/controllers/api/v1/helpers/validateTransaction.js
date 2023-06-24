module.exports = {
  validateCreate(req) {
    if ((!req.idUser || !req.idWahana, !req.paketId, !req.countTiket)) {
      return false;
    }
    return true;
  },
};
