import middleware, { switchHandlers } from '../../../../utils/middleware';
import { Employees as PostgresEmployees }
    from '../../../../models/postgres/employee';

export default middleware(async (req, res) => {
    await switchHandlers(req, res, mongo, postgres);
});
const mongo = async (req, res) => {
    const { body } = req
    const { query: { db } } = req
    const MongoEmployees = require('../../../../models/mongo/employee')[db === 'mongo' ? 'Employees' : 'EmployeesIndexed'];
    const response = await MongoEmployees.findOneAndUpdate({ emp_no: body.emp_no }, body)
    res.response = response
};
const postgres = async (req, res) => {
    const { body } = req
    const response = await PostgresEmployees.update(body, { where: { emp_no: body.emp_no } })
    res.response = response
};
