import middleware, {switchHandlers} from '../../../../utils/middleware';
import {Employees as PostgresEmployees}
  from '../../../../models/postgres/employee';
import {sequelize} from '../../../../database';
import {Titles as PostgresTitles} from '../../../../models/postgres/title';
import {Salaries as PostgresSalaries} from '../../../../models/postgres/salary';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const {body} = req;
  const {query: {db}} = req;
  const MongoEmployees = require('../../../../models/mongo/employee')[db === 'mongo' ? 'Employees' : 'EmployeesIndexed'];
  const response = await MongoEmployees.create([body]);
  res.response = response;
};
const postgres = async (req, res) => {
  const {body} = req;
  const transaction = await sequelize.transaction();
  try {
    const employee = await PostgresEmployees.create(body, {transaction});
    const titles = await PostgresTitles.bulkCreate(body.titles, {transaction});
    const salaries = await PostgresSalaries.bulkCreate(body.salaries, {transaction});
    await transaction.commit();
    res.response = {employee, titles, salaries};
  } catch (error) {
    await transaction.rollback();
  }
};
