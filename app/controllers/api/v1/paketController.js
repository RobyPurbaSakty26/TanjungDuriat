const paketService = require("../../../service/paketService");

module.exports = {
  async handlerCreatePaket(req, res) {
    try {
      const body = req.body;
      const paket = await paketService.create(body);

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

  async handlerGetAllPaket(req, res) {
    try {
      const { data, count } = await paketService.getAll();

      res.status(200).json({
        status: "OK",
        data: data,
        count: count,
      });
    } catch (err) {
      res.status(401).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async handlerGetByPkPaket(req, res) {
    try {
      const id = req.params.id;
      const data = await paketService.getByPk(id);
      res.status(200).json({
        status: "OK",
        data,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },
};
