import middleware, { switchHandlers } from '../../../../utils/middleware';
import { Employees as PostgresEmployees }
  from '../../../../models/postgres/employee';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const { query: { page, limit } } = req;
  const { query: { db } } = req
  const MongoEmployees = require('../../../../models/mongo/employee')[db === 'mongo' ? 'Employees' : 'EmployeesIndexed'];
  const response = await MongoEmployees.find({},
    [
      'emp_no',
      'birth_date',
      'first_name',
      'last_name',
      'gender',
      'hire_date',
    ],
    { skip: parseInt(page) * parseInt(limit), limit: parseInt(limit) });
  res.response = response;
};
const postgres = async (req, res) => {
  const { query: { page, limit } } = req;
  const { rows } = await PostgresEmployees.findAndCountAll({
    limit: parseInt(limit),
    offset: parseInt(page) * parseInt(limit),
  });
  res.response = rows;
};
