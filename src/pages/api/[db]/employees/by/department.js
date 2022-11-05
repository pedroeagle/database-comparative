import middleware, {switchHandlers} from '../../../../../utils/middleware';
import {Departments as MongoDepartments}
  from '../../../../../models/mongo/department';
import {DepartmentEmployee as MongoDepartmentEmployee}
  from '../../../../../models/mongo/dept_emp';
import {DepartmentEmployee as PostgresDepartmentEmployee}
  from '../../../../../models/postgres/dept_emp';
import {Departments as PostgresDepartments} from '../../../../../models/postgres/department';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const response = {};
  const departments = await MongoDepartments.find();
  const employees = await Promise.all(departments.map(
      async ({dept_no}) =>
        await MongoDepartmentEmployee.count({dept_no, to_date: '9999-01-01'})));
  employees.forEach((count, i) => response[departments[i].dept_name] = count);
  res.response = response;
};
const postgres = async (req, res) => {
  const response = {};
  const departments = await PostgresDepartments.findAll();
  const employees = await Promise.all(departments.map(
      async ({dept_no}) =>
        (await PostgresDepartmentEmployee.findAndCountAll({where: {dept_no, to_date: '9999-01-01'}})).count));
  employees.forEach((count, i) => response[departments[i].dept_name] = count);
  console.log(response);
  res.response = response;
};
