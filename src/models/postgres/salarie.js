import {sequelize} from '../../database/postgres';
import {DataTypes} from 'sequelize';

export const Salaries = sequelize.define('salaries', {
  emp_no: {
    type: DataTypes.INTEGER,
  },
  salary: {
    type: DataTypes.DATE,
  },
  from_date: {
    type: DataTypes.DATE,
  },
  to_date: {
    type: DataTypes.DATE,
  },
},
{
  timestamps: false,
});
