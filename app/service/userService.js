const userRepository = require("../repository/userRepository");

const bcrypt = require("bcryptjs");
// const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");
const { use } = require("../../config/routes");

const SECRET_KEY = "Secret";

async function encryptPassword(str) {
  try {
    const hash = await bcrypt.hash(str, 10);
    return hash;
  } catch (err) {
    console.log(err);
  }
}

async function comparePassword(password, encryptedPassword) {
  try {
    const isValid = await bcrypt.compare(password, encryptedPassword);
    return isValid;
  } catch (err) {
    console.log(err);
  }
}

function createWebToken(payload) {
  return jwt.sign(payload, SECRET_KEY);
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  async create(Name, Email, Password, Role) {
    try {
      const user = await userRepository.findUser({ Email });
      if (user) {
        const err = new Error("Email telah digunakan");
        throw err;
      }
      console.log("ini user", Email);

      const encryptedPassword = await encryptPassword(Password);

      const body = {
        Name,
        Email,
        Password: encryptedPassword,
        Role,
      };

      return userRepository.create(body);
    } catch (err) {
      throw err;
    }
  },

  async getAll() {
    try {
      const data = await userRepository.getAll();
      const count = await userRepository.count();

      return {
        data,
        count,
      };
    } catch (err) {
      throw err;
    }
  },

  async login(Email, Password) {
    try {
      const isUser = await userRepository.findUser({ Email });
      if (!isUser) {
        const err = new Error("Email Belum terdaftar");
        throw err;
      }

      const { Password: encryptedPassword } = isUser;
      const isAuthenticated = await comparePassword(
        Password,
        encryptedPassword
      );

      if (!isAuthenticated) {
        const err = new Error("Password salah");
        throw err;
      }

      const token = createWebToken({
        id: isUser.id,
        Email: isUser.Email,
        Role: isUser.Role,
      });

      const data = {
        ...isUser.dataValues,
        token,
      };

      return data;
    } catch (err) {
      throw err;
    }
  },
};
