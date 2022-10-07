const waitPort = require('wait-port')
const fs = require('fs')
const { exec } = require("child_process")
const extract = require('extract-zip')

const path = __dirname + '/../../dump.zip'

const loadPostgresDatabase = async () => {
    await waitPort({ port: 5432, host: 'postgres' })
    const { sequelize } = require('../database')
    const [employees] = await sequelize.query("SELECT * FROM information_schema.tables WHERE table_name='employees'")
    if (employees.length) {
        console.log('Postgres Database is already loaded.')
    } else {
        const dumps = ['employees.sql', 'load_departments.sql', 'load_employees.sql', 'load_dept_emp.sql', 'load_dept_manager.sql', 'load_titles.sql', 'load_salaries.sql']
        for (const dump of dumps) {
            const sql = fs.readFileSync(__dirname + `/../../dump/${dump}`, 'utf-8').replace('\\', '')
            await sequelize.query(sql)
        }
    }
}

const extractDumpFile = async () => {
    const config = { dir: __dirname + '/../../dump' }
    if (!fs.existsSync(config.dir)) {
        await extract(path, config)
    } else {
        console.log('Dump file is already extracted.')
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
    const collections = ['employees', 'departments', 'dept_emp', 'dept_manager']
    for (const collection of collections) {
        exec(`mongoimport --db employees --collection ${collection} --file ../dump/${collection}.json --jsonArray --username mongo --password mongo --uri mongodb://mongo:mongo@mongo:27017 --authenticationDatabase admin`)
    }
}

module.exports = { loadPostgresDatabase, resetPostgresDatabase, loadMongoDatabase, extractDumpFile }