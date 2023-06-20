const User = require("../models/User");
const getToken = require("../utils/token");

const userServices = {
  getUserByToken: (token) => {
    if (!token) return null;
    return User.findOne({
      where: { token },
    });
  },
  getUserById: (token) => {
    if (!token) return null;
    return User.findOne({
      where: { token },
    });
  },
  loginAdminUser: ({ email, password }) =>
    User.findOne({
      where: {
        email,
        password,
        is_admin: 1,
      },
    }).then((user) => user.update({ token: getToken() })),
  loginUser: ({ email, password }) =>
    User.findOne({
      where: {
        email,
        password,
      },
    }).then((user) => user.update({ token: getToken() })),
  logoffUser: ({ token }) =>
    User.findOne({
      where: {
        token,
      },
    }).then((user) => user.update({ token: null })),
  createUser: (body) => {
    return User.create(body)
      .then((user) =>
        ({
          erro: false,
          mensagem: "Usuario cadastrado com sucesso",
          user
        })
      )
      .catch(() =>
        ({
          erro: true,
          mensagem: "Usuario nao cadastrado",
        })
      );
  },
};

module.exports = userServices;
