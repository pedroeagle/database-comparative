import middleware, {switchHandlers} from '../../../../../utils/middleware';
import {Departments as MongoDepartments}
  from '../../../../../models/mongo/department';
import {DepartmentEmployee as MongoDepartmentEmployee}
  from '../../../../../models/mongo/dept_emp';
import {DepartmentEmployee as PostgresDepartmentEmployee}
  from '../../../../../models/postgres/dept_emp';
import {Departments as PostgresDepartments} from '../../../../../models/postgres/department';
import {sequelize} from '../../../../../database';

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
  const count = await PostgresDepartmentEmployee.findAll({
    group: ['"department".dept_no'],
    include: [{
      model: PostgresDepartments,
    }],
    attributes: ['"department".dept_no', [sequelize.fn('COUNT', 'dept_no'), 'count']],
  });
  count.forEach(({dataValues: {count, department: {dept_name}}})=>response[dept_name]=parseInt(count));
  res.response = response;
};
