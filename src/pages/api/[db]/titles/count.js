
import middleware, { switchHandlers } from '../../../../utils/middleware';
import { Titles as PostgresTitles }
  from '../../../../models/postgres/title';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const { query: { db } } = req
  const MongoEmployees = require('../../../../models/mongo/employee')[db === 'mongo' ? 'Employees' : 'EmployeesIndexed'];
  const { count } = (await MongoEmployees.aggregate([
    {
      $group: {
        _id: null, count: { $sum: { $size: '$titles' } },
      },
    },
  ]))[0];
  res.response = count;
};
const postgres = async (req, res) => {
  const count = await PostgresTitles.count();
  res.response = count;
};
