import middleware, {switchHandlers} from '../../../../utils/middleware';
import {Employees as PostgresEmployees}
  from '../../../../models/postgres/employee';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const { query: { db } } = req
  const MongoEmployees = require('../../../../models/mongo/employee')[db === 'mongo' ? 'Employees' : 'EmployeesIndexed'];
  const count = await MongoEmployees.countDocuments();
  res.response = count;
};
const postgres = async (req, res) => {
  const count = await PostgresEmployees.count();
  res.response = count;
};
