
import middleware, {switchHandlers} from '../../../../utils/middleware';
import {Titles as PostgresTitles}
  from '../../../../models/postgres/title';
import {Employees} from '../../../../models/mongo/employee';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const {count} = (await Employees.aggregate([
    {
      $group: {
        _id: null, count: {$sum: {$size: '$titles'}},
      },
    },
  ]))[0];
  res.response = count;
};
const postgres = async (req, res) => {
  const count = await PostgresTitles.count();
  res.response = count;
};
