import { generate } from 'mongoose-data-faker'
import { EmployeesSchema } from '../../../models/mongo/employee'
import { Employees as PostgresEmployees } from '../../../models/postgres/employee'

const random = async (req, res) => {
    const emp_no = (await PostgresEmployees.max('emp_no')) + Math.floor(Math.random() * 1000)
    const fakeData = generate(EmployeesSchema, 1)[0]
    fakeData.emp_no = emp_no
    fakeData.salaries.forEach(salary => {
        salary.emp_no = emp_no
    });
    fakeData.titles.forEach(title => {
        title.emp_no = emp_no
    });
    res.status(200).json(fakeData);
};
export default random