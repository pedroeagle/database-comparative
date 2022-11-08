import {sequelize} from '../../database/postgres';
import {DataTypes} from 'sequelize';
import {Employees} from '../postgres/employee';
import {DepartmentEmployee} from './dept_emp';

export const DepartmentManager = sequelize.define('dept_manager', {
  dept_no: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  emp_no: {
    type: DataTypes.INTEGER,
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
  tableName: 'dept_manager',
});

DepartmentManager.belongsTo(Employees, {foreignKey: 'emp_no'});
