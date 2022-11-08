
import middleware, {switchHandlers} from '../../../../utils/middleware';
import {Salaries as PostgresSalaries}
  from '../../../../models/postgres/salary';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {

};
const postgres = async (req, res) => {
  const count = await PostgresSalaries.count();
  res.response = count;
};
