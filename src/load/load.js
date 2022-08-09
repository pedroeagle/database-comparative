const waitPort = require('wait-port')
const fs = require('fs')
const extract = require('extract-zip')
const { Employees } = require('../models/mongo/employee')
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
    const dumps = ['load_departments.sql', 'load_employees.sql', 'load_dept_emp.sql', 'load_dept_manager.sql', 'load_titles.sql', 'load_salaries.sql']
    const employeesSql = fs.readFileSync(__dirname + '/../../dump/load_employees.sql', 'utf-8').replace('\\', '')
    const titlesSql = fs.readFileSync(__dirname + '/../../dump/load_titles.sql', 'utf-8').replace('\\', '')
    const salariesSql = fs.readFileSync(__dirname + '/../../dump/load_salaries.sql', 'utf-8').replace('\\', '')
    const employees = parseEmployees(employeesSql, titlesSql, salariesSql)
}
const parseEmployees = async (employeesSql, titlesSql, salariesSql) => {
    const employeesTuples = parseTuples(employeesSql, ['emp_no', 'birth_date', 'first_name', 'last_name', 'gender', 'hire_date'])
    const titlesTuples = parseTuples(titlesSql, ['emp_no', 'title', 'from_date', 'to_date'])
    const salariesTuples = parseTuples(salariesSql, ['emp_no', 'salary', 'from_date', 'to_date'])
    const employees = []
    for (const employee of employeesTuples) {
        const employeeDocument = {
            ...employee,
            titles: titlesTuples.filter(title => title.emp_no === employee.emp_no),
            salaries: salariesTuples.filter(salary => salary.emp_no === employee.emp_no)
        }
        employees.push(employeeDocument)
    }
    fs.writeFileSync('load_employees.json', JSON.stringify({ employees }), () => { })
}
const parseTuples = (sql, fields) => {
    const documents = []
    const tuples = sql.replace(/INSERT\sINTO\s.+\sVALUES\s/, '').replace('),', ')),').split('),')
    tuples.forEach((tuple) => {
        const values = tuple.replace(')', '').replace('(', '').replace(/'/g, '').split(',')
        const document = {}
        values.forEach((value, index) => {
            document[fields[index]] = value
        })
        documents.push(document)
    })
    return documents
}

module.exports = { loadPostgresDatabase, resetPostgresDatabase, loadMongoDatabase }