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
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true,
        default: null
    },
})

// Se não existir essa Tabela
// User.sync();
// User.sync({ alter: true }); // Verifica se tem mudanca na tabela e realiza alteracao
module.exports = User;