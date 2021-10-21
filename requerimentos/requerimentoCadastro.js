const Sequelize = require('sequelize')
const connection = require('../database/database')
const usuario = require('../usuarios/usuario')

const requerimento = connection.define('requerimentoCadastros', {
  patente: {
    type: Sequelize.STRING,
    allowNull: false
  },
  motivo: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  nick: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tipo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

requerimento.belongsTo(usuario, {
  foreignKey: 'idSrh',
  as: 'srh'
}) // Um requerimento tem muitos usuarios

requerimento.belongsTo(usuario, {
  foreignKey: 'idRequerente',
  as: 'requerente'
})

//requerimento.sync({ force: false })

module.exports = requerimento
