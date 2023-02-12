const userService = require("../../../service/userService");

module.exports = {
  async hadnleCreateUser(req, res) {
    try {
      const body = req.body;
      const user = await userService.create(body);

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
