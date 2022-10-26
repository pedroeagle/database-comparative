import { Employees } from "../../../models/mongo/employee"

export default async function handler(req, res) {
    const count = await Employees.countDocuments()
    res.status(200).json(count)
}