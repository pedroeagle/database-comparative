
import middleware, { switchHandlers } from "../../../../utils/middleware"
import { Employees as MongoEmployees } from "../../../../models/mongo/employee"
import { Employees as PostgresEmployees } from "../../../../models/postgres/employee"

export default middleware(async (req, res) => {
    await switchHandlers(req, res, mongo, postgres)
});
const mongo = async (req, res) => {

    const count = await MongoEmployees.countDocuments()
    res.response = count
}
const postgres = async (req, res) => {
    const count = await PostgresEmployees.count()
    res.response = count
    console.log('COUNTTT', count)
}