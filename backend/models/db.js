const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("petlife", "root", "1234", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log("Conexão feita com sucesso")
}).catch(() => {
    console.log("Erro")
})
module.exports = sequelize;