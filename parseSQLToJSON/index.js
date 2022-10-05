const extract = require('extract-zip')
const fs = require('fs')
const path = __dirname + '/../dump.zip'


const generateMongoDatabaseFromSqlFiles = async () => {
    await extract(path, { dir: __dirname + '/../dump' })
    const employeesSql = fs.readFileSync(__dirname + '/../dump/load_employees.sql', 'utf-8').replace('\\', '')
    const titlesSql = fs.readFileSync(__dirname + '/../dump/load_titles.sql', 'utf-8').replace('\\', '')
    const salariesSql = fs.readFileSync(__dirname + '/../dump/load_salaries.sql', 'utf-8').replace('\\', '')
    const departmentsSql = fs.readFileSync(__dirname + '/../dump/load_departments.sql', 'utf-8').replace('\\', '')
    const deptEmpSql = fs.readFileSync(__dirname + '/../dump/load_dept_emp.sql', 'utf-8').replace('\\', '')
    const deptManagerSql = fs.readFileSync(__dirname + '/../dump/load_dept_manager.sql', 'utf-8').replace('\\', '')
    parseEmployees({ employeesSql, titlesSql, salariesSql, deptEmpSql, departmentsSql, deptManagerSql })
}
const parseEmployees = async ({ employeesSql, titlesSql, salariesSql, deptEmpSql, departmentsSql, deptManagerSql }) => {
    const employeesTuples = parseTuples(employeesSql, ['emp_no', 'birth_date', 'first_name', 'last_name', 'gender', 'hire_date'])
    const titlesTuples = parseTuples(titlesSql, ['emp_no', 'title', 'from_date', 'to_date'])
    const salariesTuples = parseTuples(salariesSql, ['emp_no', 'salary', 'from_date', 'to_date'])
    const departmentsTuples = parseTuples(departmentsSql, ['dept_no', 'dept_name'])
    const deptEmpTuples = parseTuples(deptEmpSql, ['emp_no', 'dept_no', 'from_date', 'to_date'])
    const deptManagerTuples = parseTuples(deptManagerSql, ['dept_no', 'emp_no', 'from_date', 'to_date'])
    const employees = []

    fs.writeFileSync('departments.json', JSON.stringify(departmentsTuples))
    fs.writeFileSync('dept_emp.json', JSON.stringify(deptEmpTuples))
    fs.writeFileSync('dept_manager.json', JSON.stringify(deptManagerTuples))

    for (const employee of employeesTuples) {
        const employeeDocument = {
            ...employee,
            titles: titlesTuples.filter(title => title.emp_no === employee.emp_no),
            salaries: salariesTuples.filter(salary => salary.emp_no === employee.emp_no)
        }
        employees.push(employeeDocument)
    }
    fs.writeFileSync('employees.json', JSON.stringify(employees), () => { })
    return employees
}
const parseTuples = (sql, fields) => {
    const documents = []
    const tuples = sql.replace(/INSERT\sINTO\s.+\sVALUES\s/g, '').replace(/\n/g, '').replace('),', ')),').replace(/;/g, '').split('),')
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
generateMongoDatabaseFromSqlFiles()