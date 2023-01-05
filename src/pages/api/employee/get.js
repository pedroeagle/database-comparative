import { Employees as PostgresEmployees } from '../../../models/postgres/employee'

const random = async (req, res) => {
    const count = await PostgresEmployees.count();
    const r = Math.floor(Math.random() * count);
    const { rows } = await PostgresEmployees.findAndCountAll({
        limit: 1,
        offset: r,
    });
    res.status(200).json(rows[0]);
};
export default random