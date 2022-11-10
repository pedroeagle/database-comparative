import {sequelize} from '../../database/postgres';
import {DataTypes} from 'sequelize';
import {Departments} from './department';

export const DepartmentEmployee = sequelize.define('dept_emp', {
  emp_no: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  dept_no: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  to_date: {
    type: DataTypes.DATE,
  },
  from_date: {
    type: DataTypes.DATE,
  },
},
{
  timestamps: false,
  tableName: 'dept_emp',
});
DepartmentEmployee.belongsTo(Departments, {foreignKey: 'dept_no'});
Departments.hasMany(DepartmentEmployee, {foreignKey: 'dept_no'});
