const transactionSetvice = require("../../../service/transactionService");
const validateTransaction = require("./helpers/validateTransaction");
module.exports = {
  async handllerCreateTransaction(req, res) {
    try {
      const idUser = req.user.id;
      const role = req.user.Role;

      let body = req.body;
      body = {
        ...body,
        idUser,
      };

      if (role != "Admin Wahana") {
        res.status(203).json({
          status: "Fail",
          message: "Kamu bukan admin Wahana",
        });
      }

      const validate = validateTransaction.validateCreate(body);

      if (!validate) {
        res.status(401).json({
          status: "Fail",
          message: "Request tidak lengkap",
        });
        return;
      }

      const transaction = await transactionSetvice.create(body);

      res.status(201).json({
        status: "Created",
        data: transaction,
      });
    } catch (err) {
      res.status(400).json({
        status: "Fail",
        message: err.message,
      });
    }
  },

  async getByDate(req, res) {
    try {
      const { from, to } = req.body;
      if (!from || !to) {
        return res.status(401).json({
          status: "Fail",
          message: "Input tidak lengkap",
        });
      }

      const transaction = await transactionSetvice.getByDate(from, to);
      res.status(200).json({
        status: "Ok",
        data: transaction,
      });
    } catch (err) {
      res.status(404).json({
        status: "Fail",
        message: err.message,
      });
    }
  },

  // async lastTransaction(req, res) {
  //   try {
  //     const last = await transactionRepository.findLastTransaction();
  //     res.status(200).json({
  //       status: "Ok",
  //       data: last,
  //     });
  //   } catch (err) {
  //     res.status(404).json({
  //       status: "Fail",
  //       message: err.message,
  //     });
  //   }
  // },

  // async total(req, res) {
  //   try {
  //     const saldo = await transactionSetvice.countIcome(
  //       "2023-06-24",
  //       "2023-06-25"
  //     );

  //     res.status(200).json({
  //       status: "Ok",
  //       data: saldo,
  //     });
  //   } catch (err) {
  //     res.status(404).json({
  //       status: "Fail",
  //       message: err.message,
  //     });
  //   }
  // },
};
