const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("miawor", "root", "1234", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log("Conexão feita com sucesso")
}).catch(() => {
    console.log("Erro ao conectar ao banco")
})
module.exports = sequelize;