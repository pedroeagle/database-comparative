import {sequelize} from '../../database/postgres';
import {DataTypes} from 'sequelize';
import {Titles} from './title';
import {Salaries} from './salary';
import {DepartmentEmployee} from './dept_emp';

export const Employees = sequelize.define('employees', {
  emp_no: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  birth_date: {
    type: DataTypes.DATE,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  hire_date: {
    type: DataTypes.DATE,
  },
},
{
  timestamps: false,
});
Employees.hasMany(Titles, {foreignKey: 'emp_no'});
Employees.hasMany(Salaries, {foreignKey: 'emp_no'});
Employees.hasMany(DepartmentEmployee, {foreignKey: 'emp_no'});