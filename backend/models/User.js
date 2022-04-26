const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Se não existir essa Tabela
//User.sync();
// User.sync({ alter: true }); // Verifica se tem mudanca na tabela e realiza alteracao
module.exports = User;