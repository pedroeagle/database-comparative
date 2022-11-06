
import middleware, {switchHandlers} from '../../../../utils/middleware';
import {Salaries as MongoSalaries}
  from '../../../../models/mongo/salarie';
import {Salaries as PostgresSalaries}
  from '../../../../models/postgres/salarie';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const count = await MongoSalaries.countDocuments();
  res.response = count;
};
const postgres = async (req, res) => {
  const count = await PostgresSalaries.count();
  res.response = count;
};