const Sequelize = require('sequelize')
const connection = require('../database/database')

const reqPromocao = connection.define('reqPromocao', {
    nick:{
        type: Sequelize.STRING,
        allowNull: false
    }, patenteAntiga: {
        type: Sequelize.STRING,
        allowNull: false
    },
    novaPatente: {
      type: Sequelize.STRING,
      allowNull: false
    },
    motivo: {
      type: Sequelize.TEXT,
      allowNull: false
    },
})

reqPromocao.belongsTo(category)

module.exports = reqPromocao