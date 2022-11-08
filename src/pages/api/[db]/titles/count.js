
import middleware, {switchHandlers} from '../../../../utils/middleware';
import {Titles as PostgresTitles}
  from '../../../../models/postgres/title';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {

};
const postgres = async (req, res) => {
  const count = await PostgresTitles.count();
  res.response = count;
};
