import middleware, {switchHandlers} from '../../../../utils/middleware';
import {Departments as MongoDepartments}
  from '../../../../models/mongo/department';
import {DepartmentEmployee as MongoDepartmentEmployee}
  from '../../../../models/mongo/dept_emp';
import {DepartmentEmployee as PostgresDepartmentEmployee}
  from '../../../../models/postgres/dept_emp';
import {Departments as PostgresDepartments} from '../../../../models/postgres/department';
import {Employees as MongoEmployees} from '../../../../models/mongo/employee';
import {Employees as PostgresEmployees} from '../../../../models/postgres/employee';
import {Titles} from '../../../../models/postgres/title';
import {Salaries} from '../../../../models/postgres/salary';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const response = await MongoEmployees.find({},
      [],
      {
        skip: 0,
        limit: 5,
        sort: {
          hire_date: -1,
        },
      });
  res.response = response;
};
const postgres = async (req, res) => {
  const response = {};
  const employees = await PostgresEmployees.findAll({
    order: [['hire_date', 'DESC']],
    limit: 5,
    include: [
      {
        model: Titles,
      },
      {
        model: Salaries,
      },
    ]});
  res.response = employees;
};
