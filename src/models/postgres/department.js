import {sequelize} from '../../database/postgres';
import {DataTypes} from 'sequelize';

export const Departments = sequelize.define('departments', {
  dept_no: {
    type: DataTypes.STRING,
  },
  dept_name: {
    type: DataTypes.STRING,
  },
},
{
  timestamps: false,
});
