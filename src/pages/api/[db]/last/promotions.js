import middleware, {switchHandlers} from '../../../../utils/middleware';
import {Employees as MongoEmployees} from '../../../../models/mongo/employee';
import {Employees as PostgresEmployees} from '../../../../models/postgres/employee';
import {Titles} from '../../../../models/postgres/title';
import {Salaries} from '../../../../models/postgres/salary';
import {DepartmentManager as MongoDepartmentManager}
  from '../../../../models/mongo/dept_manager';
import {DepartmentManager as PostgresDerpartmentManager}
  from '../../../../models/postgres/dept_manager';
import {DepartmentEmployee as MongoDepartmentEmployee} from '../../../../models/mongo/dept_emp';
import {DepartmentEmployee as PostgresDepartmentEmployee} from '../../../../models/postgres/dept_emp';
import {Departments as PostgresDepartments} from '../../../../models/postgres/department';
import {Departments as MongoDepartments} from '../../../../models/mongo/department';


export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const promotions = await MongoDepartmentManager.find({},
      [],
      {
        skip: 0,
        limit: 5,
        sort: {
          from_date: -1,
        },
      });
  const response = [];
  for (const promotion of promotions) {
    const employee = await MongoEmployees.findOne({emp_no: promotion.emp_no},
        ['emp_no',
          'birth_date',
          'first_name',
          'last_name',
          'gender',
          'hire_date']);
    const departments =
    Promise.all((await MongoDepartmentEmployee.find({emp_no: promotion.emp_no}))
        .map(async ({dept_no: dept})=>
          await MongoDepartments.findOne({dept_no: dept})));
    response.push({promotion, employee, departments});
  }
  res.response = response;
};
const postgres = async (req, res) => {
  const response = {};
  const employees = await PostgresDerpartmentManager.findAll({
    order: [['from_date', 'DESC']],
    limit: 5,
    include: [
      {
        model: PostgresEmployees,
      },
      {
        model: PostgresDepartmentEmployee,
      },
    ]});
  res.response = employees;
};
