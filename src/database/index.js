const { sequelize, sequelize_default } = require('./postgres')
const { mongoose } = require('./mongo')

module.exports = { sequelize, sequelize_default, mongoose }