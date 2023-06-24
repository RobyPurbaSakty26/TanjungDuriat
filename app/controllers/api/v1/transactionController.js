const transactionSetvice = require("../../../service/transactionService");
const validateTransaction = require("./helpers/validateTransaction");
module.exports = {
  async handllerCreateTransaction(req, res) {
    try {
      const body = req.body;
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
      res.status(404).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },
};
