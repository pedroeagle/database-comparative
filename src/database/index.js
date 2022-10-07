const { sequelize, sequelize_default } = require('./postgres')
const { mongoose } = require('./mongo')
// const { mongooseAdmin } = require('./mongoAdmin')
module.exports = { sequelize, sequelize_default, mongoose }