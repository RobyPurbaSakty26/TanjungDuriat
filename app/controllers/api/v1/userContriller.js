const userService = require("../../../service/userService");

module.exports = {
  async handleUpdateUser(req, res) {
    try {
      const { Name, Email, Password } = req.body;
      const body = {
        Name,
        Email,
        Password,
      };

      if (Email) userService.verifyEmail(Email);

      const id = req.params.id;
      await userService.update(body, id);

      res.status(201).json({
        status: "OK",
        message: "UPDATE DATA BERHASIL",
      });
    } catch (err) {
      res.status(401).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async handleDeleteUser(req, res) {
    try {
      const id = req.params.id;
      await userService.delete(id);

      res.status(201).json({
        status: "OK",
        message: "DELETE DATA SUCCESS",
      });
    } catch (err) {
      res.status(401).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async handleGetByPkUser(req, res) {
    try {
      const id = req.params.id;
      const user = await userService.getByPk(id);

      res.status(201).json({
        status: "OK",
        data: user,
      });
    } catch (err) {
      res.status(401).json({
        status: "OK",
        message: err.message,
      });
    }
  },
};
