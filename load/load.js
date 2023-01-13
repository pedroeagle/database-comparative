const waitPort = require('wait-port');
const fs = require('fs');
const {execSync} = require('child_process');
const extract = require('extract-zip');
const mongoose = require('mongoose');

const path = __dirname + '/../dump.zip';

const loadPostgresDatabase = async () => {
  await waitPort({port: 5432, host: 'postgres'});
  await createPostgresDatabase();
  const {sequelize} = require('../src/database');
  const [employees] = await sequelize.query('SELECT * FROM information_schema.tables WHERE table_name=\'employees\'');
  if (employees.length) {
    console.log('Postgres Database is already loaded.');
  } else {
    console.log('\n#####\nLoading Postgres Database...\n#####\n');
    const dumps = ['employees.sql', 'load_departments.sql', 'load_employees.sql', 'load_dept_emp.sql', 'load_dept_manager.sql', 'load_titles.sql', 'load_salaries.sql'];
    for (const dump of dumps) {
      const sql = fs.readFileSync(__dirname + `/../dump/${dump}`, 'utf-8').replace('\\', '');
      await sequelize.query(sql);
    }
    console.log('#####\nPostgres Database was loaded sucessfully!\n#####');
  }
};

const extractDumpFile = async () => {
  const config = {dir: __dirname + '/../dump'};
  if (!fs.existsSync(config.dir)) {
    console.log('Unziping dump.zip file...');
    return await extract(path, config);
  } else {
    console.log('Dump file is already unziped.');
  }
};

const createPostgresDatabase = async () => {
  await waitPort({port: 5432, host: 'postgres'});
  const {sequelize_default} = require('../src/database');
  try {
    await sequelize_default.query('CREATE DATABASE employees;');
  } catch (e) { }
};

const loadMongoDatabase = async () => {
  await waitPort({port: 27017, host: 'mongo'});
  await mongoose.createConnection('mongodb://mongo:mongo@mongo:27017', {useNewUrlParser: true})
      .asPromise().then(async (connection) => {
        const Admin = mongoose.mongo.Admin;
        const {databases} = await new Admin(connection.db).listDatabases();
        const employees = databases.find(({name}) => name === 'employees');
        if (!employees || employees?.sizeOnDisk <= 8192) {
          console.log('\n#####\nLoading Mongo Database...\n#####\n');
          const collections = ['employees', 'departments', 'dept_emp', 'dept_manager'];
          for (const collection of collections) {
            execSync(`mongoimport --db employees --collection ${collection} --file dump/${collection}.json --jsonArray --username mongo --password mongo --uri mongodb://mongo:mongo@mongo:27017 --authenticationDatabase admin`);
            execSync(`mongoimport --db employees --collection ${collection}_indexed --file dump/${collection}.json --jsonArray --username mongo --password mongo --uri mongodb://mongo:mongo@mongo:27017 --authenticationDatabase admin`);
          }
          console.log('\n#####\nMongo Database was loaded sucessfully!\n#####\n');
        } else {
          console.log('Mongo Database is already loaded.');
        }
      });
};

module.exports = {loadPostgresDatabase, loadMongoDatabase, extractDumpFile, loadMongoDatabase};
