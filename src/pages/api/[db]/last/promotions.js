import middleware, {switchHandlers} from '../../../../utils/middleware';
import {Employees as PostgresEmployees} from '../../../../models/postgres/employee';
import {DepartmentManager as PostgresDerpartmentManager}
  from '../../../../models/postgres/dept_manager';
import {DepartmentEmployee as PostgresDepartmentEmployee} from '../../../../models/postgres/dept_emp';
import {Departments as PostgresDepartments} from '../../../../models/postgres/department';


export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const {query: {db}} = req;
  const MongoEmployees = require('../../../../models/mongo/employee')[db === 'mongo' ? 'Employees' : 'EmployeesIndexed'];
  const MongoDepartmentManager = require('../../../../models/mongo/dept_manager')[db === 'mongo' ? 'DepartmentManager' : 'DepartmentManagerIndexed'];
  const MongoDepartmentEmployee = require('../../../../models/mongo/dept_emp')[db === 'mongo' ? 'DepartmentEmployee' : 'DepartmentEmployeeIndexed'];
  const MongoDepartments = require('../../../../models/mongo/department')[db === 'mongo' ? 'Departments' : 'DepartmentsIndexed'];
  const promotions = (await MongoDepartmentManager.find({},
      ['dept_no', 'emp_no', 'to_date', 'from_date'],
      {
        skip: 0,
        limit: 6,
        sort: {
          from_date: -1,
        },
      })).map((promotion) => promotion.toObject());
  const response = [];
  for (const promotion of promotions) {
    const employee = await MongoEmployees.findOne({emp_no: promotion.emp_no},
        ['emp_no',
          'birth_date',
          'first_name',
          'last_name',
          'gender',
          'hire_date']);
    const department = (await MongoDepartments.findOne({dept_no: promotion.dept_no})).toObject();
    const deptEmps =
      await (await MongoDepartmentEmployee.find({emp_no: employee.emp_no})).map((deptEmp) => deptEmp.toObject());

    response.push({...promotion, department, employee, dept_emps: deptEmps});
  }
  res.response = response;
};
const postgres = async (req, res) => {
  const employees = await PostgresDerpartmentManager.findAll({
    order: [['from_date', 'DESC']],
    limit: 6,
    include: [
      {
        model: PostgresEmployees,
        include: [
          {model: PostgresDepartmentEmployee},
        ],
      },
      {
        model: PostgresDepartments,
      },
    ],
  });
  res.response = employees;
};
