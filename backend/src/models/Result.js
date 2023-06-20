const Sequelize = require('sequelize');
const db = require('./db');

const Result = db.define('result', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true
    },
    petId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    appointmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
})

// Se não existir essa Tabela
Result.sync();
// Result.sync({ alter: true }); // Verifica se tem mudanca na tabela e realiza alteracao
module.exports = Result;