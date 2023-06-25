const mutasiService = require("../../../service/mutasiService");
const validateMutasi = require("./helpers/validateMutasi");

module.exports = {
  async handlerGettAllMutasi(req, res) {
    try {
      const { data, count } = await mutasiService.getAll();

      res.status(200).json({
        status: "OK",
        data,
        count,
      });
    } catch (err) {
      res.status(400).json({
        status: "Fail",
        message: err.message,
      });
    }
  },

  async handllerGetByDateMutasi(req, res) {
    try {
      const body = req.body;
      validateMutasi.validateGetByDate(body);

      const mutasi = await mutasiService.getByDate(
        new Date(body.from),
        new Date(`${body.to}T23:59:59`)
      );
      res.status(200).json({
        status: "Success",
        Data: mutasi,
      });
    } catch (err) {
      res.status(400).json({
        status: "Fail",
        message: err.message,
      });
    }
  },

  // async handlerGetByPkMutasi(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const data = await mutasiService.getByPk(id);
  //     if (!data) {
  //       return res.status(404).json({
  //         status: "FAIL",
  //         message: "Data tidak ditemukan",
  //       });
  //     }
  //     return res.status(200).json({
  //       status: "OK",
  //       data: data,
  //     });
  //   } catch (err) {
  //     res.status(400).json({
  //       status: "FAIL",
  //       message: err.message,
  //     });
  //   }
  // },

  // async handlerCreateMutasi(req, res) {
  //   try {
  //     const body = req.body;
  //     if (!body) {
  //       return res.status(400).json({
  //         status: "FAIL",
  //         message: "Data kosong mohon di isi",
  //       });
  //     }
  //     const data = await mutasiService.create(body);

  //     return res.status(201).json({
  //       status: "OK",
  //       data: data,
  //     });
  //   } catch (err) {
  //     res.status(400).json({
  //       status: "FAIL",
  //       message: err.message,
  //     });
  //   }
  // },

  // async handlerUpdateMutasi(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const isData = await mutasiService.getByPk(id);

  //     if (!isData) {
  //       return res.status(404).json({
  //         status: "FAIL",
  //         message: "data id tidak ditemukan",
  //       });
  //     }

  //     return res.status(200).json({
  //       status: "OK",
  //       message: "Data berhasil diupdate",
  //     });
  //   } catch (err) {
  //     res.status(400).json({
  //       status: "FAIL",
  //       message: err.message,
  //     });
  //   }
  // },

  // async handlerDeleteMutasi(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const isData = await mutasiService.getByPk(id);

  //     if (!isData) {
  //       return res.status(404).json({
  //         status: "FAIL",
  //         message: "Id tidak ditemukan",
  //       });
  //     }

  //     return res.status(200).json({
  //       status: "OK",
  //       message: "Data berhasil dihapus",
  //     });
  //   } catch (err) {
  //     res.status(400).json({
  //       status: "FAIL",
  //       message: err.message,
  //     });
  //   }
  // },
};
