const paketRepository = require("../../../service/paketService");

module.exports = {
  async handlerCreatePaket(req, res) {
    try {
      const body = req.body;
      const paket = await paketRepository.create(body);

      res.status(201).json({
        status: "OK",
        data: paket,
      });
    } catch (err) {
      res.status(401).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },
};
