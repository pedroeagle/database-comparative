
import middleware, {switchHandlers} from '../../../../utils/middleware';
import {Departments as MongoDepartments}
  from '../../../../models/mongo/department';
import {Departments as PostgresDepartments}
  from '../../../../models/postgres/department';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const count = await MongoDepartments.countDocuments();
  res.response = count;
};
const postgres = async (req, res) => {
  const count = await PostgresDepartments.count();
  res.response = count;
};
