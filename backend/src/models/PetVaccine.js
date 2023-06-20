const Sequelize = require('sequelize');
const db = require('./db');

const PetVaccine = db.define('pet-vaccine', {
    vaccineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    petId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    vaccinatedAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

// Se não existir essa Tabela
// PetVaccine.sync();
// PetVaccine.sync({ alter: true }); // Verifica se tem mudanca na tabela e realiza alteracao
module.exports = PetVaccine;