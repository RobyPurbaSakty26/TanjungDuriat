const userService = require("../../../service/userService");

module.exports = {
  async hadnleCreateUser(req, res) {
    try {
      const { Name, Email, Password } = req.body;
      const Role = "Admin Wahana";
      const user = await userService.create(Name, Email, Password, Role);

      res.status(201).json({
        status: "OK",
        data: user,
      });
    } catch (err) {
      res.status(401).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async handleGetAllUsers(req, res) {
    try {
      const { data, count } = await userService.getAll();

      res.status(201).json({
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

  async handleLogin(req, res) {
    try {
      const { Email, Password } = req.body;
      const user = await userService.login(Email, Password);

      res.status(201).json({
        status: "OK",
        data: user,
      });
    } catch (err) {
      res.status(401).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },
};
