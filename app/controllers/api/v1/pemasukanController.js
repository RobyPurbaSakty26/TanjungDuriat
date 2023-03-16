const pemeasukanService = require("../../../service/pemeasukanService");

module.exports = {
  async handlerGetAllPemasukan(req, res) {
    try {
      const { data, count } = await pemeasukanService.getAll();

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

  async handlerGetByPkPemasukan(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(404).json({
          status: "FAIL",
          message: "Data tidak ditemukan",
        });
      }
      const data = await pemeasukanService.getByPk(id);

      return res.status(200).json({
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

  async handlerCreatePemasukan(req, res) {
    try {
      const body = req.body;

      const data = await pemeasukanService.create(body);

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

  async handlerUpdatePemasukan(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;

      if (!id) {
        return res.status(404).json({
          status: "FAIL",
          message: "Data tidak ditemukan",
        });
      }
      await pemeasukanService.update(id, body);
      return res.status(200).json({
        status: "OK",
        message: "Data berhasil diupdate",
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async handlerDeletePemasukan(req, res) {
    try {
      const id = req.params.id;
      const isTersedia = await pemeasukanService.getByPk(id);

      if (!isTersedia) {
        return res.status(404).json({
          status: "FAIL",
          message: "Id tidak ditemukan",
        });
      }

      return res.status(200).json({
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
