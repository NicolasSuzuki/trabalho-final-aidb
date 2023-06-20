const Sequelize = require('sequelize');
const db = require('./db');

const Appointment = db.define('appointments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    petId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
})

// Se não existir essa Tabela
// Appointment.sync();
// Appointment.sync({ alter: true }); // Verifica se tem mudanca na tabela e realiza alteracao
module.exports = Appointment;