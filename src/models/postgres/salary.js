import {sequelize} from '../../database/postgres';
import {DataTypes} from 'sequelize';

export const Salaries = sequelize.define('salaries', {
  emp_no: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  salary: {
    type: DataTypes.DATE,
  },
  from_date: {
    type: DataTypes.DATE,
    primaryKey: true,
  },
  to_date: {
    type: DataTypes.DATE,
  },
},
{
  timestamps: false,
});
