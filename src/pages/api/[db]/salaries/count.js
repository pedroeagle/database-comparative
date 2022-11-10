
import middleware, {switchHandlers} from '../../../../utils/middleware';
import {Salaries as PostgresSalaries}
  from '../../../../models/postgres/salary';
import {Employees} from '../../../../models/mongo/employee';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const {count} = (await Employees.aggregate([
    {
      $group: {
        _id: null, count: {$sum: {$size: '$salaries'}},
      },
    },
  ]))[0];
  res.response = count;
};
const postgres = async (req, res) => {
  const count = await PostgresSalaries.count();
  res.response = count;
};
