const waitPort = require('wait-port');
const fs = require('fs')
const extract = require('extract-zip');

const loadPostgresDatabase = async () => {
    await waitPort({ port: 5432, host: 'postgres' })
    const { sequelize_default, sequelize } = require('../database')
    const path = __dirname + '/../../dump.zip'
    await extract(path, { dir: __dirname + '/../../dump' })
    await sequelize_default.query('CREATE DATABASE employees;')
    const dumps = ['employees.sql', 'load_departments.sql', 'load_employees.sql', 'load_dept_emp.sql', 'load_dept_manager.sql', 'load_titles.sql', 'load_salaries.sql']
    for (const dump of dumps) {
        const sql = fs.readFileSync(__dirname + `/../../dump/${dump}`, 'utf-8').replace('\\', '')
        await sequelize.query(sql)
    }
    fs.rmSync(__dirname + '/../../dump', { recursive: true, force: true })
}
const resetPostgresDatabase = async () => {
    await waitPort({ port: 5432, host: 'postgres' })
    const { sequelize_default } = require('../database')
    try {
        await sequelize_default.query('DROP DATABASE employees;')
    } catch (e) { }
}
module.exports = { loadPostgresDatabase, resetPostgresDatabase }