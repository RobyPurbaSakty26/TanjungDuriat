const pemasukanService = require("../../../service/pemasukanService");

module.exports = {
  async handlerCreatePemasukan(req, res) {
    try {
      const body = req.body;
      const pemasukan = await pemasukanService.create(body);

      res.status(201).json({
        status: "OK",
        data: pemasukan,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async handlerGetAllPemasukan(req, res) {
    try {
      const { data, count } = await pemasukanService.getAll();

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
      const data = await pemasukanService.getByPk(id);

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

  async handlerUpdatePemasukan(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const data = await pemasukanService.getByPk(id);
      if (!data) {
        return res.status(404).json({
          status: "FAIL",
          message: "Data tidak ditemukan",
        });
      }

      await pemasukanService.update(id, body);
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

  async handlerDeletePemasukan(req, res) {
    try {
      const id = req.params.id;
      const data = await pemasukanService.getByPk(id);

      if (!data) {
        return res.status(404).json({
          status: "FAIL",
          message: "Data Pemasukan tidak ditemukan",
        });
      }

      await pemasukanService.delete(id);
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
