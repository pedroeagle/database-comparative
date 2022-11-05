import {sequelize} from '../../database/postgres';
import {DataTypes} from 'sequelize';

export const DepartmentEmployee = sequelize.define('dept_emp', {
  emp_no: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  dept_no: {
    type: DataTypes.STRING,
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
