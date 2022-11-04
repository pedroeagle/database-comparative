import {sequelize} from '../../database/postgres';
import {DataTypes} from 'sequelize';

export const Employees = sequelize.define('employees', {
  emp_no: {
    type: DataTypes.INTEGER,
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
