const Sequelize = require('sequelize')

const connection = new Sequelize(
  'heroku_7a5e3f3fb475dd3',
  'b9c815a6e1d282',
  'a2de64ea',
  {
    host: 'us-cdbr-east-04.cleardb.com',
    dialect: 'mysql'
  }
)

// mysql://b9c815a6e1d282:a2de64ea@us-cdbr-east-04.cleardb.com/heroku_7a5e3f3fb475dd3?reconnect=true

module.exports = connection
