const userService = require("../../../service/userService");

module.exports = {
  async hadnleCreateUserAdminWahana(req, res) {
    try {
      const { Name, Email, Password } = req.body;

      userService.verifyEmail(Email);

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

  async handleAuthorize(req, res, next) {
    try {
      const barerToken = req.headers.authorization;
      if (!barerToken) {
        const err = new Error("Barer token salah");
        throw err;
      }
      const token = barerToken.split("Bearer ")[1];
      const user = await userService.authorize(token);
      if (!user) {
        const err = new Error("Unautorize");
        throw err;
      }
      req.user = user;
      next();
    } catch (err) {
      res.status(402).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async whoIm(req, res) {
    try {
      const user = req.user;
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
