import middleware, {switchHandlers} from '../../../../utils/middleware';
import {Employees as PostgresEmployees}
  from '../../../../models/postgres/employee';
import {Sequelize} from 'sequelize';
import {Titles} from '../../../../models/postgres/title';
import {Salaries} from '../../../../models/postgres/salary';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const {query: {search}} = req;
  const {query: {db}} = req;
  const MongoEmployees = require('../../../../models/mongo/employee')[db === 'mongo' ? 'Employees' : 'EmployeesIndexed'];
  const searchResponse = await MongoEmployees.aggregate([
    {
      $addFields: {
        name: {
          $concat: ['$first_name', ' ', '$last_name'],
        },
      },
    },
    {
      $match: {
        name: {
          $regex: `.*${search}.*`,
          $options: 'i',
        },
      },
    },
    {
      $limit: 100,
    },
  ]);
  res.response = searchResponse;
};
const postgres = async (req, res) => {
  const {query: {search}} = req;
  const count = await PostgresEmployees.findAll({
    where: Sequelize.where(Sequelize.fn('concat',
        Sequelize.col('first_name'),
        ' ', Sequelize.col('last_name')), {
      [Sequelize.Op.like]: `%${search}%`,
    }),
    include: [
      {
        model: Titles,
      },
      {
        model: Salaries,
      },
    ],
    limit: 100,
  });
  res.response = count;
};
