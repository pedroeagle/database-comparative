const waitPort = require('wait-port')
const fs = require('fs')
const { Employees } = require('../models/mongo/employee')
const { exec } = require("child_process")
const path = __dirname + '/../../dump.zip'

const loadPostgresDatabase = async () => {
    await waitPort({ port: 5432, host: 'postgres' })
    const { sequelize_default, sequelize } = require('../database')
    await extract(path, { dir: __dirname + '/../../dump' })
    await sequelize_default.query('CREATE DATABASE employees;')
    const dumps = ['employees.sql', 'load_departments.sql', 'load_employees.sql', 'load_dept_emp.sql', 'load_dept_manager.sql', 'load_titles.sql', 'load_salaries.sql']
    for (const dump of dumps) {
        const sql = fs.readFileSync(__dirname + `/../../dump/${dump}`, 'utf-8').replace('\\', '')
        await sequelize.query(sql)
    }
}
const resetPostgresDatabase = async () => {
    await waitPort({ port: 5432, host: 'postgres' })
    const { sequelize_default } = require('../database')
    try {
        await sequelize_default.query('DROP DATABASE employees;')
    } catch (e) { }
}

const loadMongoDatabase = async () => {
    await waitPort({ port: 27017, host: 'mongo' })
    await extract(path, { dir: __dirname + '/../../dump' })
    exec('mongoimport --db employees --collection employees --file employees.json --jsonArray --username mongo --password mongo --authenticationDatabase admin', (err, res) => {
        console.log(err)
        console.log(res)
    })
}

module.exports = { loadPostgresDatabase, resetPostgresDatabase, loadMongoDatabase, loadMongoDatabaseFromSqlFiles }