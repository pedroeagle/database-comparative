import {sequelize} from '../../database/postgres';
import {DataTypes} from 'sequelize';

export const Titles = sequelize.define('titles', {
  emp_no: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    primaryKey: true,
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
