const Sequelize = require("sequelize");
const db = require("./db");

const Image = db.define("image", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  data: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// Se não existir essa Tabela
// Image.sync();
// Image.sync({ alter: true }); // Verifica se tem mudanca na tabela e realiza alteracao
module.exports = Image;