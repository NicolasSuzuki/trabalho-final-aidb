const Sequelize = require('sequelize');
const db = require('./db');

const Vaccine = db.define('vaccine', {
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
    vaccineId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true
    },
})

// Se não existir essa Tabela
// Vaccine.sync();
// Vaccine.sync({ alter: true }); // Verifica se tem mudanca na tabela e realiza alteracao
module.exports = Vaccine;