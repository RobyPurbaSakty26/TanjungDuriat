const userService = require("../../../service/userService");
const validateAuth = require("./helpers/validateAuth");

module.exports = {
  async hadnleCreateUserAdminWahana(req, res) {
    try {
      const { Name, Email, Password } = req.body;

      validateAuth.valiodateCreateUser(req.body);

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

  async hadnleCreateUserAdminKeuangan(req, res) {
    try {
      const { Name, Email, Password } = req.body;

      validateAuth.valiodateCreateUser(req.body);

      userService.verifyEmail(Email);

      const Role = "Admin Keuangan";
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

  async hadnleCreateUserAdminManager(req, res) {
    try {
      const { Name, Email, Password } = req.body;

      validateAuth.valiodateCreateUser(req.body);

      userService.verifyEmail(Email);

      const Role = "Admin Manager";
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
      validateAuth.validatLogin(req.body);
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
        const err = new Error("Bearer token salah");
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
      if (!user) {
        const err = new Error("User not found");
        throw err;
      }
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

  async middlewareIsAdminWahana(req, res, next) {
    try {
      const role = req.user.Role;
      if (role != "Admin Wahana") {
        res.status(203).json({
          status: "Fail",
          message: "Kamu bukan Admin Wahana",
        });
        return;
      }
      next();
    } catch (err) {
      res.status(401).json({
        status: "Fail",
        message: err.message,
      });
    }
  },

  async middlewareIsAdminKeuangan(req, res, next) {
    try {
      const role = req.user.Role;
      if (role != "Admin Keuangan") {
        res.status(203).json({
          status: "Fail",
          message: "Kamu bukan Admin Keuangan",
        });
        return;
      }
      next();
    } catch (err) {
      res.status(401).json({
        status: "Fail",
        message: err.message,
      });
    }
  },
  async middlewareIsManagerOrAminKeuangan(req, res, next) {
    try {
      const role = req.user.Role;
      if (role != "Admin Keuangan" || role != "Manager") {
        res.status(203).json({
          status: "Fail",
          message: "Kamu bukan manager  atau admin keuangan",
        });
        return;
      }
      next();
    } catch (err) {
      res.status(401).json({
        status: "Fail",
        message: err.message,
      });
    }
  },

  async middlewareIsManager(req, res, next) {
    try {
      const role = req.user.Role;
      if (role != "Manager") {
        res.status(203).json({
          status: "Fail",
          message: "Kamu bukan manager",
        });
        return;
      }
      next();
    } catch (err) {
      res.status(401).json({
        status: "Fail",
        message: err.message,
      });
    }
  },
};
