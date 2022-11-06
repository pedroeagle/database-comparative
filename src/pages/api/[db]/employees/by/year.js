import middleware, {switchHandlers} from '../../../../../utils/middleware';
import {DepartmentEmployee as MongoDepartmentEmployee}
  from '../../../../../models/mongo/dept_emp';
import {DepartmentEmployee as PostgresDepartmentEmployee}
  from '../../../../../models/postgres/dept_emp';

export default middleware(async (req, res) => {
  await switchHandlers(req, res, mongo, postgres);
});

const dates = [
  '07-31',
  '07-30',
  '07-29',
  '07-28',
  '07-27',
  '07-26',
  '07-25',
];

const mongo = async (req, res) => {
  const response = {};
  for (const year of ['2000', '2001']) {
    response[year] = {};
    for (const date of dates) {
      const dateString = year+'-'+date;
      const {count} =
        (await MongoDepartmentEmployee.aggregate([
          {$match: {from_date: {$eq: dateString}}},
          {$group: {_id: null, count: {$sum: 1}}},
        ]))[0];
      response[year][date] = count;
    }
  }
  res.response = response;
};
const postgres = async (req, res) => {
  const response = {};
  for (const year of ['2000', '2001']) {
    response[year] = {};
    for (const date of dates) {
      const dateString = year+'-'+date;
      const {count} = await PostgresDepartmentEmployee.findAndCountAll(
          {where: {from_date: dateString}},
      );
      response[year][date] = count;
    }
  }
  res.response = response;
};
