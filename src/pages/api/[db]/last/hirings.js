import middleware, {switchHandlers} from '../../../../utils/middleware';
import {Employees as PostgresEmployees} from '../../../../models/postgres/employee';
import {Titles} from '../../../../models/postgres/title';
import {Salaries} from '../../../../models/postgres/salary';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const {query: {db}} = req;
  const MongoEmployees = require('../../../../models/mongo/employee')[db === 'mongo' ? 'Employees' : 'EmployeesIndexed'];
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
    ],
  });
  res.response = employees;
};
