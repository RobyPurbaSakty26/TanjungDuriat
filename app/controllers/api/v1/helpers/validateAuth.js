const err = new Error("Input data belum lengkap");
module.exports = {
  valiodateCreateUser(body) {
    if (!body.Name || !body.Email || !body.Password) {
      throw err;
    }
  },
  validatLogin(body) {
    if (!body.Email || !body.Password) {
      throw err;
    }
  },
};
