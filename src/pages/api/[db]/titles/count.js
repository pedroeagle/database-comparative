
import middleware, {switchHandlers} from '../../../../utils/middleware';
import {Titles as MongoTitles}
  from '../../../../models/mongo/title';
import {Titles as PostgresTitles}
  from '../../../../models/postgres/title';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
  const count = await MongoTitles.countDocuments();
  res.response = count;
};
const postgres = async (req, res) => {
  const count = await PostgresTitles.count();
  res.response = count;
};
