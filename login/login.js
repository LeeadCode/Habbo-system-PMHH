const Sequelize = require('sequelize')
const connection = require('../database/database')
const usuario = require('../usuarios/usuario')

const login = connection.define('logins', {
    login: {
        type: Sequelize.STRING,
        allowNull: false
    }, senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


login.belongsTo(usuario) // Um artigo pertence a uma categoria

//login.sync({force: false})

module.exports = login