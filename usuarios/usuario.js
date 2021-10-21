const Sequelize  = require('sequelize'),
      connection = require('../database/database');

const usuario = connection.define('usuarios', {
    nick: {
        type: Sequelize.STRING,
        allowNull: false
    }, patente: {
        type: Sequelize.STRING,
        allowNull: false
    }, tag: {
        type: Sequelize.STRING
    }, tipo: {
        type: Sequelize.STRING,
        allowNull: false
    }, status: {
        type: Sequelize.STRING,
        allowNull: false
}
})

usuario.belongsTo(usuario)

//usuario.sync({force: true})

module.exports = usuario