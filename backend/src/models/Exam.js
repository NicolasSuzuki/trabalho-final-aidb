const Sequelize = require('sequelize');
const db = require('./db');

const Exam = db.define('exams', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    petId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    imageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: true
    },
})

// Se não existir essa Tabela
// Exam.sync();
// Exam.sync({ alter: true }); // Verifica se tem mudanca na tabela e realiza alteracao
module.exports = Exam;