import {sequelize} from '../../database/postgres';
import {DataTypes} from 'sequelize';

export const Titles = sequelize.define('titles', {
  emp_no: {
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
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
