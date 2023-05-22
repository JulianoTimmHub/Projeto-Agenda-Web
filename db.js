const Sequelize = require('sequelize')
const sequelize = new Sequelize('grupo08', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    query: { raw: true }
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

sequelize.authenticate().then(function () {
    console.log('Conectado com sucesso!')
}).catch(function (erro) {
    console.log('Falha ao se conectar' + erro)
})              