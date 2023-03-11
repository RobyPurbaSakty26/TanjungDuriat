const pengeluaranService = require("../../../service/pengeluaranService");

module.exports = {
  async handlerCreatePengeluaran(req, res) {
    try {
      const body = req.body;
      const Pengeluaran = await pengeluaranService.create(body);

      res.status(201).json({
        status: "OK",
        data: Pengeluaran,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async handlerGetAllPengeluaran(req, res) {
    try {
      const { data, count } = await pengeluaranService.getAll();

      res.status(200).json({
        status: "OK",
        data,
        count,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async handlerGetByPkPengeluaran(req, res) {
    try {
      const id = req.params.id;
      const data = await pengeluaranService.getByPk(id);

      if (!data) {
        return res.status(404).json({
          status: "FAIL",
          message: "Data tidak ditemukan",
        });
      }

      res.status(200).json({
        status: "OK",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async handlerUpdatePengeluaran(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const data = await pengeluaranService.getByPk(id);
      if (!data) {
        return res.status(404).json({
          status: "FAIL",
          message: "Data tidak ditemukan",
        });
      }

      await pengeluaranService.update(id, body);
      res.status(200).json({
        status: "OK",
        message: "Data berhasil di update",
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async handlerDeletePengeluaran(req, res) {
    try {
      const id = req.params.id;
      const data = await pengeluaranService.getByPk(id);

      if (!data) {
        return res.status(404).json({
          status: "FAIL",
          message: "Data Pengeluaran tidak ditemukan",
        });
      }

      await pengeluaranService.delete(id);
      res.status(200).json({
        status: "OK",
        message: "Data berhasil dihapus",
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },
};
